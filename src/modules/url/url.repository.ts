import { Injectable } from '@nestjs/common';
import { PrismaClient, Url } from 'generated/prisma/client';

@Injectable()
export class UrlRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async save(shortCode: string, url: string): Promise<Url> {
    return this.prisma.url.create({
      data: {
        shortCode,
        originalUrl: url,
      },
    });
  }

  async findByShortCode(shortCode: string): Promise<Url | null> {
    return this.prisma.url.findUnique({
      where: { shortCode },
    });
  }

  async incrementClicks(shortCode: string): Promise<void> {
    await this.prisma.url.update({
      where: { shortCode },
      data: { clicks: { increment: 1 } },
    });
  }
}
