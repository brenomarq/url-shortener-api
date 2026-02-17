import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Redirect,
  Res,
} from '@nestjs/common';
import { UrlService } from './url.service';
import { ShortenUrlDto } from './dto/shorten-url.dto';
import { url } from 'node:inspector';

@Controller('')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post('url/shorten')
  async shortenUrl(@Body() url: ShortenUrlDto) {
    const newUrl = await this.urlService.shortenUrl(url.originalUrl);

    return {
      shortCode: `http://localhost:3000/${newUrl.shortCode}`,
      originalUrl: newUrl.originalUrl,
    };
  }

  @Get(':code')
  @Redirect()
  async redirectToOriginalUrl(@Param('code') code: string) {
    const url = await this.urlService.getOriginalUrl(code);

    return {
      url: url.originalUrl,
      statusCode: HttpStatus.TEMPORARY_REDIRECT,
    };
  }
}
