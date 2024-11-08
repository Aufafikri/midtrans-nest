// src/transactions/dto/customer-details.dto.ts
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CustomerDetailsDto {
    @IsString()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    phone: string;
}