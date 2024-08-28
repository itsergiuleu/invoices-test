import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { Invoice } from './entities/invoice.entity';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateInvoiceCommand } from './commands/create-invoice.command';
import { UpdateInvoiceCommand } from './commands/update-invoice.command';
import { CreateInvoiceDto } from './dtos/create-invoice.dto';
import { UpdateInvoiceDto } from './dtos/update-invoice.dto';
import { UpdateInvoicePaymentCommand } from './commands/update-invoice-payment.command';
import { CreateStornoInvoiceCommand } from './commands/create-storno-invoice.command';
import { GetInvoicesQuery } from './queries/get-invoices.query';
import { GetInvoiceQuery } from './queries/get-invoice.query';

@Resolver(() => Invoice)
export class InvoicesResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Mutation(() => Invoice)
  async createInvoice(
    @Args('input') createInvoiceDto: CreateInvoiceDto,
  ): Promise<Invoice> {
    return this.commandBus.execute(new CreateInvoiceCommand(createInvoiceDto));
  }

  @Mutation(() => Invoice)
  async updateInvoice(
    @Args('input') updateInvoiceDto: UpdateInvoiceDto,
  ): Promise<Invoice> {
    return this.commandBus.execute(new UpdateInvoiceCommand(updateInvoiceDto));
  }

  @Mutation(() => Invoice)
  async markInvoiceAsPaidOrUnpaid(
    @Args('id') id: number,
    @Args('isPaid') isPaid: boolean,
  ): Promise<Invoice> {
    return this.commandBus.execute(new UpdateInvoicePaymentCommand(id, isPaid));
  }

  @Mutation(() => Invoice)
  async generateStornoInvoice(@Args('id') id: number): Promise<Invoice> {
    return this.commandBus.execute(new CreateStornoInvoiceCommand(id));
  }

  @Query(() => [Invoice])
  async invoices(): Promise<Invoice[]> {
    return this.queryBus.execute(new GetInvoicesQuery());
  }

  @Query(() => Invoice)
  async invoice(@Args('id') id: number): Promise<Invoice> {
    return this.queryBus.execute(new GetInvoiceQuery(id));
  }
}
