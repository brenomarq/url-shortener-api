export class Url {
  private constructor(
    private readonly _shortCode: string,
    private readonly _originalUrl: string,
    private readonly _clicks: number,
  ) {}

  static restore(id: string, originalUrl: string, clicks: number): Url {
    return new Url(id, originalUrl, clicks);
  }

  static create(id: string, originalUrl: string): Url {
    return new Url(id, originalUrl, 0);
  }

  get shortCode(): string {
    return this._shortCode;
  }
  get originalUrl(): string {
    return this._originalUrl;
  }
  get clicks(): number {
    return this._clicks;
  }

  public isPopular(): boolean {
    return this._clicks > 1000;
  }
}
