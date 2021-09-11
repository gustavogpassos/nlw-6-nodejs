import { MigrationInterface, QueryRunner, TableColumn, Table } from "typeorm";

export class AddUserInformation1624899103569 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns(
            "users",
            [
                new TableColumn(
                    {
                        name: "department",
                        type: "varchar",
                        isNullable: true
                    }
                ),
                new TableColumn({
                    name: "occupation",
                    type: "varchar",
                    isNullable: true
                })
            ]
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("users", "department");
        await queryRunner.dropColumn("users", "occupation");
    }

}
