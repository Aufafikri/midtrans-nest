import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { PrismaModule } from './libs/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { JwtService } from '@nestjs/jwt';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './auth/strategies/local.strategy';
import { MidtransModule } from '@ruraim/nestjs-midtrans';
import { MerchantModule } from './merchant/merchant.module';
import { MailsModule } from './mails/mails.module';
import { MerchantStrategy } from './auth/strategies/merchant.strategy';
import { SocketGateway } from './socket/socket/socket.gateway';
import { SocketModule } from './socket/socket/socket.module';
import { PaymentModule } from './payment/payment.module';
import { PaymentGateway } from './payment/payment.gateway';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { DataModule } from './data/data.module';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: process.env.JWT_EXPIRES_IN,
      },
    }),
    MidtransModule.register({
      clientKey: process.env.MIDTRANS_CLIENT_KEY,
      serverKey: process.env.MIDTRANS_CLIENT_SERVER,
      sandbox: true,
      isGlobal: true,
    }),
    UserModule,
    PrismaModule,
    ProductsModule,
    AuthModule,
    MerchantModule,
    MailsModule,
    SocketModule,
    PaymentModule,
    CloudinaryModule,
    DataModule
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy, JwtService, MerchantStrategy, SocketGateway, PaymentGateway],
  exports: [JwtModule],
})
export class AppModule {}
