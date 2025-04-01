import { IsEmail, IsString } from "class-validator";

export class MerchantLoginDto {
    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    password: string;
}