import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { TransactionModule } from './transaction/transaction.module';
import { PrismaModule } from './libs/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { JwtService } from '@nestjs/jwt';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './auth/strategies/local.strategy';
import { MidtransModule } from '@ruraim/nestjs-midtrans';

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
    TransactionModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, LocalStrategy],
  exports: [JwtModule],
})
export class AppModule {}
