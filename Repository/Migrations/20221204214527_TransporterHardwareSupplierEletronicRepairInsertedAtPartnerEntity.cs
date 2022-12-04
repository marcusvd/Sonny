using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Repository.Migrations
{
    public partial class TransporterHardwareSupplierEletronicRepairInsertedAtPartnerEntity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "EletronicRepair",
                table: "Partners",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "HardwareSupplier",
                table: "Partners",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "Transporter",
                table: "Partners",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);

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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EletronicRepair",
                table: "Partners");

            migrationBuilder.DropColumn(
                name: "HardwareSupplier",
                table: "Partners");

            migrationBuilder.DropColumn(
                name: "Transporter",
                table: "Partners");

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
                column: "Registered",
                value: new DateTime(2022, 12, 3, 11, 28, 16, 957, DateTimeKind.Local).AddTicks(3464));

            migrationBuilder.UpdateData(
                table: "Partners",
                keyColumn: "Id",
                keyValue: 3,
                column: "Registered",
                value: new DateTime(2022, 12, 3, 11, 28, 16, 957, DateTimeKind.Local).AddTicks(3492));

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
    }
}
