import { MigrationInterface, QueryRunner, TableIndex } from 'typeorm'

export class AddDeveloperIdAndProgrammingIdUniqueIndex1687102162679 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createIndex(
      'developers_programming_languages',
      new TableIndex({
        columnNames: ['developer_id', 'programming_language_id'],
        isUnique: true
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex(
      'developers_programming_languages',
      new TableIndex({
        columnNames: ['developer_id', 'programming_language_id'],
        isUnique: true
      })
    )
  }
}
