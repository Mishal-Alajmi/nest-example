import { Injectable } from '@nestjs/common';
import SessionStore from './session.store';
import { RedisClientType } from '@redis/client';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SessionStoreService {
    constructor(
        private sessionStore: RedisClientType,
        private config: ConfigService) {}

    async retrieveSession(sessionID: string) {
        const session_id = await this.sessionStore.get
    }

    async storeSession(session: any) {

    }
}
