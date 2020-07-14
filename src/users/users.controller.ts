import { Controller, Get, Param, Post, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { AuthGuard } from '../guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(
    @InjectRepository(UsersRepository) private readonly usersRepository: UsersRepository,
    private usersService: UsersService
  ) {}

  @Get('auth')
  async auth(@Req() request) {
    const { user } = request;
    if(user) {
      return await this.usersService.auth(request.user);
    }

    throw new UnauthorizedException();
  }

  @Post('downgrade')
  async downgrade(@Req() request) {
    const { user } = request;
    if(user) {
      await this.usersService.downgrade(user.email);
    }

    throw new UnauthorizedException();
  }

  @Get('validate')
  validateUser(@Req() request) {
    const { user } = request;
    if(user) {
      return this.usersService.userValidate(user)
    }
  }

  @Get(':email')
  findOne(@Param('email') email:string) {
    return this.usersRepository.findByEmail(email)
  }
}
