import { Injectable } from '@nestjs/common';
import { ShortcodeGeneratorStrategy } from '../interfaces/shortcode-generator.strategy';

@Injectable()
export class NanoidShortcodeGeneratorStrategy implements ShortcodeGeneratorStrategy {
  generate(): string {
    return '';
  }
}
