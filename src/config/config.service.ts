import * as dotenv from 'dotenv';
import * as path from 'path';

export class ConfigService {
  private readonly envConfig: { [key: string]: string };

  constructor() {
    this.envConfig = dotenv.config({
      path: path.resolve(__dirname + `/env/.env`),
    }).parsed;
    console.log(
      'path.resolve(__dirname + `/env/.env`): ',
      path.resolve(__dirname + `/env/.env`),
    );
  }

  get(key: string): string {
    return this.envConfig[key];
  }

  isEnv(env: string): boolean {
    return this.nodeEnv === env;
  }

  get nodeEnv(): string {
    return process.env.NODE_ENV || 'localhost';
  }

  get getEnvConfigPath(): string {
    return path.resolve(__dirname + `../../.env`);
  }
}
