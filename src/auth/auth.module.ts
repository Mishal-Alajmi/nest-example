import { Module } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { SessionStoreModule } from './session-store/session-store.module';
import { LocalStartegy } from './strategies/local.strategy';

@Module({
  imports: [UserModule, SessionStoreModule],
  providers: [AuthService, LocalStartegy],
  controllers: [AuthController]
})
export class AuthModule {}
