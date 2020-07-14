import { EntityRepository, Repository } from 'typeorm';
import { SettingsEntity } from './settings.entity';
import { RemoveSettingsDto, SaveSettingsDto } from './dto/settings.dto';

@EntityRepository(SettingsEntity)
export class SettingsRepository extends Repository<SettingsEntity>{

  isUserSettingsExists = async (userID: number) => {
    return await this.findOne({ userID })
  };

  addSettings = async (settingsDto: SaveSettingsDto) => {
    return await this.save(settingsDto);
  };

  updateSettings = async (settingsDto: SaveSettingsDto) => {
    const currSettings = await this.findOne({ userID: settingsDto.userID });

    return await this.save({
      ...currSettings,
      settings: settingsDto.settings
    });
  };

  removeSettings = async (settingsDto: RemoveSettingsDto) => {
    const userSettings = await this.findOne({ where: { userID: settingsDto }});
    await this.remove(userSettings)
  };

  getSettings = async (userID: number) => {
    return await this.findOne(userID);
  };
}