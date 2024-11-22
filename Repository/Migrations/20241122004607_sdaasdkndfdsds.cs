using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Repository.Migrations
{
    public partial class sdaasdkndfdsds : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PD_ItemsProducts_MN_Customers_CustomerId",
                table: "PD_ItemsProducts");

            migrationBuilder.RenameColumn(
                name: "UsedHistorical",
                table: "PD_ItemsProducts",
                newName: "UsedHistoricalOrSupplier");

            migrationBuilder.RenameColumn(
                name: "NfNumber",
                table: "PD_ItemsProducts",
                newName: "PurchaseInvoiceNumber");

            migrationBuilder.RenameColumn(
                name: "CustomerId",
                table: "PD_ItemsProducts",
                newName: "ReservedForCustomerId");

            migrationBuilder.RenameIndex(
                name: "IX_PD_ItemsProducts_CustomerId",
                table: "PD_ItemsProducts",
                newName: "IX_PD_ItemsProducts_ReservedForCustomerId");

            migrationBuilder.AddColumn<DateTime>(
                name: "IsReserved",
                table: "PD_ItemsProducts",
                type: "datetime(6)",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "IsReservedByUserId",
                table: "PD_ItemsProducts",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_PD_ItemsProducts_IsReservedByUserId",
                table: "PD_ItemsProducts",
                column: "IsReservedByUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_PD_ItemsProducts_aspnetUsers_IsReservedByUserId",
                table: "PD_ItemsProducts",
                column: "IsReservedByUserId",
                principalTable: "aspnetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_PD_ItemsProducts_MN_Customers_ReservedForCustomerId",
                table: "PD_ItemsProducts",
                column: "ReservedForCustomerId",
                principalTable: "MN_Customers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PD_ItemsProducts_aspnetUsers_IsReservedByUserId",
                table: "PD_ItemsProducts");

            migrationBuilder.DropForeignKey(
                name: "FK_PD_ItemsProducts_MN_Customers_ReservedForCustomerId",
                table: "PD_ItemsProducts");

            migrationBuilder.DropIndex(
                name: "IX_PD_ItemsProducts_IsReservedByUserId",
                table: "PD_ItemsProducts");

            migrationBuilder.DropColumn(
                name: "IsReserved",
                table: "PD_ItemsProducts");

            migrationBuilder.DropColumn(
                name: "IsReservedByUserId",
                table: "PD_ItemsProducts");

            migrationBuilder.RenameColumn(
                name: "UsedHistoricalOrSupplier",
                table: "PD_ItemsProducts",
                newName: "UsedHistorical");

            migrationBuilder.RenameColumn(
                name: "ReservedForCustomerId",
                table: "PD_ItemsProducts",
                newName: "CustomerId");

            migrationBuilder.RenameColumn(
                name: "PurchaseInvoiceNumber",
                table: "PD_ItemsProducts",
                newName: "NfNumber");

            migrationBuilder.RenameIndex(
                name: "IX_PD_ItemsProducts_ReservedForCustomerId",
                table: "PD_ItemsProducts",
                newName: "IX_PD_ItemsProducts_CustomerId");

            migrationBuilder.AddForeignKey(
                name: "FK_PD_ItemsProducts_MN_Customers_CustomerId",
                table: "PD_ItemsProducts",
                column: "CustomerId",
                principalTable: "MN_Customers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
