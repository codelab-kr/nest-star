import MailemailConfig = require('nodemailer/lib/mailer');
import * as nodemailer from 'nodemailer';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { emailConfig, testEmailConfig } from '../config/functional/emailConfig';
import { HealthIndicatorResult } from '@nestjs/terminus';
import { EmailOptions } from './interface/email.options';
import { CronJob, CronJobParameters } from 'cron';
import { SchedulerRegistry } from '@nestjs/schedule';
import * as ics from 'ics';
import { IcalAttachment } from 'nodemailer/lib/mailer';

@Injectable()
export class EmailService {
  private transporter: MailemailConfig;

  constructor(
    private readonly logger: Logger,
    @Inject(
      process.env.NODE_ENV === 'development'
        ? testEmailConfig.KEY
        : emailConfig.KEY,
    )
    private readonly config:
      | ConfigType<typeof emailConfig>
      | ConfigType<typeof testEmailConfig>,

    private readonly schedulerRegistry: SchedulerRegistry,
  ) {
    this.transporter = nodemailer.createTransport(this.config);
  }

  async pingCheck(key: string): Promise<HealthIndicatorResult> {
    let status: 'up' | 'down' = 'down';
    try {
      status = (await this.transporter.verify()) ? 'up' : 'down';
      return { [key]: { status } };
    } catch (error) {
      this.logger.error(error);
      throw new Error(error);
    }
  }

  async sendEmail(emailOptions: EmailOptions) {
    await this.transporter.sendMail(emailOptions);
  }

  async addEmailJob(
    emailOptions: EmailOptions,
    cronJobName: string,
    cronJobParameters: CronJobParameters,
  ) {
    const job = new CronJob({
      ...cronJobParameters,
      onTick: () => this.transporter.sendMail(emailOptions),
    });
    this.schedulerRegistry.addCronJob(cronJobName, job);
  }

  async sendIcs(emailOptions: EmailOptions, event: ics.EventAttributes) {
    ics.createEvent(event, (e, v) => {
      emailOptions.attachments = [
        {
          filename: 'event.ics',
          method: 'request',
          content: v,
        },
      ] as IcalAttachment[];
      this.transporter.sendMail(emailOptions);
    });
  }
}
