export class SettingsDto {
  readonly email: string;
  readonly settings: object;
}

export class SaveSettingsDto {
  readonly userID: number;
  readonly settings: string;
}

export class RemoveSettingsDto {
  readonly userID: number;
}