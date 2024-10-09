import { IsString, IsNumber, IsOptional, ValidateNested, IsDateString, IsEmail } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateConfigDto {
  @IsString()
  color1: string;

  @IsString()
  @IsOptional()
  color2?: string;

  @IsString()
  @IsOptional()
  color3?: string;

  @IsString()
  @IsOptional()
  h1size?: string;

  @IsOptional()
  @IsString()
  h2size?: string;

  @IsString()
  @IsOptional()
  psize?: string;

  @IsString()
  @IsOptional()
  fonttitle?: string;

  @IsOptional()
  @IsString()
  fontp?: string;

  @IsNumber()
  userId: number;
}
