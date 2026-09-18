import {
  ConflictException,
  Injectable,
  SetMetadata,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginAuthDto, RegisterAuthDto } from './dto/register.login.dto';
import { PrismaService } from '../database/prisma.service';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';

@Injectable()
@SetMetadata('isPublic', true)
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}
  async register(registerAuthDto: RegisterAuthDto) {
    const findUser = await this.prismaService.user.findFirst({
      where: { username: registerAuthDto.username },
    });
    if (findUser) {
      throw new UnauthorizedException('This user already exist');
    }

    const hashedPassword = await bcrypt.hash(registerAuthDto.password, 10);
    const createUser = await this.prismaService.user.create({
      data: {
        ...registerAuthDto,
        password: hashedPassword,
        email: registerAuthDto.email
      },
    });
    const token = await this.jwtService.signAsync({ user_id: createUser.id });
    return {
      access_token: token,
      username: createUser.username,
    };
  }
  async login(loginAuthDto: LoginAuthDto) {
    const findUser = await this.prismaService.user.findFirst({
      where: {
        username: loginAuthDto.username,
      },
    });
    if (!findUser) {
      throw new ConflictException('Username or password incorrect');
    }
    const comparePassword = await bcrypt.compare(
      loginAuthDto.password,
      findUser.password,
    );
    if (!comparePassword) {
      throw new UnauthorizedException('Token invalid');
    }
    const token = await this.jwtService.signAsync({ userId: findUser.id });
    return {
      access_token: token,
      username: findUser.username,
      password: loginAuthDto.password,
    };
  }
}
