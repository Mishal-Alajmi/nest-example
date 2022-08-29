import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import * as session  from 'express-session';
import * as passport from 'passport';
import SessionStore from './auth/session-store/session.store';

import { AppModule } from './app.module';

const RedisStore = require('connect-redis')(session);
const RedisClient = SessionStore
RedisClient.connect().catch(console.error);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true
  }));
  app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60000,
    },
    store: new RedisStore({ client: RedisClient })
  }));
  await app.listen(3000);
}
bootstrap();
