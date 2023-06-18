import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class AddDevelopersProgrammingLanguagesTable1687067561788 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'developers_programming_languages',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            default: 'uuid_generate_v4()',
            isPrimary: true
          },
          {
            name: 'programming_language_id',
            type: 'uuid',
            isNullable: false
          },
          {
            name: 'developer_id',
            type: 'uuid',
            isNullable: false
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
    await queryRunner.createForeignKey(
      'developers_programming_languages',
      new TableForeignKey({
        columnNames: ['programming_language_id'],
        referencedTableName: 'programming_languages',
        referencedColumnNames: ['id']
      })
    )

    await queryRunner.createForeignKey(
      'developers_programming_languages',
      new TableForeignKey({
        columnNames: ['developer_id'],
        referencedTableName: 'developers',
        referencedColumnNames: ['id']
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKeys('developers_programming_languages', [
      new TableForeignKey({
        columnNames: ['developer_id'],
        referencedTableName: 'developers',
        referencedColumnNames: ['id']
      }),
      new TableForeignKey({
        columnNames: ['programming_language_id'],
        referencedTableName: 'programming_languages',
        referencedColumnNames: ['id']
      })
    ])

    await queryRunner.dropTable('developers_programming_languages', true)
  }
}
