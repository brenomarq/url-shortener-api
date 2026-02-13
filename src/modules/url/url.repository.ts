import { Injectable } from '@nestjs/common';
import { Url } from 'src/generated/prisma/client';
import { PrismaService } from 'src/infrastructure/database/prisma.service';

@Injectable()
export class UrlRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(shortCode: string, originalUrl: string): Promise<Url> {
    return await this.prisma.url.create({
      data: {
        shortCode,
        originalUrl,
      },
    });
  }

  async findByShortCode(shortCode: string): Promise<Url | null> {
    return await this.prisma.url.findUnique({
      where: { shortCode },
    });
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
