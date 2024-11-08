import { IsEmail, IsString } from "class-validator";

export class CreateLoginDto {
    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    password: string;
}