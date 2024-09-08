import { Transform } from "class-transformer";
import { IsEmail, IsString, MinLength, IsOptional } from "class-validator";

export class RegisterDto {

  @Transform(({ value }) => value.trim())
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(8)
  password: string;

  @IsOptional()
  @IsString()
  lastname?: string;

  @IsOptional()
  @IsString()
  rol?: string;
}
