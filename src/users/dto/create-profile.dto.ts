import { IsString, IsNumber, IsOptional, ValidateNested, IsDateString, IsEmail } from 'class-validator';
import { Type } from 'class-transformer';

class AddressDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  state: string;

  @IsString()
  @IsOptional()
  country: string;

  @IsString()
  @IsOptional()
  city: string;

  @IsNumber()
  @IsOptional()
  lat: number;

  @IsNumber()
  @IsOptional()
  lon: number;

  @IsNumber()
  @IsOptional()
  postcode: number;

  @IsString()
  @IsOptional()
  street: string;
}

export class CreateProfileDto {
  @IsString()
  username: string;

  @IsString()
  @IsOptional()
  firstname?: string;

  @IsString()
  @IsOptional()
  lastname?: string;

  @IsOptional()
  birthdate?: Date;

  @IsString()
  @IsOptional()
  gender?: string;

  @IsNumber()
  @IsOptional()
  phone?: number;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  password?: string;

  @ValidateNested()
  @Type(() => AddressDto)
  address: AddressDto;
}
