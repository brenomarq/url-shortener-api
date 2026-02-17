import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUrl } from 'class-validator';

export class ShortenUrlDto {
  @IsUrl()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The original URL to be shortened',
    example: 'https://www.example.com/some/long/url',
  })
  readonly originalUrl: string;
}
