import { Url as PrismaUrl } from 'src/generated/prisma/client';
import { Url } from '../entities/url.entity';

export class UrlMapper {
  static toDomain(raw: PrismaUrl): Url {
    return Url.restore(raw.shortCode, raw.originalUrl, raw.clicks);
  }

  static toPersistence(domain: Url) {
    return {
      shortCode: domain.shortCode,
      originalUrl: domain.originalUrl,
      clicks: domain.clicks,
    };
  }
}
