// transaction/dto/create-transaction.dto.ts
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateTransactionDto {
    @IsString()
    @IsNotEmpty()
    orderId: string;

    @IsNumber()
    @IsNotEmpty()
    grossAmount: number;

    @IsString()
    name: string;

    @IsString()
    email: string;

    @IsString()
    productName: string;

    @IsNumber()
    productPrice: number;

    @IsString()
    @IsNotEmpty()
    userId: string;

    @IsString()
    @IsNotEmpty()
    productId: string;
}
