import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class MysqlService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const mysqlConfigOptions = this.configService.get('db');
    return {
      ...mysqlConfigOptions,
      entities: [__dirname + '/../../models/entities/*.entity.{js,ts}'],
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
    };
  }
}
