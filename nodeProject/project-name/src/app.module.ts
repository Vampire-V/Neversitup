import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [TodoModule, ProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
