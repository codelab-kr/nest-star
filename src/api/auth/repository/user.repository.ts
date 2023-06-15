import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { CustomRepository } from '../../../typeorm-ex/typeorm-ex.decorator';

@CustomRepository({ entity: User })
export class UserRepository extends Repository<User> {}
