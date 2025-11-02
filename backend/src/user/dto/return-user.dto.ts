import { UserEntity } from 'src/db/entities/user.entity';
import { UserRole } from 'src/db/enum/user-role.enum';

export class ReturnUserDto {
  id: number;
  name: string;
  email: string;
  role: UserRole;

  constructor(userEntity: UserEntity) {
    this.id = userEntity.id;
    this.name = userEntity.name;
    this.email = userEntity.email;
    this.role = userEntity.role;
  }
}
