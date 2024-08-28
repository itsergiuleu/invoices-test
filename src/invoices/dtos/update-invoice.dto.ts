import { InputType, Field, Int, Float } from '@nestjs/graphql';
import { IsInt, IsString, IsNumber, IsEnum, IsOptional } from 'class-validator';
import { CurrencyEnum } from '../enums/currency.enum';

@InputType()
export class UpdateInvoiceDto {
  @Field(() => Int)
  @IsInt()
  id: number;

  @Field(() => Int, { nullable: true })
  @IsInt()
  @IsOptional()
  customerId: number;

  @Field(() => Int, { nullable: true })
  @IsInt()
  @IsOptional()
  productId: number;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  description: string;

  @Field(() => Float, { nullable: true })
  @IsNumber()
  @IsOptional()
  amount: number;

  @Field(() => CurrencyEnum, {
    nullable: true,
    defaultValue: CurrencyEnum.USD,
  })
  @IsEnum(CurrencyEnum)
  @IsOptional()
  currency?: CurrencyEnum = CurrencyEnum.USD;
}
