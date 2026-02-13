import { Module } from '@nestjs/common';
import { UrlModule } from './modules/url/url.module';
import { PrismaService } from './infrastructure/database/prisma.service';
import { DatabaseModule } from './infrastructure/database/database.module';

@Module({
  imports: [DatabaseModule, UrlModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
