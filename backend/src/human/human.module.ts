import { Module } from '@nestjs/common';
import { Human } from './human.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Human])],
  exports: [TypeOrmModule],
})
export class HumanModule {}
