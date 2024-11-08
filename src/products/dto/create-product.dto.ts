import { IsNumber, IsString } from "class-validator";

export class CreateProductDto {
    @IsString()
    name: string;

    @IsNumber()
    price: number;

    @IsString()
    description?: string;

    @IsString()
    image: string;

    @IsString()
    userId: string;
}