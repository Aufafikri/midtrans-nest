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
    @IsNotEmpty()
    userId: string;

    @IsString()
    @IsNotEmpty()
    productId: string;
}
