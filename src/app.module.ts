import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { UserController } from './user/user.controller';
import { ExpensesController } from './expenses/expenses.controller'
@Module({
  imports: [],
  controllers: [AuthController, UserController, ExpensesController]
})
export class AppModule { }
