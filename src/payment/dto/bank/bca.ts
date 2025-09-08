import { isNumber, IsNumber, IsString } from "class-validator";

export class CreateBCADto {
    @IsString()
    order_id: string

    @IsNumber()
    productPrice: number

    @IsNumber()
    quantity: number

    @IsString()
    productName: string

    @IsString()
    bank: string

    @IsString()
    productId: string

    @IsString()
    userId: string

    @IsString()
    status_message: string

    @IsString()
    transaction_time: string

    @IsString()
    expiry_time: string
}