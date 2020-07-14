import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppService } from './app.service';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { SettingsModule } from './settings/settings.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      "type": "mysql",
      "host": process.env.MYSQL_HOST,
      "port": parseInt(process.env.MYSQL_PORT) || 3306,
      "username": process.env.MYSQL_USER,
      "password": process.env.MYSQL_PASSWORD || "",
      "database": process.env.MYSQL_DATABASE,
      "entities": ["dist/**/*.entity{.ts,.js}"],
      "migrationsTableName": "_migrations",
      "migrations": [__dirname + "/../migration/*.js"],
      "migrationsRun": process.env.MYSQL_MIGRATIONS_ON_START === "true",
      "cli": {
        "migrationsDir": "migration"
      }
  }), UsersModule, SettingsModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
