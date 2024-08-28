import { CreateInvoiceDto } from '../dtos/create-invoice.dto';

export class CreateInvoiceCommand {
  constructor(public readonly createInvoiceDto: CreateInvoiceDto) {}
}
