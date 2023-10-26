import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Transaction } from './schemas/transactions.schema';
import { Model } from 'mongoose';
import { AccountsService } from 'src/accounts/accounts.service';
import { CategoriesService } from 'src/categories/categories.service';
import { ObjectId } from 'mongodb'; // Import ObjectId from the 'mongodb' library
import { User } from 'src/users/dto/schemas/user.schema';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel(Transaction.name)
    private readonly transactionModel: Model<Transaction>,
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private accountService: AccountsService,
    private categoryService: CategoriesService,
  ) {}
  async create(transaction: any) {
    try {
      const { accountId, amount, categoryId } = transaction;
      if (transaction.type === 'INCOME') {
        //finding and adding amount to the account
        const userAccount = await this.accountService.findOne(accountId);
        const accountBalance = userAccount.balance;
        const updatedAccountBalance = accountBalance + amount;
        console.log(updatedAccountBalance);

        const updatedUserAccount = await this.accountService.update(accountId, {
          balance: updatedAccountBalance,
        });

        //finding and adding amount to the category
        const categorySelected = await this.categoryService.updateOnAddIncome(
          categoryId,
          amount,
        );
        const transactionCreated =
          await this.transactionModel.create(transaction);
        return transactionCreated;
      } else if (transaction.type === 'EXPENSE') {
        const userAccount = await this.accountService.findOne(accountId);
        const accountBalance = userAccount.balance;
        if (accountBalance >= amount) {
          const updatedAccountBalance = accountBalance - amount;
          const updatedUserAccount = await this.accountService.update(
            accountId,
            { balance: updatedAccountBalance },
          );

          //finding and adding amount to the category
          const categorySelected =
            await this.categoryService.updateOnAddExpense(categoryId, amount);

          const transactionCreated =
            await this.transactionModel.create(transaction);
          return transactionCreated;
        } else {
          throw new BadRequestException(
            'You do not have enough amount to process the transaction.',
          );
        }
      }
    } catch (error) {
      if (error instanceof BadRequestException) {
        // Handle validation or business logic errors
        return { error: error.message };
      } else {
        // Handle other unexpected errors
        return {
          error: 'An error ocurred while transaction, try later.',
        };
      }
    }
  }

  async findAll() {
    try {
      const transactions = await this.transactionModel.find().exec();
      return transactions;
    } catch (error) {
      return { error: error };
    }
  }

  async getRecentTransactionsForUser(userId: string) {
    try {
      const userObjectId = new ObjectId(userId);
      const recentTransactions = await this.transactionModel
        .find({ userId: userObjectId }) // Filter transactions by user
        .sort({ createdAt: -1 }) // Sort by the 'createdAt' field in descending order (most recent first)
        .limit(5) // Limit the results to 5 transactions
        .exec();

      return recentTransactions;
    } catch (error) {
      return { error: 'Error occurred while fetching data' };
    }
  }

  async findAllForUser(id: string) {
    try {
      const filter1 = { _id: id };
      const filter2 = { userId: id };
      const user = await this.userModel.findOne(filter1).exec();

      if (!user) {
        // No user with the provided id, return an error
        throw new NotFoundException();
      }

      // A user with the provided id was found, now check transactions
      const transactions = await this.transactionModel
        .find(filter2)
        .sort({ createdAt: -1 })
        .exec();

      if (!transactions || transactions.length === 0) {
        // No transactions found for the user, return an empty array
        return [];
      } else {
        // Transactions found, return them
        return transactions;
      }
      // const userTransactions = transactions.filter(
      //   (transaction) => transaction.userId.toString() === id,
      // );
      // if (!userTransactions) {
      //   throw new NotFoundException();
      // } else {
      // }
    } catch (error) {
      if (error instanceof NotFoundException) {
        return { error: 'User is not found!!!.' };
      } else {
        return { error: error };
      }
    }
  }
  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  //removing many transactions fro user
  async removeTransactions(condition: any): Promise<{ deletedCount: number }> {
    try {
      const result = await this.transactionModel.deleteMany(condition).exec();
      return result;
    } catch (error) {
      throw error;
    }
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}
