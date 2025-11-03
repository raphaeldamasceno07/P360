import { UserEntity } from 'src/db/entities/user.entity';

export class LoginPayload {
  id: number;
  role: number;

  constructor(user: UserEntity) {
    this.id = user.id;
    this.role = user.role;
  }
}
