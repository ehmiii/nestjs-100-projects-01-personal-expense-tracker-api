// NestJS Application Module
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

// Internal Modules & Services
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ExpensesModule } from './expenses/expenses.module';
import { Constants } from './common/constants';
import { Expense } from './expenses/expens.entity';
import { Users } from './user/users.entity';
import { UserSubscriber } from './user/user.subscriber';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync(
      {
        // imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          type: 'postgres',
          url: configService.get<string>(Constants.DATABASE_URL),
          // entities: [Users, Expense],
          subscribers: [UserSubscriber],
          autoLoadEntities: true,
          synchronize: true,
        })
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
