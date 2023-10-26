import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsBoolean } from 'class-validator';
import mongoose, { Document, Types } from 'mongoose';
import { Account } from 'src/accounts/schemas/account.schema';
import { Category } from 'src/categories/schemas/category.schema';
import { User } from 'src/users/dto/schemas/user.schema';

@Schema({
  timestamps: true,
})
export class Transaction extends Document {
  @Prop({ required: true })
  categoryName: string;

  @Prop({ required: true })
  accountName: string;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  amount: number;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
    required: true,
  })
  userId: Types.ObjectId | User | string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Account.name,
    required: true,
  })
  accountId: Types.ObjectId | User | string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Category.name,
    required: true,
  })
  categoryId: Types.ObjectId | Category | string;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
