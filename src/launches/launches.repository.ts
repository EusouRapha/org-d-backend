import { Repository } from 'typeorm';
import { Launch } from './entities/launch.entity';

export class LaunchesRepository extends Repository<Launch> {}
