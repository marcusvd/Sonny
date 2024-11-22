using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Repository.Migrations
{
    public partial class kndfdsds : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PD_Products_aspnetUsers_UserId",
                table: "PD_Products");

            migrationBuilder.DropForeignKey(
                name: "FK_PD_Products_PD_Manufacturers_ManufacturerId",
                table: "PD_Products");

            migrationBuilder.DropForeignKey(
                name: "FK_PD_Products_PD_Models_ModelId",
                table: "PD_Products");

            migrationBuilder.DropForeignKey(
                name: "FK_PD_Products_PD_ProductsTypes_ProductTypeId",
                table: "PD_Products");

            migrationBuilder.DropForeignKey(
                name: "FK_PD_Products_PD_Segments_SegmentId",
                table: "PD_Products");

            migrationBuilder.DropForeignKey(
                name: "FK_PD_Segments_PD_ProductsTypes_ProductTypeId",
                table: "PD_Segments");

            migrationBuilder.DropForeignKey(
                name: "FK_PD_Stocks_PD_ProductsTypes_ProductId",
                table: "PD_Stocks");

            migrationBuilder.DropTable(
                name: "PD_ProductsTypes");

            migrationBuilder.DropIndex(
                name: "IX_PD_Products_ManufacturerId",
                table: "PD_Products");

            migrationBuilder.DropIndex(
                name: "IX_PD_Products_ModelId",
                table: "PD_Products");

            migrationBuilder.DropIndex(
                name: "IX_PD_Products_ProductTypeId",
                table: "PD_Products");

            migrationBuilder.DropIndex(
                name: "IX_PD_Products_SegmentId",
                table: "PD_Products");

            migrationBuilder.DropIndex(
                name: "IX_PD_Products_UserId",
                table: "PD_Products");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "PD_Products");

            migrationBuilder.DropColumn(
                name: "ManufacturerId",
                table: "PD_Products");

            migrationBuilder.DropColumn(
                name: "ModelId",
                table: "PD_Products");

            migrationBuilder.DropColumn(
                name: "ProductTypeId",
                table: "PD_Products");

            migrationBuilder.DropColumn(
                name: "SegmentId",
                table: "PD_Products");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "PD_Products");

            migrationBuilder.RenameColumn(
                name: "ProductTypeId",
                table: "PD_Segments",
                newName: "ProductId");

            migrationBuilder.RenameIndex(
                name: "IX_PD_Segments_ProductTypeId",
                table: "PD_Segments",
                newName: "IX_PD_Segments_ProductId");

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "PD_Products",
                type: "varchar(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "")
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_PD_Products_Name",
                table: "PD_Products",
                column: "Name",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_PD_Segments_PD_Products_ProductId",
                table: "PD_Segments",
                column: "ProductId",
                principalTable: "PD_Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PD_Stocks_PD_Products_ProductId",
                table: "PD_Stocks",
                column: "ProductId",
                principalTable: "PD_Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PD_Segments_PD_Products_ProductId",
                table: "PD_Segments");

            migrationBuilder.DropForeignKey(
                name: "FK_PD_Stocks_PD_Products_ProductId",
                table: "PD_Stocks");

            migrationBuilder.DropIndex(
                name: "IX_PD_Products_Name",
                table: "PD_Products");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "PD_Products");

            migrationBuilder.RenameColumn(
                name: "ProductId",
                table: "PD_Segments",
                newName: "ProductTypeId");

            migrationBuilder.RenameIndex(
                name: "IX_PD_Segments_ProductId",
                table: "PD_Segments",
                newName: "IX_PD_Segments_ProductTypeId");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "PD_Products",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<int>(
                name: "ManufacturerId",
                table: "PD_Products",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ModelId",
                table: "PD_Products",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ProductTypeId",
                table: "PD_Products",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "SegmentId",
                table: "PD_Products",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "PD_Products",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "PD_ProductsTypes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    CompanyId = table.Column<int>(type: "int", nullable: false),
                    Deleted = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    Name = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Registered = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PD_ProductsTypes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PD_ProductsTypes_MN_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "MN_Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_PD_Products_ManufacturerId",
                table: "PD_Products",
                column: "ManufacturerId");

            migrationBuilder.CreateIndex(
                name: "IX_PD_Products_ModelId",
                table: "PD_Products",
                column: "ModelId");

            migrationBuilder.CreateIndex(
                name: "IX_PD_Products_ProductTypeId",
                table: "PD_Products",
                column: "ProductTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_PD_Products_SegmentId",
                table: "PD_Products",
                column: "SegmentId");

            migrationBuilder.CreateIndex(
                name: "IX_PD_Products_UserId",
                table: "PD_Products",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_PD_ProductsTypes_CompanyId",
                table: "PD_ProductsTypes",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_PD_ProductsTypes_Name",
                table: "PD_ProductsTypes",
                column: "Name",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_PD_Products_aspnetUsers_UserId",
                table: "PD_Products",
                column: "UserId",
                principalTable: "aspnetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PD_Products_PD_Manufacturers_ManufacturerId",
                table: "PD_Products",
                column: "ManufacturerId",
                principalTable: "PD_Manufacturers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_PD_Products_PD_Models_ModelId",
                table: "PD_Products",
                column: "ModelId",
                principalTable: "PD_Models",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_PD_Products_PD_ProductsTypes_ProductTypeId",
                table: "PD_Products",
                column: "ProductTypeId",
                principalTable: "PD_ProductsTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_PD_Products_PD_Segments_SegmentId",
                table: "PD_Products",
                column: "SegmentId",
                principalTable: "PD_Segments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_PD_Segments_PD_ProductsTypes_ProductTypeId",
                table: "PD_Segments",
                column: "ProductTypeId",
                principalTable: "PD_ProductsTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PD_Stocks_PD_ProductsTypes_ProductId",
                table: "PD_Stocks",
                column: "ProductId",
                principalTable: "PD_ProductsTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
