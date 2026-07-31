import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GateWayModule } from './gateway/gateway.module';
import { Socket } from 'socket.io-client';

@Module({
  imports: [GateWayModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
