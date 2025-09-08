// import { Injectable, BadRequestException } from '@nestjs/common';
// import { PrismaService } from 'src/libs/prisma.service'; // Sesuaikan path
// import * as midtransClient from 'midtrans-client';
// import { CreateTransactionDto } from './dto/create-transaction.dto';
// // import { PaymentStatus } from '@prisma/client';
// import { CreateTestTransaciton } from './dto/create-test-transaction.dto';
// import { useContainer } from 'class-validator';

// @Injectable()
// export class TransactionService {
//   constructor(private readonly prisma: PrismaService) {}

//   public async createTransaction(createTransaction: CreateTransactionDto) {
//     const {
//       grossAmount,
//       orderId,
//       productId,
//       userId,
//       name,
//       email,
//       productName,
//       productPrice,
//       quantity,
//       bank
//     } = createTransaction;

//     console.log('bank select', bank)

//     if (!grossAmount || !orderId) {
//       throw new BadRequestException('grossAmount dan orderId harus diisi.');
//     }

//     const snap = new midtransClient.Snap({
//       isProduction: false,
//       serverKey: process.env.MIDTRANS_CLIENT_SERVER,
//       clientKey: process.env.MIDTRANS_CLIENT_KEY,
//     });

//     const calculatedGrossAmount = productPrice * quantity;

//     const parameter = {
//       transaction_details: {
//         order_id: orderId,
//         gross_amount: calculatedGrossAmount,
//       },
//       item_details: [
//         {
//           id: productId,
//           price: productPrice,
//           quantity: quantity,
//           name: productName,
//         },
//       ],
//       customer_details: {
//         first_name: name,
//         email: email,
//         shipping_address: {
//           first_name: name,
//           phone: 12345678,
//           address: 'jatimakmur pride',
//           city: 'bekasi',
//           postal_code: '12212',
//           country_code: 'IDN',
//         },
//       },
//     };

//     try {
//       const transaction = await snap.createTransaction(parameter);
//       console.log('Response dari Midtrans:', transaction);

//       // const transactionStatus = transaction.transaction_status || 'pending';

//       // let transactionStatus: PaymentStatus;
//       // switch (transaction.transaction_status) {
//       //   case 'pending':
//       //     transactionStatus = PaymentStatus.pending;
//       //     break;
//       //   case 'settlement':
//       //   case 'capture':
//       //     transactionStatus = PaymentStatus.success;
//       //     break;
//       //   case 'deny':
//       //   case 'cancel':
//       //     transactionStatus = PaymentStatus.cancel;
//       //     break;
//       //   case 'expire':
//       //     transactionStatus = PaymentStatus.expire;
//       //     break;
//       //   default:
//       //     transactionStatus = PaymentStatus.failed;
//       // }

//       await this.prisma.transaction.create({
//         data: {
//           ,
//           amount: grossAmount,
//           userId,
//           productId,
//           // status: transactionStatus,
//           paymentMethod: transaction.payment_type || 'unknown',
//         },
//       });

//       return { token: transaction.token };
//     } catch (error) {
//       throw new BadRequestException(
//         'Transaction creation failed: ' + error.message,
//       );
//     }
//   }

//   public async createTestTransaciton (createTestTransaciton: CreateTestTransaciton) {
//     const { bank, productPrice, quantity, orderId, productName, productId, userId } = createTestTransaciton

//     const core = new midtransClient.CoreApi({
//       isProduction: false,
//       serverKey: process.env.MIDTRANS_CLIENT_SERVER,
//       clientKey: process.env.MIDTRANS_CLIENT_KEY
//     })

//     const calculatedGrossAmount = productPrice * quantity

//     const parameter = {
//       payment_type: "bank_transfer",
//       transaction_details: {
//         gross_amount: calculatedGrossAmount,
//         order_id: orderId
//       },
//       bank_transfer: {
//         bank: bank
//       },
//       item_details: [
//         {
//           id: productId,
//           price: productPrice,
//           quantity: quantity,
//           name: productName
//         }
//       ]
//     }

//     try {
//       const chargeResponse = await core.charge(parameter)
//       console.log('charge response', chargeResponse)

//       await this.prisma.transaction.create({
//         data: {
//           orderId: orderId,
//           paymentMethod: chargeResponse.va_numbers[0].bank,
//           amount: calculatedGrossAmount,
//           // status: chargeResponse.transaction_status,
//           productId: productId,
//           userId: userId
//         }
//       })

//     } catch (error) {
//       console.error("Midtrans CoreAPI Error:", error);
//     throw new BadRequestException("Gagal membuat transaksi.");
//     }
//   }
// }
