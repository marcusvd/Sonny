using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Repository.Migrations
{
    public partial class ServicesBudget2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Solved",
                table: "SolutionsPrices",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);

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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Solved",
                table: "SolutionsPrices");

            migrationBuilder.UpdateData(
                table: "Partners",
                keyColumn: "Id",
                keyValue: 1,
                column: "Today",
                value: new DateTime(2022, 6, 22, 19, 2, 31, 126, DateTimeKind.Local).AddTicks(5321));

            migrationBuilder.UpdateData(
                table: "Partners",
                keyColumn: "Id",
                keyValue: 2,
                column: "Today",
                value: new DateTime(2022, 6, 22, 19, 2, 31, 128, DateTimeKind.Local).AddTicks(6375));
        }
    }
}
