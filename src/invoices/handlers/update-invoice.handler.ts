import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Invoice } from '../entities/invoice.entity';
import { Customer } from '../entities/customer.entity';
import { Product } from '../entities/product.entity';
import { UpdateInvoiceCommand } from '../commands/update-invoice.command';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(UpdateInvoiceCommand)
export class UpdateInvoiceHandler
  implements ICommandHandler<UpdateInvoiceCommand>
{
  constructor(
    @InjectRepository(Invoice)
    private readonly invoiceRepository: Repository<Invoice>,
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async execute(command: UpdateInvoiceCommand) {
    console.log(command.updateInvoiceDto);
    const { id, customerId, productId, description, amount, currency } =
      command.updateInvoiceDto;

    const invoice = await this.invoiceRepository.findOneBy({ id });
    if (!invoice) {
      throw new NotFoundException(`Invoice with ID ${id} not found`);
    }

    const customer = await this.customerRepository.findOneBy({
      id: customerId,
    });

    const product = await this.productRepository.findOneBy({ id: productId });

    // Merge the new values with the existing invoice
    Object.assign(invoice, {
      customer,
      product,
      description,
      amount: amount ? amount : invoice.amount,
      currency,
    });

    await this.invoiceRepository.save(invoice);
    // Save the updated invoice back to the database
    return invoice;
  }
}
