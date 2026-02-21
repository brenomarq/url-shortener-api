import { Injectable } from '@nestjs/common';
import { PrismaUrlRepository } from './prisma-url.repository';
import { RedisService } from 'src/infrastructure/redis/redis.service';
import { IUrlRepository } from './interfaces/url.repository.interface';
import { Url } from './entities/url.entity';

@Injectable()
export class CachedUrlRepository {
  private readonly CACHE_TTL_SECONDS = 3600;

  constructor(
    private readonly urlRepository: PrismaUrlRepository,
    private readonly redisService: RedisService,
  ) {}
}
