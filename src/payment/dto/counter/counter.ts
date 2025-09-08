import { IsNumber, IsString } from "class-validator";

export class CreateCounterPaymentDto {
    @IsString()
    payment_type: string

    @IsString()
    order_id: string

    @IsString()
    store: string

    @IsNumber()
    productPrice: number

    @IsNumber()
    quantity: number

    @IsString()
    productName: string

    @IsString()
    productId: string

    @IsString()
    userId: string
}