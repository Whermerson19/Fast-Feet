import { MigrationInterface, QueryRunner, Table } from "typeorm";

export default class CreateDeliveires1608905217545
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "deliveries",
        columns: [
          {
            name: "id",
            type: "varchar",
            generationStrategy: "uuid",
            isPrimary: true,
            default: "uuid_generate_v4()",
          },
          {
            name: "product",
            type: "varchar",
          },
          {
            name: "address",
            type: "varchar",
          },
          {
            name: "postal_code",
            type: "varchar",
          },
          {
            name: "neighborhood",
            type: "varchar",
          },
          {
            name: "city",
            type: "varchar",
          },
          {
            name: "state",
            type: "varchar",
          },
          {
            name: "signature_id",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "canceled_at",
            type: "timestamp with time zone",
            isNullable: true,
          },
          {
            name: "start_date",
            type: "timestamp with time zone",
            isNullable: true,
          },
          {
            name: "end_date",
            type: "timestamp with time zone",
            isNullable: true,
          },
          {
            name: "created_at",
            type: "timestamp with time zone",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp with time zone",
            default: "now()",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("deliveries");
  }
}
