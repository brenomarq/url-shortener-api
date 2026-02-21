import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/database/prisma.service';
import { Url } from './entities/url.entity';
import { UrlMapper } from './mappers/url.mapper';
import { IUrlRepository } from './interfaces/url.repository.interface';

@Injectable()
export class PrismaUrlRepository implements IUrlRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(shortCode: string, originalUrl: string): Promise<Url> {
    const newUrl = await this.prisma.url.create({
      data: {
        shortCode,
        originalUrl,
      },
    });

    return UrlMapper.toDomain(newUrl);
  }

  async findByShortCode(shortCode: string): Promise<Url | null> {
    const url = await this.prisma.url.findUnique({
      where: { shortCode },
    });

    if (!url) return null;

    return UrlMapper.toDomain(url);
  }

  async incrementClicks(shortCode: string): Promise<void> {
    await this.prisma.url.update({
      where: { shortCode },
      data: {
        clicks: {
          increment: 1,
        },
      },
    });
  }
}
