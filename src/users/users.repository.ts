import { EntityRepository, Repository } from 'typeorm';
import { Users } from './users.entity';
import { UserDto } from './dto/user.dto';
import { PRO_FREE_LICENSE_TYPE, FREE_LICENSE_TYPE, SUBSCRIPTION_DATE_GMT } from '../constants';
import * as cryptoRandomString from 'crypto-random-string';

@EntityRepository(Users)
export class UsersRepository extends Repository<Users>{
  createUser = async (userDto: UserDto) => {
    const user = await this.findOne({ email: userDto.email });
    const transformedData = await this.createUserDataTransform(userDto);
    if(!user)
      return this.save(transformedData)
  };

  accountDowngrade = async (email: string) => {
    const user = await this.findByEmail(email);
    return await this.save({
      ...user,
      licenseType: FREE_LICENSE_TYPE
    });
  };

  accountUpgrade = async (email) => {
    const user = await this.findByEmail(email);
    const dateInUTCFormat = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate(),
      new Date().getUTCHours() + SUBSCRIPTION_DATE_GMT,
      new Date().getMinutes(),
      new Date().getSeconds()
    );
    return await this.save({
      ...user,
      subscriptionDate: dateInUTCFormat,
      planstart: dateInUTCFormat,
      planEnd: new Date(2030, 0, 1),
      licenseType: PRO_FREE_LICENSE_TYPE
    })
  };

  findByEmail = async (email: string) => {
    return await this.findOne({ email: email });
  };

  findByUserID = async (userID: string) => {
    return await this.findOne({ userID: userID });
  };

  generateUserID = async () => {
    const userID = cryptoRandomString({length: 10, type: 'base64'});
    const userFound = await this.findByUserID(userID);
    if(!userFound)
      return userID;
    this.generateUserID();
  };

  async createUserDataTransform(userInfo) {
    const domain = userInfo.email.toString().split('@')[1];
    const userID = await this.generateUserID();
    const dateInUTCFormat = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate(),
      new Date().getUTCHours() + SUBSCRIPTION_DATE_GMT,
      new Date().getMinutes(),
      new Date().getSeconds()
    );
    return {
      ...userInfo,
      userID,
      domain,
      subscriptionDate: dateInUTCFormat,
      planstart: dateInUTCFormat,
      planEnd: new Date(2030, 0, 1),
      licenseType: PRO_FREE_LICENSE_TYPE,
    };
  }
}