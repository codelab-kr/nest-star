import { Repository } from 'typeorm';
import { CustomRepository } from '../../typeorm-ex/typeorm-ex.decorator';
import { PointUse } from './point-use.entity';

@CustomRepository({ entity: PointUse })
export class PointUserepository extends Repository<PointUse> {}
