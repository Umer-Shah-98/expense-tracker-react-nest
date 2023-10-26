import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsBoolean } from 'class-validator';
import mongoose, { Document, Types } from 'mongoose';
import { User } from 'src/users/dto/schemas/user.schema';

@Schema({
  timestamps: true,
})
export class Account extends Document {
  @Prop({ required: true })
  accountName: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
    required: true,
  })
  userId: Types.ObjectId | User | string;

  @Prop({ required: true })
  balance: number;

  // @Prop({type:{type:mongoose.Schema.Types.ObjectId, ref:Account.name}})
  // @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Request' }] })
  // requests: Request[];
}

export const AccountSchema = SchemaFactory.createForClass(Account);
