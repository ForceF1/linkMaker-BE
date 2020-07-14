import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UserDto } from './dto/user.dto';
import { UsersRepository } from './users.repository';
import { SettingsService } from '../settings/settings.service';
import { PRO_FREE_LICENSE_TYPE, FREE_LICENSE_TYPE } from '../constants';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository) private readonly usersRepository: UsersRepository,
    @Inject(forwardRef(() => SettingsService)) private settingsService: SettingsService
  ) {}

  async auth(userDto: UserDto): Promise<any> {
    const userExists = await this.isUserExists(userDto);
    if(userExists) {
      const isPlanValid = new Date(userExists.planEnd).getTime() > new Date().getTime();
      if(isPlanValid) {
        const currUser = await this.usersRepository.accountUpgrade(userExists.email);
        if(userExists.licenseType === FREE_LICENSE_TYPE)
          throw new HttpException({
            status: HttpStatus.OK,
            message: 'You have successfully logged in',
            email: currUser.email,
            licenseType: currUser.licenseType,
            trialCheck: false,
            shouldSaveSettings: true
          }, HttpStatus.OK);

        throw new HttpException({
          status: HttpStatus.CREATED,
          email: currUser.email,
          licenseType: currUser.licenseType,
          message: "You have successfully logged in",
          trialCheck: false,
          shouldSaveSettings: false
        }, HttpStatus.CREATED);
      }
      throw new HttpException("User trial has ended", HttpStatus.MOVED_PERMANENTLY)
    }

    return await this.usersRepository.createUser(userDto)
      .then( async res => {
        throw new HttpException({
          message: "You have successfully activated the PRO version",
          email: res.email,
          licenseType: res.licenseType,
          status: HttpStatus.OK,
          trialCheck: true,
          shouldSaveSettings: true
        }, HttpStatus.OK)

      });
  }

  async downgrade(email: string) {
    const { licenseType, userID } = await this.findByEmail(email);
    if(licenseType && licenseType === PRO_FREE_LICENSE_TYPE) {
      await this.usersRepository.accountDowngrade(email)
        .then(async res => {
          const userSettings = await this.settingsService.getSettings(res.email);
          if (userSettings) {
            await this.settingsService.removeSettings(userID);
          }
          throw new HttpException('You have successfully downgraded', HttpStatus.OK)
        });
    }
    throw new HttpException('You are already downgraded', HttpStatus.OK)
  }

  async isUserExists(userDto: UserDto): Promise<any> {
    return this.usersRepository.findByEmail(userDto.email);
  }

  async findByEmail(email: string): Promise<any> {
    return this.usersRepository.findByEmail(email);
  }

  async userValidate(userDto: UserDto): Promise<any> {
    const user = await this.usersRepository.findByEmail(userDto.email);
    if(user && user.licenseType === PRO_FREE_LICENSE_TYPE) {
      if(new Date(user.planEnd) >= new Date()) {
        throw new HttpException('Plan is valid', HttpStatus.OK)
      }
      throw new HttpException('License expired', HttpStatus.MOVED_PERMANENTLY)
    }
    throw new HttpException('User does not exist', HttpStatus.FOUND);
  }
}
