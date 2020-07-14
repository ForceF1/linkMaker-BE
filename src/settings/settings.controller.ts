import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Req,
  UnauthorizedException,
  UseGuards
} from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { SettingsService } from './settings.service';

@UseGuards(AuthGuard)
@Controller('settings')
export class SettingsController {
  constructor(
    private readonly settingsService: SettingsService
  ) {}

  @Post('save')
  saveSettings(@Req() request, @Body('settings') settings) {
    const { user } = request;
    if(!settings) {
      throw new HttpException("Invalid parameters. Settings not found.", HttpStatus.BAD_REQUEST);
    }
    if(user && user.email) {
      return this.settingsService.saveSettings({ email: user.email, settings });
    }

    throw new UnauthorizedException();
  }

  @Get()
  getSettings(@Req() request) {
    const { user } = request;
    if(user && user.email)
      return this.settingsService.getSettings(user.email);

    throw new UnauthorizedException();
  }
}
