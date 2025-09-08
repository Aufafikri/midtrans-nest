import { IsNumber, IsString } from "class-validator";

export class CreateTestTransaciton {
    @IsString()
    bank: string

    @IsString()
    orderId: string

    @IsNumber()
    productPrice: number

    @IsNumber()
    quantity: number;

    @IsString()
    productName: string

    @IsString()
    productId: string

    @IsString()
    userId: string
}