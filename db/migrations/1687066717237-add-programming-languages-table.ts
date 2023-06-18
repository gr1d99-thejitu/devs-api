import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class AddProgrammingLanguagesTable1687066717237 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'programming_languages',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            default: 'uuid_generate_v4()',
            isPrimary: true
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
            isUnique: true
          },
          {
            name: 'created_at',
            type: 'timestamptz',
            default: 'CURRENT_TIMESTAMP(6)',
            isNullable: false
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
    await queryRunner.dropTable('programming_languages', true)
  }
}
