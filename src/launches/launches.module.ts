import { Module } from '@nestjs/common';
import { LaunchesService } from './launches.service';
import { LaunchesController } from './launches.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Launch } from './entities/launch.entity';
import { AccountsModule } from 'src/accounts/accounts.module';

@Module({
  imports: [TypeOrmModule.forFeature([Launch]), AccountsModule],
  controllers: [LaunchesController],
  providers: [LaunchesService],
})
export class LaunchesModule {}
