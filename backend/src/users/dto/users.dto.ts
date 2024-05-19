import { IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ROLES } from 'src/constants/roles';
import { PartialType } from '@nestjs/mapped-types';
import { ACCESS_LEVEL } from 'src/constants/access-levels';

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  username!: string;

  @IsString()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;

  @IsString()
  @IsNotEmpty()
  firstName!: string;

  @IsString()
  @IsNotEmpty()
  lastName!: string;

  @IsEnum(ROLES)
  @IsNotEmpty()
  role!: ROLES;
}

export class UpdateUserDTO extends PartialType(CreateUserDTO) {}

export class CreateUserToProjectDTO {
  @IsEnum(ACCESS_LEVEL)
  @IsNotEmpty()
  accessLevel!: ACCESS_LEVEL;

  @IsUUID()
  @IsNotEmpty()
  user!: string;

  @IsUUID()
  @IsNotEmpty()
  project!: string;
}
