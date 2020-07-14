import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

const USERS_TABLE_NAME = "users";
const USER_SETTINGS_TABLE_NAME = "user_settings";

// eslint-disable-next-line @typescript-eslint/class-name-casing
export class init1589368716184 implements MigrationInterface {

    public async up(queryRunner: QueryRunner) {
        await queryRunner.createTable(new Table({
            columns: [
                {
                    name: 'userID',
                    type: 'varchar',
                    isPrimary: true,
                },
                {
                    name: 'email',
                    type: 'varchar'
                },
                {
                    name: 'domain',
                    type: 'varchar'
                },
                {
                    name: 'subscription_date',
                    type: "datetime",
                    default: "CURRENT_TIMESTAMP"
                },
                {
                    name: 'plan_start',
                    type: "datetime",
                    default: "CURRENT_TIMESTAMP"
                },
                {
                    name: 'plan_end',
                    type: "datetime",
                    default: "CURRENT_TIMESTAMP"
                },
                {
                    name: 'terminate_date',
                    type: "datetime",
                    isNullable: true
                },
                {
                    name: 'license_type',
                    type: "varchar"
                },
                {
                    name: 'trial_check',
                    type: "varchar",
                    default: '1'
                }
            ],
            indices: [
                new TableIndex({
                    columnNames: ["userID"],
                    name: "id",
                })
            ],
            name: USERS_TABLE_NAME,
        }), true);

        await queryRunner.createTable(new Table({
            name: USER_SETTINGS_TABLE_NAME,
            columns: [
                {
                    name: 'userID',
                    type: 'varchar',
                    isPrimary: true,
                },
                {
                    name: 'settings',
                    type: 'text'
                }
            ],
            indices: [
                new TableIndex({
                    columnNames: ["userID"],
                    name: "settings_id",
                })
            ]
        }), true);
    }

    public async down(queryRunner: QueryRunner) {
        await queryRunner.dropTable(USERS_TABLE_NAME);
        await queryRunner.dropTable(USER_SETTINGS_TABLE_NAME);
    }
}
