import {
  IsNotEmpty,
  IsString,
  IsEmail,
  MinLength,
  IsBoolean,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  constructor(username: string, email: string, password: string) {
    this.username = username;
    this.email = email;
    this.password = password;
  }
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  readonly username: string;
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  readonly email: string;
  @IsString()
  @MinLength(6)
  @MaxLength(128)
  readonly password: string;
}
