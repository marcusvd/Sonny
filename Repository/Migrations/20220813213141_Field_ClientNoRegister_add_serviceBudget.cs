using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Repository.Migrations
{
    public partial class Field_ClientNoRegister_add_serviceBudget : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ClientNoRegister",
                table: "ServicesBudgets",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.UpdateData(
                table: "Partners",
                keyColumn: "Id",
                keyValue: 1,
                column: "Today",
                value: new DateTime(2022, 8, 13, 18, 31, 40, 188, DateTimeKind.Local).AddTicks(6040));

            migrationBuilder.UpdateData(
                table: "Partners",
                keyColumn: "Id",
                keyValue: 2,
                column: "Today",
                value: new DateTime(2022, 8, 13, 18, 31, 40, 190, DateTimeKind.Local).AddTicks(6913));

            migrationBuilder.UpdateData(
                table: "Partners",
                keyColumn: "Id",
                keyValue: 3,
                column: "Today",
                value: new DateTime(2022, 8, 13, 18, 31, 40, 190, DateTimeKind.Local).AddTicks(6980));

            migrationBuilder.UpdateData(
                table: "Partners",
                keyColumn: "Id",
                keyValue: 4,
                column: "Today",
                value: new DateTime(2022, 8, 13, 18, 31, 40, 190, DateTimeKind.Local).AddTicks(6994));

            migrationBuilder.UpdateData(
                table: "Partners",
                keyColumn: "Id",
                keyValue: 5,
                column: "Today",
                value: new DateTime(2022, 8, 13, 18, 31, 40, 190, DateTimeKind.Local).AddTicks(7002));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ClientNoRegister",
                table: "ServicesBudgets");

            migrationBuilder.UpdateData(
                table: "Partners",
                keyColumn: "Id",
                keyValue: 1,
                column: "Today",
                value: new DateTime(2022, 7, 22, 19, 12, 57, 690, DateTimeKind.Local).AddTicks(4285));

            migrationBuilder.UpdateData(
                table: "Partners",
                keyColumn: "Id",
                keyValue: 2,
                column: "Today",
                value: new DateTime(2022, 7, 22, 19, 12, 57, 691, DateTimeKind.Local).AddTicks(4896));

            migrationBuilder.UpdateData(
                table: "Partners",
                keyColumn: "Id",
                keyValue: 3,
                column: "Today",
                value: new DateTime(2022, 7, 22, 19, 12, 57, 691, DateTimeKind.Local).AddTicks(4919));

            migrationBuilder.UpdateData(
                table: "Partners",
                keyColumn: "Id",
                keyValue: 4,
                column: "Today",
                value: new DateTime(2022, 7, 22, 19, 12, 57, 691, DateTimeKind.Local).AddTicks(4923));

            migrationBuilder.UpdateData(
                table: "Partners",
                keyColumn: "Id",
                keyValue: 5,
                column: "Today",
                value: new DateTime(2022, 7, 22, 19, 12, 57, 691, DateTimeKind.Local).AddTicks(4926));
        }
    }
}
