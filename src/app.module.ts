import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MysqlService } from 'configs/mysql/mysql.service';
import configuration from 'configs/configuration';
import { UserModule } from './services/user/user.module';
import { AuthModule } from './services/auth/auth.module';
import { BoardModule } from './services/board/board.module';
import { ArtworkModule } from './services/artwork/artwork.module';
import { ExhibitionModule } from './services/exhibition/exhibition.module';
import { ExhibitionArtworkModule } from './services/exhibition-artwork/exhibition-artwork.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useClass: MysqlService,
    }),
    UserModule,
    AuthModule,
    BoardModule,
    ArtworkModule,
    ExhibitionModule,
    ExhibitionArtworkModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule {}
