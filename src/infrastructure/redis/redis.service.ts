import { Injectable, Logger, OnModuleDestroy } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleDestroy {
  private readonly client: Redis;
  private readonly logger = new Logger(RedisService.name);

  constructor() {
    this.client = new Redis({
      host: process.env.REDIS_HOST || 'localhost',
      port: Number(process.env.REDIS_PORT) || 6379,
      password: process.env.REDIS_PASSWORD || undefined,
      retryStrategy: (times) => {
        return Math.min(times * 50, 2000);
      },
    });

    this.client.on('connect', () => {
      this.logger.log('Connected to Redis Successfully!');
    });

    this.client.on('error', (err) => {
      this.logger.error('Error connecting to Redis');
    });
  }

  async get(key: string): Promise<string | null> {
    try {
      return await this.client.get(key);
    } catch {
      this.logger.error('Could not find the key on Redis');
      return null;
    }
  }

  async set(key: string, value: string, ttlSeconds?: number): Promise<void> {
    try {
      if (ttlSeconds) {
        await this.client.set(key, value, 'EX', ttlSeconds);
      } else {
        await this.client.set(key, value);
      }
    } catch {
      this.logger.error('Error saving the key on Redis');
    }
  }

  async delete(key: string): Promise<void> {
    try {
      await this.client.del(key);
    } catch {
      this.logger.error('Error trying to delete key on Redis');
    }
  }

  async onModuleDestroy() {
    await this.client.quit();
  }
}
