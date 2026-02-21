import { Module } from '@nestjs/common';
import { UrlController } from './url.controller';
import { UrlService } from './url.service';
import { PrismaUrlRepository } from './prisma-url.repository';
import {
  NanoIdGenerator,
  SHORTCODE_GENERATOR,
} from 'src/infrastructure/providers/nanoid-generator.provider';
import { URL_REPOSITORY_TOKEN } from './interfaces/url.repository.interface';
import { RedisService } from 'src/infrastructure/redis/redis.service';
import { CachedUrlRepository } from './cached-url.repository';

@Module({
  controllers: [UrlController],
  providers: [
    UrlService,
    PrismaUrlRepository,
    CachedUrlRepository,
    {
      provide: SHORTCODE_GENERATOR,
      useClass: NanoIdGenerator,
    },
    {
      provide: URL_REPOSITORY_TOKEN,
      useClass: CachedUrlRepository,
    },
  ],
})
export class UrlModule {}
