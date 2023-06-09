import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Role } from 'src/auth/entities';
import { Speciality } from 'src/specialities/entities/speciality.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name?: string;

  @Column({ nullable: true })
  surname?: string;

  @Column()
  username: string;

  @Exclude({ toPlainOnly: true })
  @Column()
  password: string;

  @ManyToMany(() => Role)
  @JoinTable({
    name: 'users_roles',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
  })
  roles: Role[];

  @ManyToMany(() => Speciality)
  @JoinTable({
    name: 'users_specialities',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'speciality_id',
      referencedColumnName: 'id',
    },
  })
  specialities: Speciality[];

  @Column({ nullable: true })
  refresh_token?: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
