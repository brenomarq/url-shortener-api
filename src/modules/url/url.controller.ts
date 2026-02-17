import { Body, Controller, Get, Post } from '@nestjs/common';
import { UrlService } from './url.service';
import { ShortenUrlDto } from './dto/shorten-url.dto';

@Controller('url')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post('shorten')
  async shortenUrl(@Body() url: ShortenUrlDto) {
    const newUrl = await this.urlService.shortenUrl(url.originalUrl);

    return {
      shortCode: `http://localhost:3000/${newUrl.shortCode}`,
      originalUrl: newUrl.originalUrl,
    };
  }

  @Get(':code')
  async redirectToOriginalUrl() {}
}
