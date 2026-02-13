import { ShortcodeGeneratorStrategy } from 'src/interfaces/shortcode-generator.strategy';
import { customAlphabet } from 'nanoid';

export class NanoIdGenerator implements ShortcodeGeneratorStrategy {
  generate(length: number): string {
    const alphabet =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const shortcode = customAlphabet(alphabet, length);
    return shortcode();
  }
}
