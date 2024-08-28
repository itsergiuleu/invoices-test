import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { Customer } from './customer.entity';
import { Product } from './product.entity';
import { Field, ObjectType } from '@nestjs/graphql';
import { CurrencyEnum } from '../enums/currency.enum';
import { InvoiceTypeEnum } from '../enums/invoice-type.enum';

@Entity()
@ObjectType()
export class Invoice {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column({ default: InvoiceTypeEnum.STANDARD })
  @Field(() => InvoiceTypeEnum)
  type: InvoiceTypeEnum;

  @Column({ nullable: true })
  @Field({ nullable: true })
  payedAt?: Date;

  @Column('decimal', {
    nullable: true,
  })
  @Field()
  amount: number;

  @Column({ default: CurrencyEnum.USD })
  @Field()
  currency: CurrencyEnum;

  @Column({ nullable: true })
  @Field({ nullable: true })
  description?: string;

  @ManyToOne(() => Customer, (customer) => customer.invoices)
  customer: Customer;

  @ManyToOne(() => Invoice, (invoice) => invoice.originalInvoice)
  @Field({ nullable: true })
  originalInvoice: Invoice;

  @ManyToOne(() => Product, (product) => product.invoices)
  product: Product;
}
