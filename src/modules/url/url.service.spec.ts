/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { UrlService } from './url.service';
import { UrlRepository } from './url.repository';
import { SHORTCODE_GENERATOR } from 'src/infrastructure/providers/nanoid-generator.provider';
import { ShortcodeGeneratorStrategy } from 'src/interfaces/shortcode-generator.strategy';
import { NotFoundException } from '@nestjs/common';
import { Url } from './entities/url.entity';

describe('UrlService', () => {
  let service: UrlService;
  let urlRepository: jest.Mocked<UrlRepository>;
  let shortcodeGenerator: jest.Mocked<ShortcodeGeneratorStrategy>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UrlService,
        {
          provide: UrlRepository,
          useValue: {
            save: jest.fn(),
            findByShortCode: jest.fn(),
            incrementClicks: jest.fn(),
          },
        },
        {
          provide: SHORTCODE_GENERATOR,
          useValue: {
            generate: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UrlService>(UrlService);
    urlRepository = module.get(UrlRepository);
    shortcodeGenerator = module.get(SHORTCODE_GENERATOR);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('shortenUrl', () => {
    it('should throw an error if the URL format is invalid', async () => {
      const invalidUrl = 'invalid-url';
      await expect(service.shortenUrl(invalidUrl)).rejects.toThrow(
        'Invalid URL format',
      );
    });

    it('should generate a shortcode and save the URL if valid', async () => {
      const validUrl = 'https://example.com';
      const shortCode = 'short1';
      const savedUrl = Url.create(shortCode, validUrl);

      shortcodeGenerator.generate.mockReturnValue(shortCode);
      urlRepository.findByShortCode.mockResolvedValue(null);
      urlRepository.save.mockResolvedValue(savedUrl);

      const result = await service.shortenUrl(validUrl);

      expect(shortcodeGenerator.generate).toHaveBeenCalledWith(6);
      expect(urlRepository.findByShortCode).toHaveBeenCalledWith(shortCode);
      expect(urlRepository.save).toHaveBeenCalledWith(shortCode, validUrl);
      expect(result).toEqual(savedUrl);
    });

    it('should retry generating shortcode if it already exists', async () => {
      const validUrl = 'https://example.com';
      const existingShortCode = 'exists';
      const newShortCode = 'newone';
      const savedUrl = Url.create(newShortCode, validUrl);

      shortcodeGenerator.generate
        .mockReturnValueOnce(existingShortCode)
        .mockReturnValueOnce(newShortCode);

      // First check returns a url (collision), second check returns null (available)
      urlRepository.findByShortCode
        .mockResolvedValueOnce(Url.restore(existingShortCode, validUrl, 0))
        .mockResolvedValueOnce(null);

      urlRepository.save.mockResolvedValue(savedUrl);

      const result = await service.shortenUrl(validUrl);

      expect(shortcodeGenerator.generate).toHaveBeenCalledTimes(2);
      expect(urlRepository.findByShortCode).toHaveBeenCalledTimes(2);
      expect(urlRepository.findByShortCode).toHaveBeenCalledWith(
        existingShortCode,
      );
      expect(urlRepository.findByShortCode).toHaveBeenCalledWith(newShortCode);
      expect(urlRepository.save).toHaveBeenCalledWith(newShortCode, validUrl);
      expect(result).toEqual(savedUrl);
    });
  });

  describe('getOriginalUrl', () => {
    it('should return the URL if found', async () => {
      const shortCode = 'short1';
      const foundUrl = Url.restore(shortCode, 'https://example.com', 0);

      urlRepository.findByShortCode.mockResolvedValue(foundUrl);

      const result = await service.getOriginalUrl(shortCode);

      expect(urlRepository.findByShortCode).toHaveBeenCalledWith(shortCode);
      expect(result).toEqual(foundUrl);
    });

    it('should throw NotFoundException if URL is not found', async () => {
      const shortCode = 'notfound';
      urlRepository.findByShortCode.mockResolvedValue(null);

      await expect(service.getOriginalUrl(shortCode)).rejects.toThrow(
        NotFoundException,
      );
      expect(urlRepository.findByShortCode).toHaveBeenCalledWith(shortCode);
    });
  });
});
