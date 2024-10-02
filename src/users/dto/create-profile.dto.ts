import { IsString, IsNumber, IsOptional, ValidateNested, IsDateString, IsEmail } from 'class-validator';
import { Type } from 'class-transformer';

class AddressDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  state?: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  lat?: string;

  @IsOptional()
  @IsString()
  lon?: string;

  @IsOptional()
  @IsString()
  postcode?: string;

  @IsOptional()
  @IsString()
  street?: string;
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

  @IsOptional()
  @IsString()
  imagePath?: string;

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

  @IsOptional()
  @IsString()
  timezone?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => AddressDto)
  address: AddressDto;
}
