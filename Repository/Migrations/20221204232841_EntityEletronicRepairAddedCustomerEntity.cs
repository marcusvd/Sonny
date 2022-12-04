using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Repository.Migrations
{
    public partial class EntityEletronicRepairAddedCustomerEntity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CustomerId",
                table: "EletronicsRepairs",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.UpdateData(
                table: "Partners",
                keyColumn: "Id",
                keyValue: 1,
                column: "Registered",
                value: new DateTime(2022, 12, 4, 20, 28, 40, 920, DateTimeKind.Local).AddTicks(9052));

            migrationBuilder.UpdateData(
                table: "Partners",
                keyColumn: "Id",
                keyValue: 2,
                column: "Registered",
                value: new DateTime(2022, 12, 4, 20, 28, 40, 921, DateTimeKind.Local).AddTicks(9506));

            migrationBuilder.UpdateData(
                table: "Partners",
                keyColumn: "Id",
                keyValue: 3,
                column: "Registered",
                value: new DateTime(2022, 12, 4, 20, 28, 40, 921, DateTimeKind.Local).AddTicks(9546));

            migrationBuilder.UpdateData(
                table: "Partners",
                keyColumn: "Id",
                keyValue: 4,
                column: "Registered",
                value: new DateTime(2022, 12, 4, 20, 28, 40, 921, DateTimeKind.Local).AddTicks(9550));

            migrationBuilder.UpdateData(
                table: "Partners",
                keyColumn: "Id",
                keyValue: 5,
                column: "Registered",
                value: new DateTime(2022, 12, 4, 20, 28, 40, 921, DateTimeKind.Local).AddTicks(9553));

            migrationBuilder.CreateIndex(
                name: "IX_EletronicsRepairs_CustomerId",
                table: "EletronicsRepairs",
                column: "CustomerId");

            migrationBuilder.AddForeignKey(
                name: "FK_EletronicsRepairs_Customers_CustomerId",
                table: "EletronicsRepairs",
                column: "CustomerId",
                principalTable: "Customers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EletronicsRepairs_Customers_CustomerId",
                table: "EletronicsRepairs");

            migrationBuilder.DropIndex(
                name: "IX_EletronicsRepairs_CustomerId",
                table: "EletronicsRepairs");

            migrationBuilder.DropColumn(
                name: "CustomerId",
                table: "EletronicsRepairs");

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
    }
}
