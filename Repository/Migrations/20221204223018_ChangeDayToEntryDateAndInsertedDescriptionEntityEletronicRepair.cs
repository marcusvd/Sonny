using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Repository.Migrations
{
    public partial class ChangeDayToEntryDateAndInsertedDescriptionEntityEletronicRepair : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "EletronicsRepairs",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.UpdateData(
                table: "Partners",
                keyColumn: "Id",
                keyValue: 1,
                column: "Registered",
                value: new DateTime(2022, 12, 4, 19, 30, 17, 267, DateTimeKind.Local).AddTicks(9470));

            migrationBuilder.UpdateData(
                table: "Partners",
                keyColumn: "Id",
                keyValue: 2,
                column: "Registered",
                value: new DateTime(2022, 12, 4, 19, 30, 17, 269, DateTimeKind.Local).AddTicks(146));

            migrationBuilder.UpdateData(
                table: "Partners",
                keyColumn: "Id",
                keyValue: 3,
                column: "Registered",
                value: new DateTime(2022, 12, 4, 19, 30, 17, 269, DateTimeKind.Local).AddTicks(183));

            migrationBuilder.UpdateData(
                table: "Partners",
                keyColumn: "Id",
                keyValue: 4,
                column: "Registered",
                value: new DateTime(2022, 12, 4, 19, 30, 17, 269, DateTimeKind.Local).AddTicks(187));

            migrationBuilder.UpdateData(
                table: "Partners",
                keyColumn: "Id",
                keyValue: 5,
                column: "Registered",
                value: new DateTime(2022, 12, 4, 19, 30, 17, 269, DateTimeKind.Local).AddTicks(191));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "EletronicsRepairs");

            migrationBuilder.UpdateData(
                table: "Partners",
                keyColumn: "Id",
                keyValue: 1,
                column: "Registered",
                value: new DateTime(2022, 12, 4, 18, 45, 26, 415, DateTimeKind.Local).AddTicks(7314));

            migrationBuilder.UpdateData(
                table: "Partners",
                keyColumn: "Id",
                keyValue: 2,
                column: "Registered",
                value: new DateTime(2022, 12, 4, 18, 45, 26, 417, DateTimeKind.Local).AddTicks(9933));

            migrationBuilder.UpdateData(
                table: "Partners",
                keyColumn: "Id",
                keyValue: 3,
                column: "Registered",
                value: new DateTime(2022, 12, 4, 18, 45, 26, 417, DateTimeKind.Local).AddTicks(9980));

            migrationBuilder.UpdateData(
                table: "Partners",
                keyColumn: "Id",
                keyValue: 4,
                column: "Registered",
                value: new DateTime(2022, 12, 4, 18, 45, 26, 417, DateTimeKind.Local).AddTicks(9987));

            migrationBuilder.UpdateData(
                table: "Partners",
                keyColumn: "Id",
                keyValue: 5,
                column: "Registered",
                value: new DateTime(2022, 12, 4, 18, 45, 26, 417, DateTimeKind.Local).AddTicks(9990));
        }
    }
}
