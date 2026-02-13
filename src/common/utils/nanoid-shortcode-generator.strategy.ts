import { Injectable } from '@nestjs/common';
import { ShortcodeGeneratorStrategy } from '../interfaces/shortcode-generator.strategy';
import { customAlphabet, nanoid } from 'nanoid';

@Injectable()
export class NanoidShortcodeGeneratorStrategy implements ShortcodeGeneratorStrategy {
  private readonly characters =
    '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

  generate(length: number = 6): string {
    return customAlphabet(this.characters, length)();
  }
}
