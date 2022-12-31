import { Repository } from 'typeorm';
import { CustomRepository } from '../../../decorator/typeorm-ex.decorator';
import { UserAuthority } from '../user-authority.entity';

@CustomRepository(UserAuthority)
export class UserAuthorityRepository extends Repository<UserAuthority> {}
