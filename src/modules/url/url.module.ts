import { Module } from '@nestjs/common';
import { UrlController } from './url.controller';
import { UrlService } from './url.service';
import { UrlRepository } from './url.repository';

@Module({
  controllers: [UrlController],
  providers: [UrlService, UrlRepository],
})
export class UrlModule {}
