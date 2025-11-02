import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserRole } from 'src/db/enum/user-role.enum';

export class CreateUserDto {
  @MinLength(3)
  @MaxLength(150)
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsStrongPassword()
  password: string;

  @IsEnum(UserRole, {
    message: `A função deve ser um dos seguintes valores: ${Object.values(
      UserRole,
    ).join(', ')}`,
  })
  @IsOptional()
  // O campo 'role' é opcional no DTO, pois se não for passado,
  // o TypeORM usará o default 'Student' definido na Entity.
  role?: UserRole; // Use 'UserRole' como tipo TypeScript
}
