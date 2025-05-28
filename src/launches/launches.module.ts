import { Module } from '@nestjs/common';
import { LaunchesService } from './launches.service';
import { LaunchesController } from './launches.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Launch } from './entities/launch.entity';
import { AccountsModule } from 'src/accounts/accounts.module';
import { AccountsService } from 'src/accounts/accounts.service';

@Module({
  imports: [TypeOrmModule.forFeature([Launch]), AccountsModule],
  controllers: [LaunchesController],
  providers: [LaunchesService],
  exports: [LaunchesService],
})
export class LaunchesModule {}
