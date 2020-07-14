import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { RemoveSettingsDto, SettingsDto } from './dto/settings.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SettingsRepository } from './settings.repository';
import { UsersService } from '../users/users.service';

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(SettingsRepository) private readonly settingsRepository: SettingsRepository,
    @Inject(forwardRef(() => UsersService)) private usersService: UsersService
  ) {}

  async getSettings(email: string) {
    const { userID } = await this.usersService.findByEmail(email);
    if(userID) {
      const userSettings = await this.settingsRepository.getSettings(userID);
      if(userSettings)
        return userSettings;
      throw new HttpException('Settings not found', HttpStatus.NOT_FOUND);
    }
  }

  async saveSettings(settingsDto: SettingsDto) {
    const { settings, email } = settingsDto;
    const { userID } = await this.usersService.findByEmail(email);
    if(userID) {
      const updatedSettings = {
        lastUpdated: new Date(),
        ...settings,
      };
      const settingsData = {
        userID,
        settings: JSON.stringify(updatedSettings)
      };
      const isUserSettingsExists = await this.settingsRepository.isUserSettingsExists(userID);
      if(isUserSettingsExists) {
        await this.settingsRepository.updateSettings(settingsData)
          .then( () => {
            throw new HttpException("Settings have been saved successfully", HttpStatus.OK);
          })
      }

      await this.settingsRepository.addSettings(settingsData)
        .then( () => {
          throw new HttpException("Settings successfully saved", HttpStatus.OK);
        })

    }

    throw new HttpException("Incorrect settings type", HttpStatus.BAD_REQUEST)
  }

  async removeSettings(settingsDto: RemoveSettingsDto) {
    await this.settingsRepository.removeSettings(settingsDto);
  }
}
