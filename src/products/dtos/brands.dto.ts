import { IsString, IsNumber, IsUrl, IsNotEmpty, IsEmail, IsDate, IsPositive } from 'class-validator'
import { PartialType } from '@nestjs/swagger';

export class CreateBrandDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsString()
  @IsNotEmpty()
  readonly location: string;

  @IsUrl()
  @IsNotEmpty()
  readonly image: string;
}
export class UpdateBrandDto extends PartialType(CreateBrandDto) { }
