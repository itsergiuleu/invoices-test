import { InputType, Field, Int, Float } from '@nestjs/graphql';
import { IsInt, IsString, IsNumber, IsEnum } from 'class-validator';
import { CurrencyEnum } from '../enums/currency.enum';

@InputType()
export class CreateInvoiceDto {
  @Field(() => Int)
  @IsInt()
  customerId: number;

  @Field(() => Int)
  @IsInt()
  productId: number;

  @Field()
  @IsString()
  description: string;

  @Field(() => Float)
  @IsNumber()
  amount: number;

  @Field(() => CurrencyEnum)
  @IsEnum(CurrencyEnum)
  currency: CurrencyEnum;
}
