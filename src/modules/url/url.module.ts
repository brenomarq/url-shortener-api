import { Module } from '@nestjs/common';
import { UrlController } from './url.controller';
import { UrlService } from './url.service';
import { UrlRepository } from './url.repository';
import {
  NanoIdGenerator,
  SHORTCODE_GENERATOR,
} from 'src/infrastructure/providers/nanoid-generator.provider';

@Module({
  controllers: [UrlController],
  providers: [
    UrlService,
    UrlRepository,
    {
      provide: SHORTCODE_GENERATOR,
      useClass: NanoIdGenerator,
    },
  ],
})
export class UrlModule {}
