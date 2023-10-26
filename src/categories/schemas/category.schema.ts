import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsBoolean } from 'class-validator';
import mongoose, { Document, Types } from 'mongoose';
import { User } from 'src/users/dto/schemas/user.schema';

@Schema({
  timestamps: true,
})
export class Category extends Document {
  @Prop({ required: true })
  categoryName: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
    required: true,
  })
  userId: Types.ObjectId | User | string;

  @Prop({ default: 0 })
  totalAmount: number;

  @Prop({ default: 0 })
  incomeAmount: number;

  @Prop({ default: 0 })
  expenseAmount: number;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
