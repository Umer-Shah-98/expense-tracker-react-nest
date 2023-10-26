import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Transaction, TransactionSchema } from './schemas/transactions.schema';
import { AccountsService } from 'src/accounts/accounts.service';
import { Account, AccountSchema } from 'src/accounts/schemas/account.schema';
import { CategoriesService } from 'src/categories/categories.service';
import {
  Category,
  CategorySchema,
} from 'src/categories/schemas/category.schema';
import { User, UserSchema } from 'src/users/dto/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Transaction.name, schema: TransactionSchema },
      { name: Account.name, schema: AccountSchema },
      { name: Category.name, schema: CategorySchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [TransactionsController],
  providers: [TransactionsService, AccountsService, CategoriesService],
})
export class TransactionsModule {}
