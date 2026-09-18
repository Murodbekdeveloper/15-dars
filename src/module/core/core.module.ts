import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JwtSecret'),
        signOptions: {
          expiresIn: '8d',
        },
      }),
      inject: [ConfigService]
    }),
    UserModule,
    AuthModule,
    DatabaseModule
  ],
  exports: [ConfigModule, JwtModule, DatabaseModule],
})
export class CoreModule {}
