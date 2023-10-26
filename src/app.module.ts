import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AccountsModule } from './accounts/accounts.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionsModule } from './transactions/transactions.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      cache: true,
      isGlobal: true,
    }),

    // MongooseModule.forRoot(
    //   'mongodb+srv://umershah1998:3L6JFk776F7Fddma@cluster0.facce4e.mongodb.net/expense-tracker-app?retryWrites=true&w=majority'
    // ),
    MongooseModule.forRootAsync({
      imports: [ConfigModule], // Import the ConfigModule
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('DATABASE_URI'), // Use the environment variable from .env
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    AccountsModule,
    TransactionsModule,
    CategoriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
