import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/libs/prisma.service';
import * as midtransClient from 'midtrans-client';
import { CreateBCADto } from './dto/bank/bca';
import { HandleNotificationDto } from './dto/notification/notification';
import { GopayDto } from './dto/Wallet/gopay.dto';
import { CreateCounterPaymentDto } from './dto/counter/counter';
import { TransactionFraudStatusType, TransactionStatusType } from './types/status';

@Injectable()
export class PaymentService {
  private readonly logger = new Logger(PaymentService.name);
  constructor(private readonly prisma: PrismaService) {}

  public async createBcaPayment(createBCADto: CreateBCADto) {
    const {
      order_id,
      quantity,
      productPrice,
      bank,
      productName,
      productId,
      userId,
    } = createBCADto;
    const core = new midtransClient.CoreApi({
      isProduction: false,
      serverKey: process.env.MIDTRANS_CLIENT_SERVER,
      clientKey: process.env.MIDTRANS_CLIENT_KEY,
    });

    const calculatedGrossAmount = quantity * productPrice;

    const parameter = {
      payment_type: 'bank_transfer',
      transaction_details: {
        gross_amount: calculatedGrossAmount,
        order_id: order_id,
      },
      bank_transfer: {
        bank: bank,
      },
      item_details: [
        {
          id: productId,
          price: productPrice,
          quantity: quantity,
          name: productName,
        },
      ],
    };

    try {
      const chargeResponse = await core.charge(parameter);
      console.log('response', chargeResponse);

      const product = await this.prisma.product.findUnique({
        where: {
          id: productId
        }
      })

      if(product.stock < quantity) {
        throw new Error("stock is missing on DB")
      }

      await this.prisma.transaction.create({
        data: {
          order_id: chargeResponse.order_id,
          gross_amount: parseInt(chargeResponse.gross_amount),
          productId: productId,
          status_message: chargeResponse.status_message,
          paymentType: chargeResponse.payment_type,
          transaction_status: chargeResponse.transaction_status,
          transactionTime: new Date(chargeResponse.transaction_time),
          fraudStatus: chargeResponse.fraud_status,
          paymentMethod: chargeResponse.va_numbers[0].bank,
          expiry_time: chargeResponse.expiry_time,
          userId: userId,
          quantity: quantity,
        },
      });

      return chargeResponse;
    } catch (error) {
      console.log('error', error);
    }
  }

  public async handleNotification(handleNotification: HandleNotificationDto) {
    const {
      order_id,
      transaction_status,
      fraud_status,
      transaction_time,
      status_message,
      signature_key,
      store,
    } = handleNotification;

    console.log('orderid notif', order_id);

    // 1. Validate required fields
    if (!order_id || !transaction_status) {
      this.logger.error(
        'Invalid notification: Missing order_id or transaction_status',
        handleNotification,
      );
      throw new Error('Invalid notification data');
    }

    try {
      const statusMessage = (transaction_status: TransactionStatusType, fraud_status: TransactionFraudStatusType) => {
        if(transaction_status === 'pending') return "Transanction Is Pending";
        if(transaction_status === 'settlement' && fraud_status === 'accept') return "Transaction Successfully"
      }

      const messageStatus = statusMessage(transaction_status, fraud_status)
      const updatedNotificationTransaction =
        await this.prisma.transaction.update({
          where: {
            order_id: order_id,
          },
          data: {
            transaction_status: transaction_status,
            fraudStatus: fraud_status,
            signature_key: signature_key,
            transactionTime: new Date(transaction_time),
            status_message: messageStatus,
          },
        });

      if (transaction_status === 'settlement') {
        const { productId, quantity } = updatedNotificationTransaction;

        console.log(typeof quantity);

        const product = await this.prisma.product.findUnique({
          where: {
            id: productId,
          },
        });

        if (!product) {
          throw new Error('Product WitH id NOT FOUND');
        }
        
        if(product.stock < quantity) {
          throw new Error("stock unfield")
        }

        await this.prisma.product.update({
          where: {
            id: productId,
          },
          data: {
            stock: product.stock - quantity,
          },
        });
      }
      this.logger.log(
        `Updated transaction ${order_id} to status ${transaction_status}`,
      );

      return updatedNotificationTransaction;
    } catch (error) {
      this.logger.error(
        `Failed to process notification for order ${order_id}: ${error.message}`,
      );
    }
  }

  public async createGopayPayment(gopayDto: GopayDto) {
    const {
      payment_type,
      order_id,
      gross_amount,
      productId,
      productName,
      quantity,
      productPrice,
      userId,
    } = gopayDto;

    const core = new midtransClient.CoreApi({
      isProduction: false,
      serverKey: process.env.MIDTRANS_CLIENT_SERVER,
      clientKey: process.env.MIDTRANS_CLIENT_KEY,
    });

    const calculatedGrossAmount = productPrice * quantity;

    const parameter = {
      payment_type: payment_type,
      transaction_details: {
        order_id: order_id,
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
      gopay: {},
    };

    try {
      const chargeResponse = await core.charge(parameter);
      console.log(chargeResponse);

      await this.prisma.transaction.create({
        data: {
          order_id: order_id,
          gross_amount: calculatedGrossAmount,
          paymentType: 'gopay',
          transaction_status: chargeResponse.transaction_status,
          transactionTime: new Date(chargeResponse.transaction_time),
          productId: productId,
          userId: userId,
          status_message: chargeResponse.status_message,
          paymentMethod: chargeResponse.payment_type,
        },
      });

      return chargeResponse;
    } catch (error) {
      console.error('error post to midtrans', error);
    }
  }

  public async createCountersTransaction(counterDto: CreateCounterPaymentDto) {
    const {
      order_id,
      payment_type,
      productId,
      productName,
      productPrice,
      quantity,
      store,
      userId,
    } = counterDto;

    const core = new midtransClient.CoreApi({
      isProduction: false,
      serverKey: process.env.MIDTRANS_CLIENT_SERVER,
      clientKey: process.env.MIDTRANS_CLIENT_KEY,
    });

    const calculatedGrossAmount = productPrice * quantity;

    const parameter = {
      payment_type: payment_type,
      transaction_details: {
        order_id: order_id,
        gross_amount: calculatedGrossAmount.toString(),
      },
      cstore: {
        store: store,
      },
    };

    try {
      const response: CounterTypes = await core.charge(parameter);
      console.log('response counter', response);

      await this.prisma.transaction.create({
        data: {
          order_id: order_id,
          gross_amount: calculatedGrossAmount,
          transaction_status: response.transaction_status,
          paymentType: response.payment_type,
          productId: productId,
          userId: userId,
          paymentMethod: response.payment_type,
          CounterPayment: {
            create: {
              store: response.store,
              // id:    response.transaction_id
            },
          },
        },
      });

      return response;
    } catch (error) {
      console.error('error counter payment', error);
    }
  }

  public async getAllTransaction() {
    return this.prisma.transaction.findMany({})
  }
}
