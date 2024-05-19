import { Module } from '@nestjs/common';
import { ProjectsController } from './controllers/projects.controller';
import { ProjectsService } from './services/projects.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectEntity } from './entities/project.entity';
import { UsersService } from 'src/users/services/users.service';
import { UserProjectEntity } from 'src/users/entities/userProject.entity';
import { UserEntity } from 'src/users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProjectEntity, UserProjectEntity, UserEntity]),
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService, UsersService],
  exports: [ProjectsService],
})
export class ProjectsModule {}
