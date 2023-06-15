import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { EmailService } from '../email/email.service';

@Controller('health')
@ApiTags('')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private db: TypeOrmHealthIndicator,
    private email: EmailService,
  ) {}

  @Get()
  // @Get('/health')
  @ApiOperation({ description: 'health check' })
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.http.pingCheck('api-docs', 'http://localhost:3000/api-docs'),
      () => this.db.pingCheck('database'),
      () => this.email.pingCheck('email'),
    ]);
  }
}
