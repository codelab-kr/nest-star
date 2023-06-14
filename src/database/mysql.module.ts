import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '../config';
// import { TypeOrmConfigService } from './ormconfig.service';
import { DataFactory } from './data.factory';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      // useClass: TypeOrmConfigService,
      useClass: DataFactory,
      inject: [ConfigService],
    }),
  ],
})
export class MySQLModule {}
