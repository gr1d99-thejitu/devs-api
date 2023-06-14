import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class AddUserTable1686747700487 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()'
          },
          {
            name: 'email',
            type: 'varchar',
            isNullable: false,
            isUnique: true
          },
          {
            name: 'password',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'full_names',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'created_at',
            type: 'timestamptz',
            isNullable: false,
            default: 'CURRENT_TIMESTAMP(6)'
          },
          {
            name: 'updated_at',
            type: 'timestamptz',
            isNullable: true,
            default: 'CURRENT_TIMESTAMP(6)',
            onUpdate: 'CURRENT_TIMESTAMP(6)'
          }
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users', true, true, true)
  }
}
