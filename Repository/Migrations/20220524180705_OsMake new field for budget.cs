using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Repository.Migrations
{
    public partial class OsMakenewfieldforbudget : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "OsMake",
                table: "ServicesBudgets",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);

            migrationBuilder.UpdateData(
                table: "Partners",
                keyColumn: "Id",
                keyValue: 1,
                column: "Today",
                value: new DateTime(2022, 5, 24, 15, 7, 3, 130, DateTimeKind.Local).AddTicks(8322));

            migrationBuilder.UpdateData(
                table: "Partners",
                keyColumn: "Id",
                keyValue: 2,
                column: "Today",
                value: new DateTime(2022, 5, 24, 15, 7, 3, 132, DateTimeKind.Local).AddTicks(3933));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "OsMake",
                table: "ServicesBudgets");

            migrationBuilder.UpdateData(
                table: "Partners",
                keyColumn: "Id",
                keyValue: 1,
                column: "Today",
                value: new DateTime(2022, 5, 12, 14, 39, 13, 122, DateTimeKind.Local).AddTicks(8117));

            migrationBuilder.UpdateData(
                table: "Partners",
                keyColumn: "Id",
                keyValue: 2,
                column: "Today",
                value: new DateTime(2022, 5, 12, 14, 39, 13, 123, DateTimeKind.Local).AddTicks(8846));
        }
    }
}
