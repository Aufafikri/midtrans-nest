// import { Body, Controller, InternalServerErrorException, Post } from '@nestjs/common';
// // import { TransactionService } from './transaction.service';
// import { CreateTransactionDto } from './dto/create-transaction.dto';
// import { CreateTestTransaciton } from './dto/create-test-transaction.dto';

// @Controller('transaction')
// export class TransactionController {
//   constructor(private readonly transactionService: TransactionService) {}

//   @Post()
//   public async create(@Body() createTransactionDto: CreateTransactionDto ) {
//     try {
//       return await this.transactionService.createTransaction(createTransactionDto);
//   } catch (error) {
//       console.error('Error creating transaction:', error);
//       throw new InternalServerErrorException('Internal Server Error');
//   }

//   }

//   @Post('test')
//   public async createTest(@Body() createTestTransaction: CreateTestTransaciton ) {
//     return this.transactionService.createTestTransaciton(createTestTransaction)
//   }
// }
