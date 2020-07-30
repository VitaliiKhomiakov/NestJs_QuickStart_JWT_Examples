import {Injectable} from '@nestjs/common';
import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import {UsersEntity} from '../entities/users.entity';
import {UsersModel} from '../models/users.model';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(UsersEntity)
    private userRepository: Repository<UsersEntity>,
  ) {
  }

  async findUser(email: string, phone: string): Promise<UsersModel> {
    const credential: Record<string, string>[] = [
      {email},
    ];

    if (phone && phone.trim()) {
      credential.push({phone});
    }

    return this.userRepository.findOne({
      where: credential,
    }).then(user => user ? new UsersModel(user) : null);
  }

  async create(newUser: UsersModel): Promise<UsersModel> {
    return this.userRepository.save(newUser).then(user => new UsersModel(user));
  }

}
