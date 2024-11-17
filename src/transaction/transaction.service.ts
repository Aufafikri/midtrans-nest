import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/libs/prisma.service'; // Sesuaikan path
import * as midtransClient from 'midtrans-client';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { PaymentStatus } from '@prisma/client';

@Injectable()
export class TransactionService {
  constructor(private readonly prisma: PrismaService) {}

  public async createTransaction(createTransaction: CreateTransactionDto) {
    const {
      grossAmount,
      orderId,
      productId,
      userId,
      name,
      email,
      productName,
      productPrice,
      quantity,
    } = createTransaction;

    if (!grossAmount || !orderId) {
      throw new BadRequestException('grossAmount dan orderId harus diisi.');
    }

    const snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: process.env.MIDTRANS_CLIENT_SERVER,
      clientKey: process.env.MIDTRANS_CLIENT_KEY,
    });

    const calculatedGrossAmount = productPrice * quantity;

    const parameter = {
      transaction_details: {
        order_id: orderId,
        gross_amount: calculatedGrossAmount,
      },
      item_details: [
        {
          id: productId,
          price: productPrice,
          quantity: quantity,
          name: productName,
        },
      ],
      customer_details: {
        first_name: name,
        email: email,
        shipping_address: {
          first_name: name,
          phone: 12345678,
          address: 'jatimakmur pride',
          city: 'bekasi',
          postal_code: '12212',
          country_code: 'IDN',
        },
      },
    };

    try {
      const transaction = await snap.createTransaction(parameter);
      console.log('Response dari Midtrans:', transaction);

      // const transactionStatus = transaction.transaction_status || 'pending';

      let transactionStatus: PaymentStatus;
      switch (transaction.transaction_status) {
        case 'pending':
          transactionStatus = PaymentStatus.pending;
          break;
        case 'settlement':
        case 'capture':
          transactionStatus = PaymentStatus.success;
          break;
        case 'deny':
        case 'cancel':
          transactionStatus = PaymentStatus.cancel;
          break;
        case 'expire':
          transactionStatus = PaymentStatus.expire;
          break;
        default:
          transactionStatus = PaymentStatus.failed;
      }

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
      throw new BadRequestException(
        'Transaction creation failed: ' + error.message,
      );
    }
  }
}
