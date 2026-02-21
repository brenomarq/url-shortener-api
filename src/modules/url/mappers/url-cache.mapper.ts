import { Url } from '../entities/url.entity';

export class UrlCacheMapper {
  static toCache(domain: Url): string {
    const payload = {
      shortCode: domain.shortCode,
      originalUrl: domain.originalUrl,
      clicks: domain.clicks,
    };
    return JSON.stringify(payload);
  }

  static toDomain(rawCache: string): Url {
    const parsed = JSON.parse(rawCache);
    return Url.restore(parsed.shortCode, parsed.originalUrl, parsed.clicks);
  }
}
