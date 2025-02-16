import { Module } from '@nestjs/common';
import { AlunosModule } from './alunos/alunos.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'root',
      password: 'root',
      database: 'gpdatabase',
      autoLoadEntities: true
    })
    , AlunosModule],
})
export class AppModule {}
