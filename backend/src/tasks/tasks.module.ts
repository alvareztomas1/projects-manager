import { Module } from '@nestjs/common';
import { TasksController } from './controllers/tasks.controller';
import { TasksService } from './services/tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from './entities/task.entity';
import { UsersModule } from 'src/users/users.module';
import { ProjectsModule } from 'src/projects/projects.module';
import { UserTaskEntity } from 'src/users/entities/userTask.entity';

@Module({
  imports: [
    UsersModule,
    ProjectsModule,
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
