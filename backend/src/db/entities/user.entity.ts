import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole } from '../enum/user-role.enum';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'name', nullable: false })
  name: string;

  @Column({ name: 'email', nullable: false, unique: true })
  email: string;

  @Column({ name: 'password', nullable: false })
  password: string;

  @Column({
    name: 'role',
    type: 'enum',
    enum: UserRole,
    default: UserRole.Student,
    nullable: false,
  })
  role: UserRole;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
}
