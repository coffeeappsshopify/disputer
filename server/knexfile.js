import { config } from 'dotenv';
config();

const connection = {
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
  },
  migrations: {
    directory: './migrations',
  }
};

export default {
  development: {
    ...connection,
  },
  production: {
    ...connection,
  },
};
