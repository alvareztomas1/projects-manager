import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './app.module';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';

describe('AppModule', () => {
  let moduleRef: TestingModule;
  let usersModule: UsersModule;
  let projectsModule: ProjectsModule;
  let tasksModule: TasksModule;
  let authModule: AuthModule;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    usersModule = moduleRef.get(UsersModule);
    projectsModule = moduleRef.get(ProjectsModule);
    tasksModule = moduleRef.get(TasksModule);
    authModule = moduleRef.get(AuthModule);
  });

  it('should be defined', () => {
    expect(moduleRef).toBeDefined();
    expect(AppModule).toBeDefined();
  });

  describe('UsersModule', () => {
    it('should be defined', () => {
      expect(usersModule).toBeDefined();
      expect(usersModule).toBeInstanceOf(UsersModule);
    });
  });

  describe('ProjectsModule', () => {
    it('should be defined', () => {
      expect(projectsModule).toBeDefined();
      expect(projectsModule).toBeInstanceOf(ProjectsModule);
    });
  });

  describe('TasksModule', () => {
    it('should be defined', () => {
      expect(tasksModule).toBeDefined();
      expect(tasksModule).toBeInstanceOf(TasksModule);
    });
  });

  describe('AuthModule', () => {
    it('should be defined', () => {
      expect(authModule).toBeDefined();
      expect(authModule).toBeInstanceOf(AuthModule);
    });
  });
});
