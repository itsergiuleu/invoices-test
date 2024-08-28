import { UpdateInvoiceDto } from '../dtos/update-invoice.dto';

export class UpdateInvoiceCommand {
  constructor(public readonly updateInvoiceDto: UpdateInvoiceDto) {}
}
