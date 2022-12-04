using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Repository.Migrations
{
    public partial class EntityEletronicRepairPriceIntToDecimal : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<decimal>(
                name: "Price",
                table: "EletronicsRepairs",
                type: "decimal(65,30)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.UpdateData(
                table: "Partners",
                keyColumn: "Id",
                keyValue: 1,
                column: "Registered",
                value: new DateTime(2022, 12, 4, 19, 40, 1, 575, DateTimeKind.Local).AddTicks(3627));

            migrationBuilder.UpdateData(
                table: "Partners",
                keyColumn: "Id",
                keyValue: 2,
                column: "Registered",
                value: new DateTime(2022, 12, 4, 19, 40, 1, 576, DateTimeKind.Local).AddTicks(3008));

            migrationBuilder.UpdateData(
                table: "Partners",
                keyColumn: "Id",
                keyValue: 3,
                column: "Registered",
                value: new DateTime(2022, 12, 4, 19, 40, 1, 576, DateTimeKind.Local).AddTicks(3033));

            migrationBuilder.UpdateData(
                table: "Partners",
                keyColumn: "Id",
                keyValue: 4,
                column: "Registered",
                value: new DateTime(2022, 12, 4, 19, 40, 1, 576, DateTimeKind.Local).AddTicks(3036));

            migrationBuilder.UpdateData(
                table: "Partners",
                keyColumn: "Id",
                keyValue: 5,
                column: "Registered",
                value: new DateTime(2022, 12, 4, 19, 40, 1, 576, DateTimeKind.Local).AddTicks(3038));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "Price",
                table: "EletronicsRepairs",
                type: "int",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(65,30)");

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
    }
}
