import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from '../config';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    console.log(
      'this.configService.get(DB_TYPE):',
      this.configService.get('DB_TYPE'),
    );
    console.log(
      'this.configService.nodeEnv:',
      this.configService.isEnv('localhost'),
    );
    console.log(
      this.configService.nodeEnv === 'localhost'
        ? 'localhost'
        : this.configService.get('DB_HOST'),
    );
    return {
      type: this.configService.get('DB_TYPE') as any,
      host: this.configService.isEnv('localhost')
        ? 'localhost'
        : this.configService.get('DB_HOST'),
      port: this.configService.isEnv('localhost')
        ? parseInt(this.configService.get('DB_OUT_PORT'))
        : parseInt(this.configService.get('DB_PORT')),
      username: this.configService.get('DB_USERNAME'),
      password: this.configService.get('DB_PASSWORD'),
      database: this.configService.get('DB_NAME'),
      entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
      synchronize: false,
      logging: !this.configService.isEnv('production'),
    };
  }
}
