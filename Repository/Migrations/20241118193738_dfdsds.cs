using Microsoft.EntityFrameworkCore.Migrations;

namespace Repository.Migrations
{
    public partial class dfdsds : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Name",
                table: "PD_Products");

            migrationBuilder.AddColumn<int>(
                name: "ProductTypeId",
                table: "PD_Products",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_PD_Products_ProductTypeId",
                table: "PD_Products",
                column: "ProductTypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_PD_Products_PD_ProductsTypes_ProductTypeId",
                table: "PD_Products",
                column: "ProductTypeId",
                principalTable: "PD_ProductsTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PD_Products_PD_ProductsTypes_ProductTypeId",
                table: "PD_Products");

            migrationBuilder.DropIndex(
                name: "IX_PD_Products_ProductTypeId",
                table: "PD_Products");

            migrationBuilder.DropColumn(
                name: "ProductTypeId",
                table: "PD_Products");

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "PD_Products",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");
        }
    }
}
