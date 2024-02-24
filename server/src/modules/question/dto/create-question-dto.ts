import { CreateOptionDto } from '../../option/dto/create-option-dto';
import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateQuestionDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  quiz: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOptionDto)
  options: CreateOptionDto[];
}
