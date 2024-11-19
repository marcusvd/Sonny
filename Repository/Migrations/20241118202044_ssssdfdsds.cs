using Microsoft.EntityFrameworkCore.Migrations;

namespace Repository.Migrations
{
    public partial class ssssdfdsds : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PD_Stocks_PD_Products_ProductId",
                table: "PD_Stocks");

            migrationBuilder.AddForeignKey(
                name: "FK_PD_Stocks_PD_ProductsTypes_ProductId",
                table: "PD_Stocks",
                column: "ProductId",
                principalTable: "PD_ProductsTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PD_Stocks_PD_ProductsTypes_ProductId",
                table: "PD_Stocks");

            migrationBuilder.AddForeignKey(
                name: "FK_PD_Stocks_PD_Products_ProductId",
                table: "PD_Stocks",
                column: "ProductId",
                principalTable: "PD_Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
