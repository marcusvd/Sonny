using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Repository.Migrations
{
    public partial class Magre : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Visually",
                table: "SolutionPrice");

            migrationBuilder.AddColumn<bool>(
                name: "Remote",
                table: "SolutionPrice",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "Visually",
                table: "ServicesBudgets",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.UpdateData(
                table: "Partners",
                keyColumn: "Id",
                keyValue: 1,
                column: "Today",
                value: new DateTime(2022, 6, 9, 11, 6, 36, 342, DateTimeKind.Local).AddTicks(4460));

            migrationBuilder.UpdateData(
                table: "Partners",
                keyColumn: "Id",
                keyValue: 2,
                column: "Today",
                value: new DateTime(2022, 6, 9, 11, 6, 36, 350, DateTimeKind.Local).AddTicks(5987));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Remote",
                table: "SolutionPrice");

            migrationBuilder.DropColumn(
                name: "Visually",
                table: "ServicesBudgets");

            migrationBuilder.AddColumn<string>(
                name: "Visually",
                table: "SolutionPrice",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.UpdateData(
                table: "Partners",
                keyColumn: "Id",
                keyValue: 1,
                column: "Today",
                value: new DateTime(2022, 5, 28, 19, 29, 43, 431, DateTimeKind.Local).AddTicks(9260));

            migrationBuilder.UpdateData(
                table: "Partners",
                keyColumn: "Id",
                keyValue: 2,
                column: "Today",
                value: new DateTime(2022, 5, 28, 19, 29, 43, 434, DateTimeKind.Local).AddTicks(2587));
        }
    }
}
