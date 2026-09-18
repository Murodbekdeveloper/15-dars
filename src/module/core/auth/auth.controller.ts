import { Controller, Post, Body, Res, SetMetadata } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto, RegisterAuthDto } from './dto/register.login.dto';
import { type Response } from 'express';

@Controller('auth')
@SetMetadata('isPublic', true)
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  async register(
    @Body() registerAuthDto: RegisterAuthDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { access_token } = await this.authService.register(registerAuthDto);
    res.cookie('token', access_token, {
      httpOnly: true,
      maxAge: 1.1 * 60 * 60 * 1000,
      secure: true
    });
    return access_token;
  }
  @Post('login')
  async login(
    @Body() loginAuthDto: LoginAuthDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { access_token } = await this.authService.login(loginAuthDto)
    response.cookie('token', access_token, {
      httpOnly: true,
      maxAge: 1.1 * 60 * 60 * 100,
      secure: true,
    });
    return true;
  }
}
