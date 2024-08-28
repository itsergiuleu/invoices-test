import { registerEnumType } from '@nestjs/graphql';

export enum CurrencyEnum {
  USD = 'USD',
  EUR = 'EUR',
}

// Register the CurrencyEnum for GraphQL
registerEnumType(CurrencyEnum, {
  name: 'CurrencyEnum', // The name that will be used in the GraphQL schema
  description: 'Supported currencies for invoices', // Optional description
});
