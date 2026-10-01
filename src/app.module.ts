import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ProductsModule } from './products/products.module.js';
import { TasksModule } from './tasks/tasks.module.js';

@Module({
  imports: [ProductsModule, TasksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
