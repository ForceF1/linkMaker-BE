import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'user_settings'})
export class SettingsEntity {
  @PrimaryColumn()
  userID: number;

  @Column({ type: 'text' })
  settings: string;
}