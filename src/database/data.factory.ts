import { Injectable } from '@nestjs/common';
import { DataSourceOptions } from 'typeorm';
// import { UserEntity } from '../users/entities/user.entity';
import { ConfigService } from '../config/config.service';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
// import { User } from '../api/auth/user.entity';
@Injectable()
export class DataFactory implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  dataSourceOptions: DataSourceOptions = {
    type: this.configService.get('DB_TYPE') as any,
    host: this.configService.isEnv('localhost')
      ? 'localhost'
      : this.configService.get('DB_HOST'),
    port: this.configService.isEnv('localhost')
      ? parseInt(this.configService.get('DB_HOST_PORT'))
      : parseInt(this.configService.get('DB_CONTAINER_PORT')) || 3306,
    username: this.configService.get('DB_USERNAME'),
    password: this.configService.get('DB_PASSWORD'),
    database: this.configService.get('DB_NAME'),
    synchronize: false,
    logging: this.configService.isEnv('production')
      ? ['error']
      : ['error', 'query', 'schema'],
    entities: [__dirname + '/../../**/*.entity{.ts}'],
    migrations: ['./*.ts'],
    migrationsTableName: 'migrations',
  };

  createTypeOrmOptions(): TypeOrmModuleOptions {
    console.log(
      'this.configService.get(DB_TYPE):',
      this.configService.getEnvConfigPath,
    );
    // console.log('this.configService.get(DB_TYPE):', this.dataSourceOptions.entities.entries);
    // console.log('this.configService.nodeEnv:', this.configService.nodeEnv);
    return this.dataSourceOptions;
  }
}
