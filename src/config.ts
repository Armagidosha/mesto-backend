interface EnvConfig {
  PORT: number,
  MONGO_CONNECT: string,
  JWT_KEY: string
}

const envConfig: EnvConfig = {
  PORT: process.env.PORT ? Number(process.env.PORT) : 3000,
  MONGO_CONNECT: process.env.MONGO_CONNECT || 'mongodb://127.0.0.1:27017/mestodb',
  JWT_KEY: process.env.JWT_KEY || 'some-secret-key',
};

export default envConfig;
