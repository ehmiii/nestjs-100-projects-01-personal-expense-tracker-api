// NestJS Application Module
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

// Internal Modules & Services
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ExpensesModule } from './expenses/expenses.module';
import { Constants } from './common/constants';

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
          url: configService.get<string>(Constants.DATABASE_URL)
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
