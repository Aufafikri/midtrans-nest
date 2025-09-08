import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { TransactionStatusType, TransactionFraudStatusType } from '../../types/status'

export class HandleNotificationDto {
    @IsString()
    order_id: string

    @IsEnum(TransactionStatusType)
    transaction_status: TransactionStatusType
    
    @IsString()
    gross_amount?: string

    @IsEnum(TransactionFraudStatusType)
    fraud_status: TransactionFraudStatusType

    @IsString()
    transaction_time: string

    @IsString()
    signature_key: string

    @IsString()
    status_message: string

    @IsString()
    store: string
}