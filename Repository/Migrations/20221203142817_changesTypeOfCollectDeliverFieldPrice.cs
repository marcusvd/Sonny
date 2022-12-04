using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Repository.Migrations
{
    public partial class changesTypeOfCollectDeliverFieldPrice : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<decimal>(
                name: "Price",
                table: "CollectsDelivers",
                type: "decimal(65,30)",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.UpdateData(
                table: "Partners",
                keyColumn: "Id",
                keyValue: 1,
                column: "Registered",
                value: new DateTime(2022, 12, 3, 11, 28, 16, 956, DateTimeKind.Local).AddTicks(3718));

            migrationBuilder.UpdateData(
                table: "Partners",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "BusinessLine", "Registered" },
                values: new object[] { "FORNECEDOR HARDWARE", new DateTime(2022, 12, 3, 11, 28, 16, 957, DateTimeKind.Local).AddTicks(3464) });

            migrationBuilder.UpdateData(
                table: "Partners",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "BusinessLine", "Registered" },
                values: new object[] { "FORNECEDOR HARDWARE", new DateTime(2022, 12, 3, 11, 28, 16, 957, DateTimeKind.Local).AddTicks(3492) });

            migrationBuilder.UpdateData(
                table: "Partners",
                keyColumn: "Id",
                keyValue: 4,
                column: "Registered",
                value: new DateTime(2022, 12, 3, 11, 28, 16, 957, DateTimeKind.Local).AddTicks(3496));

            migrationBuilder.UpdateData(
                table: "Partners",
                keyColumn: "Id",
                keyValue: 5,
                column: "Registered",
                value: new DateTime(2022, 12, 3, 11, 28, 16, 957, DateTimeKind.Local).AddTicks(3498));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "Price",
                table: "CollectsDelivers",
                type: "int",
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "decimal(65,30)",
                oldNullable: true);

            migrationBuilder.UpdateData(
                table: "Partners",
                keyColumn: "Id",
                keyValue: 1,
                column: "Registered",
                value: new DateTime(2022, 11, 30, 16, 46, 9, 702, DateTimeKind.Local).AddTicks(9091));

            migrationBuilder.UpdateData(
                table: "Partners",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "BusinessLine", "Registered" },
                values: new object[] { "Venda de hardware", new DateTime(2022, 11, 30, 16, 46, 9, 704, DateTimeKind.Local).AddTicks(4287) });

            migrationBuilder.UpdateData(
                table: "Partners",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "BusinessLine", "Registered" },
                values: new object[] { "Venda de hardware", new DateTime(2022, 11, 30, 16, 46, 9, 704, DateTimeKind.Local).AddTicks(4345) });

            migrationBuilder.UpdateData(
                table: "Partners",
                keyColumn: "Id",
                keyValue: 4,
                column: "Registered",
                value: new DateTime(2022, 11, 30, 16, 46, 9, 704, DateTimeKind.Local).AddTicks(4351));

            migrationBuilder.UpdateData(
                table: "Partners",
                keyColumn: "Id",
                keyValue: 5,
                column: "Registered",
                value: new DateTime(2022, 11, 30, 16, 46, 9, 704, DateTimeKind.Local).AddTicks(4355));
        }
    }
}
