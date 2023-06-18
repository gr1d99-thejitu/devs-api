import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class AddProgrammingLanguagesUsersTable1687067561788 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'programming_languages_users',
        columns: [
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
      'programming_languages_users',
      new TableForeignKey({
        columnNames: ['programming_language_id'],
        referencedTableName: 'programming_languages',
        referencedColumnNames: ['id']
      })
    )

    await queryRunner.createForeignKey(
      'programming_languages_users',
      new TableForeignKey({
        columnNames: ['developer_id'],
        referencedTableName: 'developers',
        referencedColumnNames: ['id']
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('programming_languages_users')

    await queryRunner.dropForeignKey(
      'programming_languages_users',
      new TableForeignKey({
        columnNames: ['programming_language_id'],
        referencedTableName: 'programming_languages',
        referencedColumnNames: ['id']
      })
    )

    await queryRunner.dropForeignKey(
      'programming_languages_users',
      new TableForeignKey({
        columnNames: ['developer_id'],
        referencedTableName: 'developers',
        referencedColumnNames: ['id']
      })
    )
  }
}
