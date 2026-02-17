import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UrlRepository } from './url.repository';
import type { ShortcodeGeneratorStrategy } from 'src/interfaces/shortcode-generator.strategy';
import { SHORTCODE_GENERATOR } from 'src/infrastructure/providers/nanoid-generator.provider';
import { Url } from './entities/url.entity';

@Injectable()
export class UrlService {
  constructor(
    private readonly urlRepository: UrlRepository,
    @Inject(SHORTCODE_GENERATOR)
    private readonly shortcodeGenerator: ShortcodeGeneratorStrategy,
  ) {}

  async shortenUrl(originalUrl: string): Promise<Url> {
    if (!this.isValidUrl(originalUrl)) throw new Error('Invalid URL format');

    let shortCode: string;
    do {
      shortCode = this.shortcodeGenerator.generate(6);
    } while (await this.shortCodeAlreadyExists(shortCode));

    return await this.urlRepository.save(shortCode, originalUrl);
  }

  async getOriginalUrl(shortCode: string): Promise<Url> {
    const url = await this.urlRepository.findByShortCode(shortCode);
    if (!url) throw new NotFoundException('Url could not be found');
    await this.urlRepository.incrementClicks(shortCode);
    return url;
  }

  private isValidUrl(url: string): boolean {
    const urlPattern =
      /^(https?:\/\/)(localhost|([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,})(:\d{1,5})?(\/[^\s]*)?$/;
    return urlPattern.test(url);
  }

  private async shortCodeAlreadyExists(shortCode: string): Promise<boolean> {
    const existingCode = await this.urlRepository.findByShortCode(shortCode);
    if (!existingCode) return false;
    return true;
  }
}
