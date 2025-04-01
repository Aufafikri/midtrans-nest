import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { error } from 'console';
import * as nodemailer from 'nodemailer';
import { PrismaService } from 'src/libs/prisma.service';

@Injectable()
export class MailsService {
  private transporter;
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });
  }

  public generateTokenUserVerification(userId: string) {
    const payload = {
      userId,
    };

    console.log('userId mails', userId);

    const token = this.jwtService.sign(payload, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    console.log('token mails', token);

    return token;
  }

  public generateTokenMerchantVerification(merchantId: string) {
    const payload = {
      merchantId,
    };

    const token = this.jwtService.sign(payload, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    return token;
  }

  public async sendEmailUserVerificaiton(userId: string, email: string) {
    const verificationToken = this.generateTokenUserVerification(userId);
    const verificationLink = `http://localhost:8000/mails/verify-email-user?token=${verificationToken}`;

    try {
      await this.transporter.sendMail({
        to: email,
        subject: 'Please verify your email address!',
        html: `
                <div style="border: 2px solid gray; padding: 20px; border-radius: 10px;">
            <h1>👋 Welcome To Midcommerces!</h1>
            <p style="font-weight: bold;" >To complete your registration, please verify your email address by clicking the link below:</p>
            <a href="${verificationLink}" style="display: inline-block; padding: 10px 20px; margin: 10px 0; font-size: 16px; color: white; background-color: #007bff; text-decoration: none; border-radius: 5px;">
            Verifiy Email
            </a>
            </div>
                `,
      });
    } catch (error) {
      console.error('failed to send email', error);
      throw new Error('Failed to send verification email');
    }
  }

  public async sendEmailMerchantVerification(
    merchantId: string,
    email: string,
  ) {
    const verificationToken =
      this.generateTokenMerchantVerification(merchantId);
    const verificationLink = `http://localhost:8000/mails/verify-email-merchant?token=${verificationToken}`;

    try {
      await this.transporter.sendMail({
        to: email,
        subject: 'Welcome To Your New Merchant',
        html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Selamat Datang, Merchant Baru!</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .container {
      width: 100%;
      max-width: 600px;
      margin: 20px auto;
      background: #ffffff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    .header {
      text-align: center;
      background: #007BFF;
      color: #ffffff;
      padding: 10px;
      border-radius: 8px 8px 0 0;
    }
    .content {
      padding: 20px;
      color: #333333;
      line-height: 1.6;
    }
    .btn {
      display: inline-block;
      padding: 10px 20px;
      margin-top: 10px;
      color: #ffffff;
      background: #007BFF;
      text-decoration: none;
      border-radius: 5px;
    }
    .footer {
      text-align: center;
      font-size: 12px;
      color: #777777;
      margin-top: 20px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>Selamat Datang, Merchant Baru!</h2>
    </div>
    <div class="content">
      <p>Halo,</p>
      <p>Terima kasih telah bergabung dengan platform kami. Kami sangat senang menyambut Anda sebagai bagian dari komunitas merchant kami.</p>
      <p>Agar akun Anda dapat digunakan sepenuhnya, silakan verifikasi email Anda dengan mengklik tombol di bawah ini:</p>
      <p style="text-align: center;">
        <a href="${verificationLink}" class="btn">Verifikasi Email</a>
      </p>
      <p>Jika Anda tidak mendaftar sebagai merchant, harap abaikan email ini.</p>
      <p>Terima kasih dan selamat berjualan!</p>
    </div>
    <div class="footer">
      <p>&copy; 2024 Platform Kami. Semua Hak Dilindungi.</p>
    </div>
  </div>
</body>
</html>`,
      });
    } catch (error) {
      console.log('error', error);
    }
  }

  public async verifyMerchantEmail(token: string) {
    try {
      const payload = await this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });

      const merchant = await this.prisma.merchant.findUnique({
        where: {
          id: payload.merchantId,
        },
      });

      if (!merchant) {
        throw new Error('merchant not found');
      }

      if (merchant.isVerified) {
        return 'Email merhchant has been verified';
      }

      await this.prisma.merchant.update({
        where: {
          id: payload.merchantId,
        },
        data: {
          isVerified: true,
        },
      });

      return 'email success verified'
    } catch (error) {
      console.error('Token verification failed:', error.message);
      throw new Error('Invalid or expired token');
    }
  }

  public async verifyUserEmail(token: string) {
    try {
      const payload = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET
      })
  
      const user = await this.prisma.user.findUnique({
        where: {
          id: payload.userId
        }
      })
  
      if(!user) {
        throw new Error("user does not exist")
      }
  
      if(user.isVerified) {
        return "email already verified!"
      }
  
      await this.prisma.user.update({
        where: {
          id: payload.userId
        },
        data: {
          isVerified: true
        }
      })
  
      return "email success verified"
    } catch (error) {
      console.error('Token verification failed:', error.message);
      throw new Error('Invalid or expired token');
    }
  }
}
