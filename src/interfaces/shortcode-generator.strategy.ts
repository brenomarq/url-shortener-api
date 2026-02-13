export interface ShortcodeGeneratorStrategy {
  generate(length: number): string;
}
