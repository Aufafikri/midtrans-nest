import { IsEmail, IsString } from "class-validator";

export class CreateMerchantDto {
    @IsString()
    name: string;

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsString()
    description?: string;
}