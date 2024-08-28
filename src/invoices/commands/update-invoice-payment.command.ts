export class UpdateInvoicePaymentCommand {
  constructor(
    public readonly id: number,
    public readonly isPaid: boolean,
  ) {}
}
