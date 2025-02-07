import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosModule } from './todos/todos.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    TodosModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../ frontend', 'dist'),
      exclude: ['api/*'],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
