import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from "typeorm";

export default class AddClientIdFieldToDeliveries1609010217057
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "deliveries",
      new TableColumn({
        name: "client_id",
        type: "varchar",
      })
    );

    await queryRunner.createForeignKey(
      "deliveries",
      new TableForeignKey({
        name: "ClientId_Deliveries",
        columnNames: ["client_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "users",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("deliveries", "ClientId_Deliveries");
    await queryRunner.dropColumn("deliveries", "client_id");
  }
}
