import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BackendModule } from './backend/backend.module';
import { FrontendModule } from './frontend/frontend.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import * as Joi from '@hapi/joi';

@Module({
  imports: [
    BackendModule, 
    FrontendModule,
    ConfigModule.forRoot({
        validationSchema: Joi.object({
          MYSQL_HOST: Joi.string().required(),
          MYSQL_PORT: Joi.number().required(),
          MYSQL_USER: Joi.string().required(),
          MYSQL_PASSWORD: Joi.string().required(),
          MYSQL_DB: Joi.string().required(),
          PORT: Joi.number(),
        })
      }),
    DatabaseModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
