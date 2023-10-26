import {
  IsNotEmpty,
  IsString,
  IsEmail,
  MinLength,
  IsBoolean,
  MaxLength,
  IsNumber,
} from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  readonly categoryName: string;
  @IsNotEmpty()
  readonly userId: string;
  // @IsNotEmpty()
  @IsNumber()
  readonly totalAmount: number;
  @IsNotEmpty()
  @IsNumber()
  readonly incomeAmount: number;
  @IsNotEmpty()
  @IsNumber()
  readonly expenseAmount: number;
}
