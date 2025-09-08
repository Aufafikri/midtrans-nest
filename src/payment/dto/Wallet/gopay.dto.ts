import { IsNumber, IsString } from 'class-validator';

export class GopayDto {
  @IsString()
  payment_type: string;

  @IsString()
  order_id: string;

  @IsNumber()
  gross_amount: string;

  @IsNumber()
  productPrice: number;

  @IsNumber()
  quantity: number;

  @IsString()
  productName: string;

  @IsString()
  productId: string;

  @IsString()
  userId: string;
}
