import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config({});


const SessionStore = createClient({
    url: process.env.REDIS_HOST || 'redis://localhost:6379',
    password: process.env.PASSWORD
});

SessionStore.once('connection', () => {
    console.log('Redis Connection Successfully Established!'); 
});

SessionStore.on('error', (err) => {
    console.error(`[Session Store]: an error with the session store occured\n${err}`);
});

export default SessionStore;