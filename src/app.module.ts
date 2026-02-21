import { Module } from '@nestjs/common';
import { UrlModule } from './modules/url/url.module';
import { PrismaService } from './infrastructure/database/prisma.service';
import { DatabaseModule } from './infrastructure/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { RedisModule } from './infrastructure/redis/redis.module';

@Module({
  imports: [
    DatabaseModule,
    UrlModule,
    RedisModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
