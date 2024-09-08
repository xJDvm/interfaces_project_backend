import { IsString, IsNumber, IsUrl, IsNotEmpty, IsEmail, IsDate, IsPositive } from 'class-validator'
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The name of a category',
    type: String,
    example: 'Category name'
  })
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsUrl()
  @IsNotEmpty()
  readonly image: string;
}
export class UpdateCategoryDto extends PartialType(CreateCategoryDto) { }
