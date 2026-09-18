import { Module } from '@nestjs/common';
import { CoreModule } from './module/core/core.module';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { ValidationPipe } from './common/pipe/validator.pipe';
import { AuthGuard } from './common/guard/auth.guard';

@Module({
  imports: [CoreModule],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    }
  ],
})
export class AppModule {}
