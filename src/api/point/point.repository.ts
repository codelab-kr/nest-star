import { Repository } from 'typeorm';
import { Point } from './point.entity';
import { CustomRepository } from '../../typeorm-ex/typeorm-ex.decorator';

@CustomRepository(Point)
export class PointRepository extends Repository<Point> {}
