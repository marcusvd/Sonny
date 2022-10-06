using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Repository.Migrations
{
    public partial class tryingfixdeletesp : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Partners",
                keyColumn: "Id",
                keyValue: 1,
                column: "Today",
                value: new DateTime(2022, 10, 6, 17, 30, 4, 219, DateTimeKind.Local).AddTicks(131));

            migrationBuilder.UpdateData(
                table: "Partners",
                keyColumn: "Id",
                keyValue: 2,
                column: "Today",
                value: new DateTime(2022, 10, 6, 17, 30, 4, 220, DateTimeKind.Local).AddTicks(2163));

            migrationBuilder.UpdateData(
                table: "Partners",
                keyColumn: "Id",
                keyValue: 3,
                column: "Today",
                value: new DateTime(2022, 10, 6, 17, 30, 4, 220, DateTimeKind.Local).AddTicks(2236));

            migrationBuilder.UpdateData(
                table: "Partners",
                keyColumn: "Id",
                keyValue: 4,
                column: "Today",
                value: new DateTime(2022, 10, 6, 17, 30, 4, 220, DateTimeKind.Local).AddTicks(2241));

            migrationBuilder.UpdateData(
                table: "Partners",
                keyColumn: "Id",
                keyValue: 5,
                column: "Today",
                value: new DateTime(2022, 10, 6, 17, 30, 4, 220, DateTimeKind.Local).AddTicks(2243));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Partners",
                keyColumn: "Id",
                keyValue: 1,
                column: "Today",
                value: new DateTime(2022, 10, 6, 8, 43, 6, 667, DateTimeKind.Local).AddTicks(9735));

            migrationBuilder.UpdateData(
                table: "Partners",
                keyColumn: "Id",
                keyValue: 2,
                column: "Today",
                value: new DateTime(2022, 10, 6, 8, 43, 6, 669, DateTimeKind.Local).AddTicks(7202));

            migrationBuilder.UpdateData(
                table: "Partners",
                keyColumn: "Id",
                keyValue: 3,
                column: "Today",
                value: new DateTime(2022, 10, 6, 8, 43, 6, 669, DateTimeKind.Local).AddTicks(7247));

            migrationBuilder.UpdateData(
                table: "Partners",
                keyColumn: "Id",
                keyValue: 4,
                column: "Today",
                value: new DateTime(2022, 10, 6, 8, 43, 6, 669, DateTimeKind.Local).AddTicks(7253));

            migrationBuilder.UpdateData(
                table: "Partners",
                keyColumn: "Id",
                keyValue: 5,
                column: "Today",
                value: new DateTime(2022, 10, 6, 8, 43, 6, 669, DateTimeKind.Local).AddTicks(7256));
        }
    }
}
