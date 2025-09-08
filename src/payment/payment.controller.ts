  import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
  import { PaymentService } from './payment.service';
  import { CreateBCADto } from './dto/bank/bca';
  import { HandleNotificationDto } from './dto/notification/notification';
import { GopayDto } from './dto/Wallet/gopay.dto';
import { CreateCounterPaymentDto } from './dto/counter/counter';

  @Controller('payment')
  export class PaymentController {
    constructor(private readonly paymentService: PaymentService) {}

    @Post()
    public async createPayment(@Body() createBCADto: CreateBCADto ) {
      return this.paymentService.createBcaPayment(createBCADto)
    }

    @Post('notify')
    @HttpCode(200)
    public async handleNotification(@Body() notification: HandleNotificationDto) {
      console.log('notification payment controller', notification)
      return this.paymentService.handleNotification(notification)
    }

    @Post('gopay')
    public async createGopayPayment(@Body() gopayDto: GopayDto ) {
      return this.paymentService.createGopayPayment(gopayDto)
    }

    @Post('counters')
    public async createCountersPayment(@Body() counterDto: CreateCounterPaymentDto ) {
      return this.paymentService.createCountersTransaction(counterDto)
    }

    @Get()
    public async getAllTransaction() {
      return this.paymentService.getAllTransaction()
    }
  }
