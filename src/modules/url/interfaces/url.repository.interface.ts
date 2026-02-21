import { Url } from '../entities/url.entity';

export interface IUrlRepository {
  save(shortCode: string, originalUrl: string): Promise<Url>;
  findByShortCode(shortCode: string): Promise<Url | null>;
  incrementClicks(shortCode: string): Promise<void>;
}
