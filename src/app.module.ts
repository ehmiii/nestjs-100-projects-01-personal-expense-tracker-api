// NestJS Application Module
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

// Internal Modules & Services
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ExpensesModule } from './expenses/expenses.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(
      {
        type: 'postgres',
        url: process.env.DATABASE_URL,
      }
    ),
    AuthModule,
    UserModule,
    ExpensesModule,

  ],
  // controllers: [UserController, ExpensesController],
  // providers: [AuthService],
})
export class AppModule { }
