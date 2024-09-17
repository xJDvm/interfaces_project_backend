import { IsString, IsDate, IsEmail, IsNotEmpty, ValidateNested, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

class AddressDto {
  @IsString()
  street?: string;

  @IsString()
  city?: string;

  @IsString()
  state?: string;

  @IsString()
  country?: string;

  @IsNumber()
  postcode?: number;
}

export class CreateProfileDto {

  @IsString()
  username: string;

  @IsString()
  firstname?: string;

  @IsString()
  lastname?: string;

  @IsDate()
  birthdate?: Date;

  @IsString()
  gender?: string;

  @IsString()
  country?: string;

  @IsEmail()
  email?: string;

  @IsString()
  password?: string;

  @ValidateNested()
  @Type(() => AddressDto)
  address: AddressDto;
}
