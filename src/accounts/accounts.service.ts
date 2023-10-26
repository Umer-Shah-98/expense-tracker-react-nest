import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Account } from './schemas/account.schema';
import { Model } from 'mongoose';
import { error } from 'console';

@Injectable()
export class AccountsService {
  constructor(
    @InjectModel(Account.name)
    private readonly accountModel: Model<Account>,
  ) {}
  async create(account: any) {
    try {
      const userId = account.userId;
      const accountName = account.accountName;
      const filter = { userId, accountName };
      const existingAccounts = await this.accountModel.findOne(filter).exec();
      if (!existingAccounts) {
        const accountCreated = await this.accountModel.create(account);
        return accountCreated;
      } else {
        throw new BadRequestException('Account already exists.');
      }
      //  const userAccounts= existingAccounts.filter(
      //     (acc) => acc.userId.toString() === account.userId,
      //   );
      //   userAccounts.map((userAccount) => {
      //     if (userAccount.accountName === account.accountName) {
      //       throw new BadRequestException('Account already exists.');
      //     }
      //   });
      //   const accountCreated = await this.accountModel.create(account);
      //   return accountCreated;
    } catch (error) {
      if (error instanceof BadRequestException) {
        // Handle validation or business logic errors
        return { error: error.message };
      } else if (error instanceof Error) {
        // Handle other unexpected errors
        return {
          error: 'An error occurred on the server. Please try again later.',
        };
      }
    }
  }
  async createAccountsOnSignup(userId: any) {
    try {
      const cashAccountObject = {
        accountName: 'CASH',
        userId: userId,
        balance: 0,
      };
      const savingsAccountObject = {
        accountName: 'SAVINGS',
        userId: userId,
        balance: 0,
      };
      const cashAccount = await this.accountModel.create(cashAccountObject);
      const savingsAccount =
        await this.accountModel.create(savingsAccountObject);
      return { cashAccount, savingsAccount };
    } catch (error) {
      return error;
    }
  }

  async findAll() {
    try {
      // const accounts = await this.accountModel.find().populate('userId');
      const accounts = await this.accountModel.find().exec();
      return accounts;
    } catch (error) {
      return error;
    }
  }

  async findAllForUser(id: string) {
    try {
      const filter = { userId: id };
      const accounts = await this.accountModel.find(filter).exec();
      // const userAccounts = accounts.filter(
      //   (account) => account.userId.toString() === id,
      // );
      if (accounts.length === 0) {
        throw new NotFoundException('User has no account found');
      } else {
        return accounts;
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        // Handle validation or business logic errors
        return { error: error.message };
      } else if (error instanceof Error) {
        // Handle other unexpected errors
        return {
          error: 'An error occurred on the server. Please try again later.',
        };
      }
    }
  }
  async findOne(id: string) {
    try {
      const accountFound = await this.accountModel.findById(id);
      return accountFound;
    } catch (error) {
      return error;
    }
  }

  async update(id: string, account: any) {
    const updatedAccount = await this.accountModel.findByIdAndUpdate(
      id,
      account,
      { new: true, upsert: true },
    );
    return updatedAccount;
  }

  remove(id: number) {
    return `This action removes a #${id} account`;
  }
}
