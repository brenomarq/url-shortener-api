import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaUrlRepository } from './prisma-url.repository';
import { RedisService } from 'src/infrastructure/redis/redis.service';
import { IUrlRepository } from './interfaces/url.repository.interface';
import { Url } from './entities/url.entity';
import { UrlCacheMapper } from './mappers/url-cache.mapper';

@Injectable()
export class CachedUrlRepository implements IUrlRepository {
  private readonly CACHE_TTL_SECONDS = 3600;

  constructor(
    private readonly urlRepository: PrismaUrlRepository,
    private readonly redisService: RedisService,
  ) {}

  async save(shortCode: string, originalUrl: string): Promise<Url> {
    const url = await this.urlRepository.save(shortCode, originalUrl);
    const urlToCache = UrlCacheMapper.toCache(url);
    await this.redisService.set(shortCode, urlToCache, this.CACHE_TTL_SECONDS);
    return url;
  }

  async findByShortCode(shortCode: string): Promise<Url | null> {
    const cachedUrl = await this.redisService.get(shortCode);

    if (cachedUrl) {
      const domainUrl = UrlCacheMapper.toDomain(cachedUrl);
      return domainUrl;
    }

    const url = await this.urlRepository.findByShortCode(shortCode);
    return url;
  }

  async incrementClicks(shortCode: string): Promise<void> {
    await this.urlRepository.incrementClicks(shortCode);
  }
}
