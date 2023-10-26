import {
  IsNotEmpty,
  IsString,
  IsEmail,
  MinLength,
  IsBoolean,
  MaxLength,
  IsNumber,
} from 'class-validator';

export class CreateAccountDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  readonly accountName: string;
  @IsNotEmpty()
  @IsString()
  readonly userId: string;
  @IsNumber()
  readonly balance: number;
}
