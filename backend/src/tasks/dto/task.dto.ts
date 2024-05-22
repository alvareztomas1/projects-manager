import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { STATUS } from 'src/constants/status';

export class CreateTaskDTO {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsEnum(STATUS)
  @IsNotEmpty()
  status!: STATUS;
}
