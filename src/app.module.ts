import { Module } from '@nestjs/common';
import { UrlModule } from './modules/url/url.module';
import { PrismaService } from './infrastructure/database/prisma.service';
import { DatabaseModule } from './infrastructure/database/database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    DatabaseModule,
    UrlModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
