export class UserDto {
  readonly email: string;
  readonly domain: string;
  readonly subscriptionDate: Date;
  readonly planstart: Date;
  readonly planEnd: Date;
  readonly licenseType: string;
}