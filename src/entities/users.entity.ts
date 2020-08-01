import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity('users', { schema: 'fit' })
export class UsersEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'email', length: 255 })
  email: string;

  @Column('varchar', { name: 'firstName', length: 255 })
  firstName: string;

  @Column('varchar', { name: 'middleName', length: 255 })
  middleName: string;

  @Column('varchar', { name: 'lastName', length: 255 })
  lastName: string;

  @Column('varchar', { name: 'phone', length: 255 })
  phone: string;

  @Column('int', { name: 'isEnabled', default: () => '\'1\'' })
  isEnabled: number;

  @Column('varchar', { name: 'password', length: 255 })
  password: string;
}
