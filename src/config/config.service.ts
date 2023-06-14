import * as dotenv from 'dotenv';
import * as path from 'path';

export class ConfigService {
  private readonly envConfig: { [key: string]: string };

  // constructor(filePath: string) {
  //   this.envConfig = dotenv.parse(fs.readFileSync(filePath));
  //   console.log(fs.readFileSync(filePath));
  // }
  constructor() {
    this.envConfig = dotenv.config({
      path: path.resolve(__dirname + `/env/.env`),
    }).parsed;
    console.log(
      'path.resolve(__dirname + `/env/.env`): ',
      path.resolve(__dirname + `/env/.env`),
    );
    console.log(
      'this.envConfig: ',
      [__dirname + '/../../**/*.entity{.ts}'].flat(),
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
