import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateInvoiceCommand } from '../commands/create-invoice.command';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Invoice } from '../entities/invoice.entity';
import { Customer } from '../entities/customer.entity';
import { Product } from '../entities/product.entity';

@CommandHandler(CreateInvoiceCommand)
export class CreateInvoiceHandler
  implements ICommandHandler<CreateInvoiceCommand>
{
  constructor(
    @InjectRepository(Invoice)
    private readonly invoiceRepository: Repository<Invoice>,
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async execute(command: CreateInvoiceCommand) {
    const { customerId, productId, description, amount, currency } =
      command.createInvoiceDto;

    const customer = await this.customerRepository.findOneBy({
      id: customerId,
    });

    const product = await this.productRepository.findOneBy({ id: productId });

    const invoice = this.invoiceRepository.create({
      customer,
      product,
      description,
      amount,
      currency,
    });

    await this.invoiceRepository.save(invoice);

    return invoice;
  }
}
