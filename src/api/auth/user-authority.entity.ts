import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './user.entity';
import { Role } from '../../type/role-type';

@Entity('user_authority')
export class UserAuthority {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'id' })
  id: number;

  @Column('int', { name: 'user_id' })
  @ApiProperty({ description: '유저ID' })
  userId: number;

  @Column({ name: 'authority_name' })
  @ApiProperty({ description: '권한이름' })
  authorityName: Role;

  @CreateDateColumn({ name: 'created_at' })
  @ApiProperty({ description: '생성일시분초' })
  public createdAt: Date;

  @CreateDateColumn({ name: 'deleted_at' })
  @ApiProperty({ description: '삭제일시분초' })
  public deletedAt: Date;

  @ManyToOne(() => User, (user) => user.authorities)
  @JoinColumn({ name: 'user_id' })
  user: User;

  static of(params: Partial<UserAuthority>): UserAuthority {
    const userAuthority = new UserAuthority();
    Object.assign(userAuthority, params);

    return userAuthority;
  }

  static create(user_id: number, authority_name: Role) {
    const userAuthority = new UserAuthority();
    userAuthority.userId = user_id;
    userAuthority.authorityName = authority_name;

    return userAuthority;
  }
}
