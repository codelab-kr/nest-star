import { Injectable } from '@nestjs/common';
import { DataSourceOptions } from 'typeorm';
// import { UserEntity } from '../users/entities/user.entity';
import { ConfigService } from '../config/config.service';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
// import { User } from '../api/auth/user.entity';
@Injectable()
export class DataFactory implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {
    console.log(
      'this.configService.isEnv(localhost): ',
      this.configService.isEnv('localhost'),
    );
    console.log('this.configService.__dirname: ', __dirname);
  }

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
    logging: true,
    // logging: this.configService.isEnv('production')
    //   ? ['error']
    //   : ['error', 'query', 'schema'],
    entities: [__dirname + '/../api/**/*.entity{.ts,.js}'],
    migrations: ['./*.ts'],
    migrationsTableName: 'migrations',
  };

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return this.dataSourceOptions;
  }
}
