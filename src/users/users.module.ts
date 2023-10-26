import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './dto/schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { AccountsService } from 'src/accounts/accounts.service';
import { Account, AccountSchema } from 'src/accounts/schemas/account.schema';
import {
  Category,
  CategorySchema,
} from 'src/categories/schemas/category.schema';
import { CategoriesService } from 'src/categories/categories.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Account.name, schema: AccountSchema },
      { name: Category.name, schema: CategorySchema },
    ]),
    JwtModule.register({
      secret: 'nestjs',
      signOptions: { expiresIn: '3d' },
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, AccountsService, CategoriesService],
})
export class UsersModule {}
