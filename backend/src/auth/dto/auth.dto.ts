import { IsNotEmpty, IsString } from 'class-validator';

export class AuthDTO {
  @IsString()
  @IsNotEmpty()
  userIdentifier!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;
}
