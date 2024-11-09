using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Repository.Migrations
{
    public partial class sqwdfedwfws : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OS_Destinies_OS_CollectsDelivers_CollectDeliverId",
                table: "OS_Destinies");

            migrationBuilder.DropIndex(
                name: "IX_OS_Destinies_CollectDeliverId",
                table: "OS_Destinies");

            migrationBuilder.RenameColumn(
                name: "CollectDeliverId",
                table: "OS_Destinies",
                newName: "UserId");

            migrationBuilder.AddColumn<int>(
                name: "CompanyId",
                table: "OS_Destinies",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "Deleted",
                table: "OS_Destinies",
                type: "datetime(6)",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "Registered",
                table: "OS_Destinies",
                type: "datetime(6)",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AlterColumn<DateTime>(
                name: "Other",
                table: "OS_CollectsDelivers",
                type: "datetime(6)",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "tinyint(1)");

            migrationBuilder.AlterColumn<DateTime>(
                name: "Deliver",
                table: "OS_CollectsDelivers",
                type: "datetime(6)",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "tinyint(1)");

            migrationBuilder.AlterColumn<DateTime>(
                name: "Deleted",
                table: "OS_CollectsDelivers",
                type: "datetime(6)",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "tinyint(1)");

            migrationBuilder.AlterColumn<DateTime>(
                name: "Collect",
                table: "OS_CollectsDelivers",
                type: "datetime(6)",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "tinyint(1)");

            migrationBuilder.AddColumn<int>(
                name: "DestinyId",
                table: "OS_CollectsDelivers",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "Registered",
                table: "OS_CollectsDelivers",
                type: "datetime(6)",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "WasPaid",
                table: "OS_CollectsDelivers",
                type: "datetime(6)",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AlterColumn<DateTime>(
                name: "Deleted",
                table: "OS_BillingsFroms",
                type: "datetime(6)",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "tinyint(1)");

            migrationBuilder.AddColumn<int>(
                name: "CompanyId",
                table: "OS_BillingsFroms",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "Registered",
                table: "OS_BillingsFroms",
                type: "datetime(6)",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "OS_BillingsFroms",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_OS_Destinies_CompanyId",
                table: "OS_Destinies",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_OS_Destinies_UserId",
                table: "OS_Destinies",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_OS_CollectsDelivers_DestinyId",
                table: "OS_CollectsDelivers",
                column: "DestinyId");

            migrationBuilder.CreateIndex(
                name: "IX_OS_BillingsFroms_CompanyId",
                table: "OS_BillingsFroms",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_OS_BillingsFroms_UserId",
                table: "OS_BillingsFroms",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_OS_BillingsFroms_aspnetUsers_UserId",
                table: "OS_BillingsFroms",
                column: "UserId",
                principalTable: "aspnetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_OS_BillingsFroms_MN_Companies_CompanyId",
                table: "OS_BillingsFroms",
                column: "CompanyId",
                principalTable: "MN_Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_OS_CollectsDelivers_OS_Destinies_DestinyId",
                table: "OS_CollectsDelivers",
                column: "DestinyId",
                principalTable: "OS_Destinies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_OS_Destinies_aspnetUsers_UserId",
                table: "OS_Destinies",
                column: "UserId",
                principalTable: "aspnetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_OS_Destinies_MN_Companies_CompanyId",
                table: "OS_Destinies",
                column: "CompanyId",
                principalTable: "MN_Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OS_BillingsFroms_aspnetUsers_UserId",
                table: "OS_BillingsFroms");

            migrationBuilder.DropForeignKey(
                name: "FK_OS_BillingsFroms_MN_Companies_CompanyId",
                table: "OS_BillingsFroms");

            migrationBuilder.DropForeignKey(
                name: "FK_OS_CollectsDelivers_OS_Destinies_DestinyId",
                table: "OS_CollectsDelivers");

            migrationBuilder.DropForeignKey(
                name: "FK_OS_Destinies_aspnetUsers_UserId",
                table: "OS_Destinies");

            migrationBuilder.DropForeignKey(
                name: "FK_OS_Destinies_MN_Companies_CompanyId",
                table: "OS_Destinies");

            migrationBuilder.DropIndex(
                name: "IX_OS_Destinies_CompanyId",
                table: "OS_Destinies");

            migrationBuilder.DropIndex(
                name: "IX_OS_Destinies_UserId",
                table: "OS_Destinies");

            migrationBuilder.DropIndex(
                name: "IX_OS_CollectsDelivers_DestinyId",
                table: "OS_CollectsDelivers");

            migrationBuilder.DropIndex(
                name: "IX_OS_BillingsFroms_CompanyId",
                table: "OS_BillingsFroms");

            migrationBuilder.DropIndex(
                name: "IX_OS_BillingsFroms_UserId",
                table: "OS_BillingsFroms");

            migrationBuilder.DropColumn(
                name: "CompanyId",
                table: "OS_Destinies");

            migrationBuilder.DropColumn(
                name: "Deleted",
                table: "OS_Destinies");

            migrationBuilder.DropColumn(
                name: "Registered",
                table: "OS_Destinies");

            migrationBuilder.DropColumn(
                name: "DestinyId",
                table: "OS_CollectsDelivers");

            migrationBuilder.DropColumn(
                name: "Registered",
                table: "OS_CollectsDelivers");

            migrationBuilder.DropColumn(
                name: "WasPaid",
                table: "OS_CollectsDelivers");

            migrationBuilder.DropColumn(
                name: "CompanyId",
                table: "OS_BillingsFroms");

            migrationBuilder.DropColumn(
                name: "Registered",
                table: "OS_BillingsFroms");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "OS_BillingsFroms");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "OS_Destinies",
                newName: "CollectDeliverId");

            migrationBuilder.AlterColumn<bool>(
                name: "Other",
                table: "OS_CollectsDelivers",
                type: "tinyint(1)",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime(6)");

            migrationBuilder.AlterColumn<bool>(
                name: "Deliver",
                table: "OS_CollectsDelivers",
                type: "tinyint(1)",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime(6)");

            migrationBuilder.AlterColumn<bool>(
                name: "Deleted",
                table: "OS_CollectsDelivers",
                type: "tinyint(1)",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime(6)");

            migrationBuilder.AlterColumn<bool>(
                name: "Collect",
                table: "OS_CollectsDelivers",
                type: "tinyint(1)",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime(6)");

            migrationBuilder.AlterColumn<bool>(
                name: "Deleted",
                table: "OS_BillingsFroms",
                type: "tinyint(1)",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime(6)");

            migrationBuilder.CreateIndex(
                name: "IX_OS_Destinies_CollectDeliverId",
                table: "OS_Destinies",
                column: "CollectDeliverId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_OS_Destinies_OS_CollectsDelivers_CollectDeliverId",
                table: "OS_Destinies",
                column: "CollectDeliverId",
                principalTable: "OS_CollectsDelivers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
