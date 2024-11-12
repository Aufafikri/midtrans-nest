import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/libs/prisma.service'; // Sesuaikan path
import * as midtransClient from 'midtrans-client';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Injectable()
export class TransactionService {
    constructor(private prisma: PrismaService) {}

    public async createTransaction(createTransaction: CreateTransactionDto) {
        const { grossAmount, orderId, productId, userId, name, email, productName, productPrice } = createTransaction;

        if (!grossAmount || !orderId) {
            throw new BadRequestException('grossAmount dan orderId harus diisi.');
        }

        const snap = new midtransClient.Snap({
            isProduction: false,
            serverKey: process.env.MIDTRANS_CLIENT_SERVER,
            clientKey: process.env.MIDTRANS_CLIENT_KEY,
        });

        const calculatedGrossAmount = productPrice * 4

        const parameter = {
            transaction_details: {
                "order_id": orderId,
                "gross_amount": calculatedGrossAmount,
            },
            item_details: [{
                "id": productId,
                "price": productPrice,
                "quantity": 4,
                "name": productName,
            }],
            customer_details: {
                first_name: name,
                email: email,
            },
        };

        try {
            const transaction = await snap.createTransaction(parameter);
            console.log('Response dari Midtrans:', transaction);

            const transactionStatus = transaction.transaction_status || 'pending';

            await this.prisma.transaction.create({
                data: {
                    orderId,
                    amount: grossAmount,
                    userId,
                    productId,
                    status: transactionStatus,
                    paymentMethod: transaction.payment_type || 'unknown',
                },
            });

            return { token: transaction.token };
        } catch (error) {
            throw new BadRequestException('Transaction creation failed: ' + error.message);
        }
    }
}
