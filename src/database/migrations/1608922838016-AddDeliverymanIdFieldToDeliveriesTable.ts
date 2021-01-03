import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from "typeorm";

export class AddDeliverymanIdFieldToDeliveriesTable1608922838016
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "deliveries",
      new TableColumn({
        name: "deliveryman_id",
        type: "varchar",
      })
    );

    await queryRunner.createForeignKey(
      "deliveries",
      new TableForeignKey({
        name: "DeliverymanId_Deliveries",
        columnNames: ["deliveryman_id"],
        referencedTableName: "users",
        referencedColumnNames: ["id"],
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("deliveries", "DeliverymanId_Deliveries");
    await queryRunner.dropColumn("deliveries", "deliveryman_id");
  }
}
