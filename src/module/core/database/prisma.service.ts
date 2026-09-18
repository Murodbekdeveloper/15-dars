import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor(configService: ConfigService) {
    const adapter = new PrismaPg({
      connectionString: configService.get('DATABASE_URL'),
    });
    super({ adapter });
  }
  private readonly logger = new Logger(PrismaClient.name);
  async onModuleInit() {
    await this.$connect();
    this.logger.log('DATABASE CONNECT')
  }
  async onModuleDestroy() {
    await this.$disconnect();
    this.logger.error('DATABASE DISCONNECT');
  }
}
