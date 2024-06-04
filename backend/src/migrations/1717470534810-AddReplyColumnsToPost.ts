import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AddParentPostIdToPost1627914973273 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'post',
      new TableColumn({
        name: 'parentPostId',
        type: 'int',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'post',
      new TableForeignKey({
        columnNames: ['parentPostId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'post',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('post');
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('parentPostId') !== -1,
    );
    await queryRunner.dropForeignKey('post', foreignKey);
    await queryRunner.dropColumn('post', 'parentPostId');
  }
}
