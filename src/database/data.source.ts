import { DataSource } from 'typeorm';
import { ConfigService } from '../config/config.service';
import { DataFactory } from './data.factory';

// for typeorm migration
export const dataSource: DataSource = new DataSource(
  new DataFactory(new ConfigService()).dataSourceOptions,
);
