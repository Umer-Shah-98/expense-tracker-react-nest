import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsBoolean } from 'class-validator';
import mongoose, { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class User extends Document {
  @Prop({ required: true })
  username: string;

  @Prop({
    unique: true,
    required: true,
  })
  email: string;

  @Prop({ required: true })
  password: string;

  // @Prop({type:{type:mongoose.Schema.Types.ObjectId, ref:Account.name}})
  // @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Request' }] })
  // requests: Request[];
}

export const UserSchema = SchemaFactory.createForClass(User);
