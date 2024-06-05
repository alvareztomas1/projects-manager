import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  DataSourceConfig,
  DataSourceConfigTesting,
} from './config/data.source';
import { ProjectsModule } from './projects/projects.module';
import { AuthModule } from './auth/auth.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV.trim()}.env`,
    }),
    TypeOrmModule.forRoot({
      ...(process.env.NODE_ENV === 'test'
        ? DataSourceConfigTesting
        : DataSourceConfig),
    }),
    UsersModule,
    ProjectsModule,
    AuthModule,
    TasksModule,
  ],
})
export class AppModule {}
