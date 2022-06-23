using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Repository.Migrations
{
    public partial class ServicesBudget3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Finished",
                table: "ServicesBudgets",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);

            migrationBuilder.UpdateData(
                table: "Partners",
                keyColumn: "Id",
                keyValue: 1,
                column: "Today",
                value: new DateTime(2022, 6, 22, 20, 24, 51, 110, DateTimeKind.Local).AddTicks(7410));

            migrationBuilder.UpdateData(
                table: "Partners",
                keyColumn: "Id",
                keyValue: 2,
                column: "Today",
                value: new DateTime(2022, 6, 22, 20, 24, 51, 111, DateTimeKind.Local).AddTicks(7564));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Finished",
                table: "ServicesBudgets");

            migrationBuilder.UpdateData(
                table: "Partners",
                keyColumn: "Id",
                keyValue: 1,
                column: "Today",
                value: new DateTime(2022, 6, 22, 19, 46, 53, 46, DateTimeKind.Local).AddTicks(6411));

            migrationBuilder.UpdateData(
                table: "Partners",
                keyColumn: "Id",
                keyValue: 2,
                column: "Today",
                value: new DateTime(2022, 6, 22, 19, 46, 53, 47, DateTimeKind.Local).AddTicks(6097));
        }
    }
}
