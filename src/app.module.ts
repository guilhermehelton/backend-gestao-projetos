import { Module } from '@nestjs/common';
import { AlunosModule } from './alunos/alunos.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';

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
    , AlunosModule, AuthModule],
})
export class AppModule {}
