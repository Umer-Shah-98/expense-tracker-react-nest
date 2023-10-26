import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Error, Model } from 'mongoose';
import { User } from './dto/schemas/user.schema';
import * as bcrypt from 'bcryptjs';
import { AccountsService } from 'src/accounts/accounts.service';
import { CategoriesService } from 'src/categories/categories.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private accountService: AccountsService,
    private categoryService: CategoriesService,
  ) {}
  async create(user: any) {
    try {
      const username=user.username;
      const password=user.password;
      const email=user.email
      // const { username, email, password } = user;
      const filter = { email:email };
      const userFound = await this.userModel.find(filter).exec();
      console.log(userFound);
      
      if (userFound.length===0) {
        const hashedPassword = await bcrypt.hash(password, 5);

        const newUser = new this.userModel({
          username,
          email,
          password: hashedPassword,
        });
        const userCreated = await this.userModel.create(newUser);
        const userId = userCreated._id;
        const bankAccounts =
          await this.accountService.createAccountsOnSignup(userId);
        const categories =
          await this.categoryService.createCategoriesOnSignup(userId);
        // console.log(userCreated._id);
        return {
          user: userCreated,
          cashAccount: bankAccounts.cashAccount,
          savingsAccount: bankAccounts.savingsAccount,
          categories: categories,
        };
      } else {
        throw new BadRequestException('Email already exists, try unique one.');
      }
      // users.map((user) => {
      //   if (user.email === email) {
      //     throw new BadRequestException(
      //       'Email already exists, try unique one.',
      //     );
      //   }
      // });
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

  async findAll() {
    try {
      const users = await this.userModel.find().exec();
      return users;
    } catch (error) {
      return error;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
  async findByEmail(email: string): Promise<User | null> {
    try {
      const user = await this.userModel.findOne({ email }).exec();
      console.log(user);
      return user;
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
