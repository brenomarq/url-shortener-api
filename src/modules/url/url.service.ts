import { Injectable } from '@nestjs/common';
import { UrlRepository } from './url.repository';

@Injectable()
export class UrlService {
  constructor(private readonly urlRepository: UrlRepository) {}
}
