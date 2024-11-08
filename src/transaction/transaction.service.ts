import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/libs/prisma.service'; // Sesuaikan path
import * as midtransClient from 'midtrans-client';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Injectable()
export class TransactionService {
    constructor(private prisma: PrismaService) {}

    public async createTransaction(createTransaction: CreateTransactionDto) {
        const { grossAmount, orderId, productId, userId } = createTransaction;

        if (!grossAmount || !orderId) {
            throw new BadRequestException('grossAmount dan orderId harus diisi.');
        }

        // Inisialisasi Snap
        const snap = new midtransClient.Snap({
            isProduction: false,
            serverKey: process.env.MIDTRANS_CLIENT_SERVER,
            clientKey: process.env.MIDTRANS_CLIENT_KEY,
        });

        const parameter = {
            transaction_details: {
                order_id: orderId,
                gross_amount: grossAmount,
            },
            item_details: [{
                "price": grossAmount,
                "quantity": 1,
                "name": "evst",
                "brand": "evst brand wei"
            }],
            customer_details: {
                name: 'example',
                email: 'example@gmail.com',
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
