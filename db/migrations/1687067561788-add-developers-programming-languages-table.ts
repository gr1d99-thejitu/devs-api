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
    await queryRunner.dropTable('developers_programming_languages')

    await queryRunner.dropForeignKey(
      'developers_programming_languages',
      new TableForeignKey({
        columnNames: ['programming_language_id'],
        referencedTableName: 'programming_languages',
        referencedColumnNames: ['id']
      })
    )

    await queryRunner.dropForeignKey(
      'developers_programming_languages',
      new TableForeignKey({
        columnNames: ['developer_id'],
        referencedTableName: 'developers',
        referencedColumnNames: ['id']
      })
    )
  }
}
