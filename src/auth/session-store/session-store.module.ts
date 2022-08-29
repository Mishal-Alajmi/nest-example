import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SessionStoreService } from './session-store.service';

@Module({
  imports: [ConfigService],
  providers: [SessionStoreService],
  exports: [SessionStoreService]
})
export class SessionStoreModule {}
