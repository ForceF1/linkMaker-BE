import { Entity, Column, PrimaryColumn } from 'typeorm';
import { IsEmail, IsDate } from "class-validator";

@Entity({ name: 'users'})
export class Users {
  @PrimaryColumn()
  userID: string;

  @Column()
  @IsEmail()
  email: string;

  @Column({ type: 'varchar' })
  domain: string;

  @Column({ name: 'subscription_date'})
  @IsDate()
  subscriptionDate: Date;

  @Column({ name: 'plan_start'})
  @IsDate()
  planstart: Date;

  @Column({ name: 'plan_end'})
  @IsDate()
  planEnd: Date;

  @Column({ type: 'varchar', name: 'license_type' })
  licenseType: string;

  @Column({ type: 'varchar', name: 'terminate_date', nullable: true })
  terminateDate: Date;

  @Column({ type: 'varchar', name: 'trial_check', default: '1' })
  trialCheck: string;
}