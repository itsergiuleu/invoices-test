import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invoice } from './entities/invoice.entity';
import { Customer } from './entities/customer.entity';
import { Product } from './entities/product.entity';
import { InvoicesResolver } from './invoices.resolver';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateInvoiceHandler } from './handlers/create-invoice.handler';
import { UpdateInvoiceHandler } from './handlers/update-invoice.handler';
import { UpdateInvoicePaymentHandler } from './handlers/update-invoice-payment.handler';
import { CreateStornoInvoiceHandler } from './handlers/create-storno-invoice.handler';
import { GetInvoicesHandler } from './handlers/get-invoices.handler';
import { GetInvoiceHandler } from './handlers/get-invoice.handler';

@Module({
  imports: [TypeOrmModule.forFeature([Invoice, Customer, Product]), CqrsModule],
  providers: [
    InvoicesResolver,
    CreateInvoiceHandler,
    UpdateInvoiceHandler,
    UpdateInvoicePaymentHandler,
    CreateStornoInvoiceHandler,
    GetInvoicesHandler,
    GetInvoiceHandler,
  ],
})
export class InvoicesModule {}
