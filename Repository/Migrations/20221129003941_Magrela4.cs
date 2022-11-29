using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Repository.Migrations
{
    public partial class Magrela4 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Duplicate",
                table: "EssentialsExpenses",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<DateTime>(
                name: "Expiration",
                table: "EssentialsExpenses",
                type: "datetime(6)",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "Password",
                table: "EssentialsExpenses",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "User",
                table: "EssentialsExpenses",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Duplicate",
                table: "EssentialsExpenses");

            migrationBuilder.DropColumn(
                name: "Expiration",
                table: "EssentialsExpenses");

            migrationBuilder.DropColumn(
                name: "Password",
                table: "EssentialsExpenses");

            migrationBuilder.DropColumn(
                name: "User",
                table: "EssentialsExpenses");

            migrationBuilder.UpdateData(
                table: "Partners",
                keyColumn: "Id",
                keyValue: 1,
                column: "Today",
                value: new DateTime(2022, 11, 28, 19, 3, 10, 859, DateTimeKind.Local).AddTicks(2243));

            migrationBuilder.UpdateData(
                table: "Partners",
                keyColumn: "Id",
                keyValue: 2,
                column: "Today",
                value: new DateTime(2022, 11, 28, 19, 3, 10, 860, DateTimeKind.Local).AddTicks(2548));

            migrationBuilder.UpdateData(
                table: "Partners",
                keyColumn: "Id",
                keyValue: 3,
                column: "Today",
                value: new DateTime(2022, 11, 28, 19, 3, 10, 860, DateTimeKind.Local).AddTicks(2571));

            migrationBuilder.UpdateData(
                table: "Partners",
                keyColumn: "Id",
                keyValue: 4,
                column: "Today",
                value: new DateTime(2022, 11, 28, 19, 3, 10, 860, DateTimeKind.Local).AddTicks(2575));

            migrationBuilder.UpdateData(
                table: "Partners",
                keyColumn: "Id",
                keyValue: 5,
                column: "Today",
                value: new DateTime(2022, 11, 28, 19, 3, 10, 860, DateTimeKind.Local).AddTicks(2577));
        }
    }
}
