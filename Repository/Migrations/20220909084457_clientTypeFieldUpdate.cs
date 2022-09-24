using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Repository.Migrations
{
    public partial class clientTypeFieldUpdate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ServicesBenchs_Clients_ClientId",
                table: "ServicesBenchs");

            migrationBuilder.DropForeignKey(
                name: "FK_SolutionsPrices_ServicesBenchs_ServiceBenchId",
                table: "SolutionsPrices");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ServicesBenchs",
                table: "ServicesBenchs");

            migrationBuilder.RenameTable(
                name: "ServicesBenchs",
                newName: "ServicesBench");

            migrationBuilder.RenameIndex(
                name: "IX_ServicesBenchs_ClientId",
                table: "ServicesBench",
                newName: "IX_ServicesBench_ClientId");

            migrationBuilder.AlterColumn<bool>(
                name: "ClientType",
                table: "Clients",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false,
                oldClrType: typeof(string),
                oldType: "longtext",
                oldNullable: true)
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ServicesBench",
                table: "ServicesBench",
                column: "Id");

            migrationBuilder.UpdateData(
                table: "Partners",
                keyColumn: "Id",
                keyValue: 1,
                column: "Today",
                value: new DateTime(2022, 9, 9, 5, 44, 56, 251, DateTimeKind.Local).AddTicks(8347));

            migrationBuilder.UpdateData(
                table: "Partners",
                keyColumn: "Id",
                keyValue: 2,
                column: "Today",
                value: new DateTime(2022, 9, 9, 5, 44, 56, 253, DateTimeKind.Local).AddTicks(211));

            migrationBuilder.UpdateData(
                table: "Partners",
                keyColumn: "Id",
                keyValue: 3,
                column: "Today",
                value: new DateTime(2022, 9, 9, 5, 44, 56, 253, DateTimeKind.Local).AddTicks(259));

            migrationBuilder.UpdateData(
                table: "Partners",
                keyColumn: "Id",
                keyValue: 4,
                column: "Today",
                value: new DateTime(2022, 9, 9, 5, 44, 56, 253, DateTimeKind.Local).AddTicks(263));

            migrationBuilder.UpdateData(
                table: "Partners",
                keyColumn: "Id",
                keyValue: 5,
                column: "Today",
                value: new DateTime(2022, 9, 9, 5, 44, 56, 253, DateTimeKind.Local).AddTicks(266));

            migrationBuilder.AddForeignKey(
                name: "FK_ServicesBench_Clients_ClientId",
                table: "ServicesBench",
                column: "ClientId",
                principalTable: "Clients",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SolutionsPrices_ServicesBench_ServiceBenchId",
                table: "SolutionsPrices",
                column: "ServiceBenchId",
                principalTable: "ServicesBench",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ServicesBench_Clients_ClientId",
                table: "ServicesBench");

            migrationBuilder.DropForeignKey(
                name: "FK_SolutionsPrices_ServicesBench_ServiceBenchId",
                table: "SolutionsPrices");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ServicesBench",
                table: "ServicesBench");

            migrationBuilder.RenameTable(
                name: "ServicesBench",
                newName: "ServicesBenchs");

            migrationBuilder.RenameIndex(
                name: "IX_ServicesBench_ClientId",
                table: "ServicesBenchs",
                newName: "IX_ServicesBenchs_ClientId");

            migrationBuilder.AlterColumn<string>(
                name: "ClientType",
                table: "Clients",
                type: "longtext",
                nullable: true,
                oldClrType: typeof(bool),
                oldType: "tinyint(1)")
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ServicesBenchs",
                table: "ServicesBenchs",
                column: "Id");

            migrationBuilder.UpdateData(
                table: "Partners",
                keyColumn: "Id",
                keyValue: 1,
                column: "Today",
                value: new DateTime(2022, 8, 24, 14, 32, 38, 775, DateTimeKind.Local).AddTicks(4602));

            migrationBuilder.UpdateData(
                table: "Partners",
                keyColumn: "Id",
                keyValue: 2,
                column: "Today",
                value: new DateTime(2022, 8, 24, 14, 32, 38, 776, DateTimeKind.Local).AddTicks(8371));

            migrationBuilder.UpdateData(
                table: "Partners",
                keyColumn: "Id",
                keyValue: 3,
                column: "Today",
                value: new DateTime(2022, 8, 24, 14, 32, 38, 776, DateTimeKind.Local).AddTicks(8504));

            migrationBuilder.UpdateData(
                table: "Partners",
                keyColumn: "Id",
                keyValue: 4,
                column: "Today",
                value: new DateTime(2022, 8, 24, 14, 32, 38, 776, DateTimeKind.Local).AddTicks(8511));

            migrationBuilder.UpdateData(
                table: "Partners",
                keyColumn: "Id",
                keyValue: 5,
                column: "Today",
                value: new DateTime(2022, 8, 24, 14, 32, 38, 776, DateTimeKind.Local).AddTicks(8514));

            migrationBuilder.AddForeignKey(
                name: "FK_ServicesBenchs_Clients_ClientId",
                table: "ServicesBenchs",
                column: "ClientId",
                principalTable: "Clients",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SolutionsPrices_ServicesBenchs_ServiceBenchId",
                table: "SolutionsPrices",
                column: "ServiceBenchId",
                principalTable: "ServicesBenchs",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
