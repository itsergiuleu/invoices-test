import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Invoice } from '../entities/invoice.entity';
import { CreateStornoInvoiceCommand } from '../commands/create-storno-invoice.command';
import { InvoiceTypeEnum } from '../enums/invoice-type.enum';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(CreateStornoInvoiceCommand)
export class CreateStornoInvoiceHandler
  implements ICommandHandler<CreateStornoInvoiceCommand>
{
  constructor(
    @InjectRepository(Invoice)
    private readonly invoiceRepository: Repository<Invoice>,
  ) {}

  async execute(command: CreateStornoInvoiceCommand) {
    const { id } = command;

    const invoice = await this.invoiceRepository.findOneBy({ id });

    const { customer, product, description, currency } = invoice;

    console.log(customer, product, description, currency);

    if (!invoice) {
      throw new NotFoundException(`Invoice with ID ${id} not found`);
    }

    const stornoInvoice = this.invoiceRepository.create({
      customer,
      product,
      description,
      currency,
      amount: -invoice.amount,
      type: InvoiceTypeEnum.STORNO,
      originalInvoice: invoice,
    });

    await this.invoiceRepository.save(stornoInvoice);

    return stornoInvoice;
  }
}
