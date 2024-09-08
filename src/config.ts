import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
  database: {
    name: process.env.DATABASE_NAME,
    port: parseInt(process.env.DATABASE_PORT, 10),
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
  },
  apiKey: process.env.API_KEY,
  autoLoadEntities: process.env.AUTO_LOAD_ENTITIES === 'true',
  synchronize: process.env.SYNCHRONIZE === 'true',
}));
