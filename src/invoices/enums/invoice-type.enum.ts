import { registerEnumType } from '@nestjs/graphql';

export enum InvoiceTypeEnum {
  STANDARD = 'STANDARD',
  STORNO = 'STORNO',
}

// Register the InvoiceTypeEnum for GraphQL
registerEnumType(InvoiceTypeEnum, {
  name: 'InvoiceTypeEnum', // The name that will be used in the GraphQL schema
  description: 'Supported invoice types', // Optional description
});
