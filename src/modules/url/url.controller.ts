import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Redirect,
} from '@nestjs/common';
import { UrlService } from './url.service';
import { ShortenUrlDto } from './dto/shorten-url.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @ApiOperation({
    summary: 'Shorten a URL',
    description: 'Takes an original URL and returns a shortened version of it.',
  })
  @ApiResponse({
    description: 'The shortened URL along with the original URL',
    status: HttpStatus.CREATED,
    schema: {
      example: {
        shortCode: 'http://localhost:3000/abc123',
        originalUrl: 'https://www.example.com/some/long/url',
      },
    },
  })
  @HttpCode(201)
  @Post('url/shorten')
  async shortenUrl(@Body() url: ShortenUrlDto) {
    const newUrl = await this.urlService.shortenUrl(url.originalUrl);

    return {
      shortCode: `http://localhost:3000/${newUrl.shortCode}`,
      originalUrl: newUrl.originalUrl,
    };
  }

  @ApiOperation({
    summary: 'Redirect to Original URL',
    description:
      'Redirects the user to the original URL based on the provided short code.',
  })
  @ApiResponse({
    description: 'Redirects to the original URL',
    status: HttpStatus.TEMPORARY_REDIRECT,
  })
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
