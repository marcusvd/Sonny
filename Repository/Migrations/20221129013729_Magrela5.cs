using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Repository.Migrations
{
    public partial class Magrela5 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Comments",
                table: "FinancingsLoans",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.UpdateData(
                table: "Partners",
                keyColumn: "Id",
                keyValue: 1,
                column: "Today",
                value: new DateTime(2022, 11, 28, 22, 37, 28, 329, DateTimeKind.Local).AddTicks(999));

            migrationBuilder.UpdateData(
                table: "Partners",
                keyColumn: "Id",
                keyValue: 2,
                column: "Today",
                value: new DateTime(2022, 11, 28, 22, 37, 28, 347, DateTimeKind.Local).AddTicks(9107));

            migrationBuilder.UpdateData(
                table: "Partners",
                keyColumn: "Id",
                keyValue: 3,
                column: "Today",
                value: new DateTime(2022, 11, 28, 22, 37, 28, 347, DateTimeKind.Local).AddTicks(9167));

            migrationBuilder.UpdateData(
                table: "Partners",
                keyColumn: "Id",
                keyValue: 4,
                column: "Today",
                value: new DateTime(2022, 11, 28, 22, 37, 28, 347, DateTimeKind.Local).AddTicks(9173));

            migrationBuilder.UpdateData(
                table: "Partners",
                keyColumn: "Id",
                keyValue: 5,
                column: "Today",
                value: new DateTime(2022, 11, 28, 22, 37, 28, 347, DateTimeKind.Local).AddTicks(9177));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Comments",
                table: "FinancingsLoans");

            migrationBuilder.UpdateData(
                table: "Partners",
                keyColumn: "Id",
                keyValue: 1,
                column: "Today",
                value: new DateTime(2022, 11, 28, 21, 39, 40, 469, DateTimeKind.Local).AddTicks(856));

            migrationBuilder.UpdateData(
                table: "Partners",
                keyColumn: "Id",
                keyValue: 2,
                column: "Today",
                value: new DateTime(2022, 11, 28, 21, 39, 40, 470, DateTimeKind.Local).AddTicks(6909));

            migrationBuilder.UpdateData(
                table: "Partners",
                keyColumn: "Id",
                keyValue: 3,
                column: "Today",
                value: new DateTime(2022, 11, 28, 21, 39, 40, 470, DateTimeKind.Local).AddTicks(6953));

            migrationBuilder.UpdateData(
                table: "Partners",
                keyColumn: "Id",
                keyValue: 4,
                column: "Today",
                value: new DateTime(2022, 11, 28, 21, 39, 40, 470, DateTimeKind.Local).AddTicks(6958));

            migrationBuilder.UpdateData(
                table: "Partners",
                keyColumn: "Id",
                keyValue: 5,
                column: "Today",
                value: new DateTime(2022, 11, 28, 21, 39, 40, 470, DateTimeKind.Local).AddTicks(6962));
        }
    }
}
