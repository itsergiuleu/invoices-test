import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Invoice } from '../entities/invoice.entity';
import { UpdateInvoicePaymentCommand } from '../commands/update-invoice-payment.command';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(UpdateInvoicePaymentCommand)
export class UpdateInvoicePaymentHandler
  implements ICommandHandler<UpdateInvoicePaymentCommand>
{
  constructor(
    @InjectRepository(Invoice)
    private readonly invoiceRepository: Repository<Invoice>,
  ) {}

  async execute(command: UpdateInvoicePaymentCommand) {
    const { id, isPaid } = command;

    const invoice = await this.invoiceRepository.findOneBy({ id });

    if (!invoice) {
      throw new NotFoundException(`Invoice with ID ${id} not found`);
    }

    const payedAt = isPaid ? new Date() : null;

    const invoiceData = this.invoiceRepository.merge(invoice, {
      payedAt: payedAt,
    });

    await this.invoiceRepository.save(invoiceData);

    return invoice;
  }
}
