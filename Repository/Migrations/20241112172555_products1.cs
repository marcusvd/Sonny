using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Repository.Migrations
{
    public partial class products1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PD_Manufacturers_Fillers_PD_Items_Fillers_ItemId",
                table: "PD_Manufacturers_Fillers");

            migrationBuilder.DropForeignKey(
                name: "FK_PD_Models_Fillers_PD_Items_Fillers_ItemId",
                table: "PD_Models_Fillers");

            migrationBuilder.DropForeignKey(
                name: "FK_PD_Products_PD_Equipaments_EquipamentId",
                table: "PD_Products");

            migrationBuilder.DropForeignKey(
                name: "FK_PD_Segments_Fillers_PD_Items_Fillers_ItemId",
                table: "PD_Segments_Fillers");

            migrationBuilder.DropTable(
                name: "PD_Equipaments");

            migrationBuilder.DropTable(
                name: "PD_Items_Fillers");

            migrationBuilder.DropTable(
                name: "PD_Quantities");

            migrationBuilder.DropTable(
                name: "PD_Trackings");

            migrationBuilder.RenameColumn(
                name: "ItemId",
                table: "PD_Segments_Fillers",
                newName: "ProductTypeId");

            migrationBuilder.RenameIndex(
                name: "IX_PD_Segments_Fillers_ItemId",
                table: "PD_Segments_Fillers",
                newName: "IX_PD_Segments_Fillers_ProductTypeId");

            migrationBuilder.RenameColumn(
                name: "EquipamentId",
                table: "PD_Products",
                newName: "SegmentId");

            migrationBuilder.RenameIndex(
                name: "IX_PD_Products_EquipamentId",
                table: "PD_Products",
                newName: "IX_PD_Products_SegmentId");

            migrationBuilder.RenameColumn(
                name: "ItemId",
                table: "PD_Models_Fillers",
                newName: "ProductTypeId");

            migrationBuilder.RenameIndex(
                name: "IX_PD_Models_Fillers_ItemId",
                table: "PD_Models_Fillers",
                newName: "IX_PD_Models_Fillers_ProductTypeId");

            migrationBuilder.RenameColumn(
                name: "ItemId",
                table: "PD_Manufacturers_Fillers",
                newName: "ProductTypeId");

            migrationBuilder.RenameIndex(
                name: "IX_PD_Manufacturers_Fillers_ItemId",
                table: "PD_Manufacturers_Fillers",
                newName: "IX_PD_Manufacturers_Fillers_ProductTypeId");

            migrationBuilder.AddColumn<int>(
                name: "CompanyId",
                table: "PD_Segments_Fillers",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "Deleted",
                table: "PD_Segments_Fillers",
                type: "datetime(6)",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "Registered",
                table: "PD_Segments_Fillers",
                type: "datetime(6)",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AlterColumn<DateTime>(
                name: "Deleted",
                table: "PD_Products",
                type: "datetime(6)",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "tinyint(1)");

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

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "PD_Products",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<DateTime>(
                name: "Registered",
                table: "PD_Products",
                type: "datetime(6)",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "PD_Products",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "PD_Models_Fillers",
                type: "varchar(255)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "longtext")
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<int>(
                name: "CompanyId",
                table: "PD_Models_Fillers",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "Deleted",
                table: "PD_Models_Fillers",
                type: "datetime(6)",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "Registered",
                table: "PD_Models_Fillers",
                type: "datetime(6)",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "CompanyId",
                table: "PD_Manufacturers_Fillers",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "Deleted",
                table: "PD_Manufacturers_Fillers",
                type: "datetime(6)",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "Registered",
                table: "PD_Manufacturers_Fillers",
                type: "datetime(6)",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "IsAuthorized",
                table: "BS_BudgetsServices",
                type: "datetime(6)",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.CreateTable(
                name: "PD_ProductsTypes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CompanyId = table.Column<int>(type: "int", nullable: false),
                    Deleted = table.Column<DateTime>(type: "datetime(6)", nullable: false),
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

            migrationBuilder.CreateTable(
                name: "PD_Stocks",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    ProductId = table.Column<int>(type: "int", nullable: true),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    CompanyId = table.Column<int>(type: "int", nullable: false),
                    Deleted = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    Registered = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PD_Stocks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PD_Stocks_aspnetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "aspnetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PD_Stocks_MN_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "MN_Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PD_Stocks_PD_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "PD_Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "PD_ItemsProducts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    NfNumber = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CostPrice = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    SoldPrice = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    EntryDate = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    SoldDate = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    WarrantyEnd = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    WarrantyEndLocal = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    IsUsed = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    IsTested = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    UsedHistorical = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    StockId = table.Column<int>(type: "int", nullable: false),
                    SupplierId = table.Column<int>(type: "int", nullable: false),
                    CustomerId = table.Column<int>(type: "int", nullable: true),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    CompanyId = table.Column<int>(type: "int", nullable: false),
                    Deleted = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    Registered = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PD_ItemsProducts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PD_ItemsProducts_aspnetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "aspnetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PD_ItemsProducts_MN_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "MN_Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PD_ItemsProducts_MN_Customers_CustomerId",
                        column: x => x.CustomerId,
                        principalTable: "MN_Customers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PD_ItemsProducts_MN_Partners_SupplierId",
                        column: x => x.SupplierId,
                        principalTable: "MN_Partners",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PD_ItemsProducts_PD_Stocks_StockId",
                        column: x => x.StockId,
                        principalTable: "PD_Stocks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_PD_Segments_Fillers_CompanyId",
                table: "PD_Segments_Fillers",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_PD_Products_ManufacturerId",
                table: "PD_Products",
                column: "ManufacturerId");

            migrationBuilder.CreateIndex(
                name: "IX_PD_Products_ModelId",
                table: "PD_Products",
                column: "ModelId");

            migrationBuilder.CreateIndex(
                name: "IX_PD_Products_UserId",
                table: "PD_Products",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_PD_Models_Fillers_CompanyId",
                table: "PD_Models_Fillers",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_PD_Models_Fillers_Name",
                table: "PD_Models_Fillers",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_PD_Manufacturers_Fillers_CompanyId",
                table: "PD_Manufacturers_Fillers",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_PD_ItemsProducts_CompanyId",
                table: "PD_ItemsProducts",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_PD_ItemsProducts_CustomerId",
                table: "PD_ItemsProducts",
                column: "CustomerId");

            migrationBuilder.CreateIndex(
                name: "IX_PD_ItemsProducts_StockId",
                table: "PD_ItemsProducts",
                column: "StockId");

            migrationBuilder.CreateIndex(
                name: "IX_PD_ItemsProducts_SupplierId",
                table: "PD_ItemsProducts",
                column: "SupplierId");

            migrationBuilder.CreateIndex(
                name: "IX_PD_ItemsProducts_UserId",
                table: "PD_ItemsProducts",
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

            migrationBuilder.CreateIndex(
                name: "IX_PD_Stocks_CompanyId",
                table: "PD_Stocks",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_PD_Stocks_ProductId",
                table: "PD_Stocks",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_PD_Stocks_UserId",
                table: "PD_Stocks",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_PD_Manufacturers_Fillers_MN_Companies_CompanyId",
                table: "PD_Manufacturers_Fillers",
                column: "CompanyId",
                principalTable: "MN_Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PD_Manufacturers_Fillers_PD_ProductsTypes_ProductTypeId",
                table: "PD_Manufacturers_Fillers",
                column: "ProductTypeId",
                principalTable: "PD_ProductsTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PD_Models_Fillers_MN_Companies_CompanyId",
                table: "PD_Models_Fillers",
                column: "CompanyId",
                principalTable: "MN_Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PD_Models_Fillers_PD_ProductsTypes_ProductTypeId",
                table: "PD_Models_Fillers",
                column: "ProductTypeId",
                principalTable: "PD_ProductsTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PD_Products_aspnetUsers_UserId",
                table: "PD_Products",
                column: "UserId",
                principalTable: "aspnetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PD_Products_PD_Manufacturers_Fillers_ManufacturerId",
                table: "PD_Products",
                column: "ManufacturerId",
                principalTable: "PD_Manufacturers_Fillers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_PD_Products_PD_Models_Fillers_ModelId",
                table: "PD_Products",
                column: "ModelId",
                principalTable: "PD_Models_Fillers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_PD_Products_PD_Segments_Fillers_SegmentId",
                table: "PD_Products",
                column: "SegmentId",
                principalTable: "PD_Segments_Fillers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_PD_Segments_Fillers_MN_Companies_CompanyId",
                table: "PD_Segments_Fillers",
                column: "CompanyId",
                principalTable: "MN_Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PD_Segments_Fillers_PD_ProductsTypes_ProductTypeId",
                table: "PD_Segments_Fillers",
                column: "ProductTypeId",
                principalTable: "PD_ProductsTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PD_Manufacturers_Fillers_MN_Companies_CompanyId",
                table: "PD_Manufacturers_Fillers");

            migrationBuilder.DropForeignKey(
                name: "FK_PD_Manufacturers_Fillers_PD_ProductsTypes_ProductTypeId",
                table: "PD_Manufacturers_Fillers");

            migrationBuilder.DropForeignKey(
                name: "FK_PD_Models_Fillers_MN_Companies_CompanyId",
                table: "PD_Models_Fillers");

            migrationBuilder.DropForeignKey(
                name: "FK_PD_Models_Fillers_PD_ProductsTypes_ProductTypeId",
                table: "PD_Models_Fillers");

            migrationBuilder.DropForeignKey(
                name: "FK_PD_Products_aspnetUsers_UserId",
                table: "PD_Products");

            migrationBuilder.DropForeignKey(
                name: "FK_PD_Products_PD_Manufacturers_Fillers_ManufacturerId",
                table: "PD_Products");

            migrationBuilder.DropForeignKey(
                name: "FK_PD_Products_PD_Models_Fillers_ModelId",
                table: "PD_Products");

            migrationBuilder.DropForeignKey(
                name: "FK_PD_Products_PD_Segments_Fillers_SegmentId",
                table: "PD_Products");

            migrationBuilder.DropForeignKey(
                name: "FK_PD_Segments_Fillers_MN_Companies_CompanyId",
                table: "PD_Segments_Fillers");

            migrationBuilder.DropForeignKey(
                name: "FK_PD_Segments_Fillers_PD_ProductsTypes_ProductTypeId",
                table: "PD_Segments_Fillers");

            migrationBuilder.DropTable(
                name: "PD_ItemsProducts");

            migrationBuilder.DropTable(
                name: "PD_ProductsTypes");

            migrationBuilder.DropTable(
                name: "PD_Stocks");

            migrationBuilder.DropIndex(
                name: "IX_PD_Segments_Fillers_CompanyId",
                table: "PD_Segments_Fillers");

            migrationBuilder.DropIndex(
                name: "IX_PD_Products_ManufacturerId",
                table: "PD_Products");

            migrationBuilder.DropIndex(
                name: "IX_PD_Products_ModelId",
                table: "PD_Products");

            migrationBuilder.DropIndex(
                name: "IX_PD_Products_UserId",
                table: "PD_Products");

            migrationBuilder.DropIndex(
                name: "IX_PD_Models_Fillers_CompanyId",
                table: "PD_Models_Fillers");

            migrationBuilder.DropIndex(
                name: "IX_PD_Models_Fillers_Name",
                table: "PD_Models_Fillers");

            migrationBuilder.DropIndex(
                name: "IX_PD_Manufacturers_Fillers_CompanyId",
                table: "PD_Manufacturers_Fillers");

            migrationBuilder.DropColumn(
                name: "CompanyId",
                table: "PD_Segments_Fillers");

            migrationBuilder.DropColumn(
                name: "Deleted",
                table: "PD_Segments_Fillers");

            migrationBuilder.DropColumn(
                name: "Registered",
                table: "PD_Segments_Fillers");

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
                name: "Name",
                table: "PD_Products");

            migrationBuilder.DropColumn(
                name: "Registered",
                table: "PD_Products");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "PD_Products");

            migrationBuilder.DropColumn(
                name: "CompanyId",
                table: "PD_Models_Fillers");

            migrationBuilder.DropColumn(
                name: "Deleted",
                table: "PD_Models_Fillers");

            migrationBuilder.DropColumn(
                name: "Registered",
                table: "PD_Models_Fillers");

            migrationBuilder.DropColumn(
                name: "CompanyId",
                table: "PD_Manufacturers_Fillers");

            migrationBuilder.DropColumn(
                name: "Deleted",
                table: "PD_Manufacturers_Fillers");

            migrationBuilder.DropColumn(
                name: "Registered",
                table: "PD_Manufacturers_Fillers");

            migrationBuilder.DropColumn(
                name: "IsAuthorized",
                table: "BS_BudgetsServices");

            migrationBuilder.RenameColumn(
                name: "ProductTypeId",
                table: "PD_Segments_Fillers",
                newName: "ItemId");

            migrationBuilder.RenameIndex(
                name: "IX_PD_Segments_Fillers_ProductTypeId",
                table: "PD_Segments_Fillers",
                newName: "IX_PD_Segments_Fillers_ItemId");

            migrationBuilder.RenameColumn(
                name: "SegmentId",
                table: "PD_Products",
                newName: "EquipamentId");

            migrationBuilder.RenameIndex(
                name: "IX_PD_Products_SegmentId",
                table: "PD_Products",
                newName: "IX_PD_Products_EquipamentId");

            migrationBuilder.RenameColumn(
                name: "ProductTypeId",
                table: "PD_Models_Fillers",
                newName: "ItemId");

            migrationBuilder.RenameIndex(
                name: "IX_PD_Models_Fillers_ProductTypeId",
                table: "PD_Models_Fillers",
                newName: "IX_PD_Models_Fillers_ItemId");

            migrationBuilder.RenameColumn(
                name: "ProductTypeId",
                table: "PD_Manufacturers_Fillers",
                newName: "ItemId");

            migrationBuilder.RenameIndex(
                name: "IX_PD_Manufacturers_Fillers_ProductTypeId",
                table: "PD_Manufacturers_Fillers",
                newName: "IX_PD_Manufacturers_Fillers_ItemId");

            migrationBuilder.AlterColumn<bool>(
                name: "Deleted",
                table: "PD_Products",
                type: "tinyint(1)",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime(6)");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "PD_Models_Fillers",
                type: "longtext",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(255)")
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "PD_Equipaments",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Description = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Manufacturer = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Model = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Name = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Segment = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PD_Equipaments", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "PD_Items_Fillers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    CompanyId = table.Column<int>(type: "int", nullable: false),
                    Deleted = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    Name = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PD_Items_Fillers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PD_Items_Fillers_MN_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "MN_Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "PD_Quantities",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    CostPrice = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    CustomerId = table.Column<int>(type: "int", nullable: true),
                    EntryDate = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    IsReserved = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    IsTested = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    IsUsed = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    NfNumber = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ProductId = table.Column<int>(type: "int", nullable: false),
                    ReservedOrSoldByUserId = table.Column<int>(type: "int", nullable: true),
                    Sn = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    SoldDate = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    SoldPrice = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    SupplierId = table.Column<int>(type: "int", nullable: false),
                    UsedHistorical = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    WarrantyEnd = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    WarrantyEndLocal = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PD_Quantities", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PD_Quantities_aspnetUsers_ReservedOrSoldByUserId",
                        column: x => x.ReservedOrSoldByUserId,
                        principalTable: "aspnetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_PD_Quantities_MN_Customers_CustomerId",
                        column: x => x.CustomerId,
                        principalTable: "MN_Customers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_PD_Quantities_MN_Partners_SupplierId",
                        column: x => x.SupplierId,
                        principalTable: "MN_Partners",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PD_Quantities_PD_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "PD_Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "PD_Trackings",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    CostPrice = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    CustomerId = table.Column<int>(type: "int", nullable: true),
                    NfNumber = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ProductId = table.Column<int>(type: "int", nullable: false),
                    ServiceId = table.Column<int>(type: "int", nullable: true),
                    Sn = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    SoldPrice = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PD_Trackings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PD_Trackings_aspnetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "aspnetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PD_Trackings_BS_BudgetsServices_ServiceId",
                        column: x => x.ServiceId,
                        principalTable: "BS_BudgetsServices",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PD_Trackings_MN_Customers_CustomerId",
                        column: x => x.CustomerId,
                        principalTable: "MN_Customers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PD_Trackings_PD_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "PD_Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_PD_Equipaments_Model",
                table: "PD_Equipaments",
                column: "Model",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_PD_Items_Fillers_CompanyId",
                table: "PD_Items_Fillers",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_PD_Items_Fillers_Name",
                table: "PD_Items_Fillers",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_PD_Quantities_CustomerId",
                table: "PD_Quantities",
                column: "CustomerId");

            migrationBuilder.CreateIndex(
                name: "IX_PD_Quantities_ProductId",
                table: "PD_Quantities",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_PD_Quantities_ReservedOrSoldByUserId",
                table: "PD_Quantities",
                column: "ReservedOrSoldByUserId");

            migrationBuilder.CreateIndex(
                name: "IX_PD_Quantities_Sn",
                table: "PD_Quantities",
                column: "Sn",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_PD_Quantities_SupplierId",
                table: "PD_Quantities",
                column: "SupplierId");

            migrationBuilder.CreateIndex(
                name: "IX_PD_Trackings_CustomerId",
                table: "PD_Trackings",
                column: "CustomerId");

            migrationBuilder.CreateIndex(
                name: "IX_PD_Trackings_ProductId",
                table: "PD_Trackings",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_PD_Trackings_ServiceId",
                table: "PD_Trackings",
                column: "ServiceId");

            migrationBuilder.CreateIndex(
                name: "IX_PD_Trackings_UserId",
                table: "PD_Trackings",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_PD_Manufacturers_Fillers_PD_Items_Fillers_ItemId",
                table: "PD_Manufacturers_Fillers",
                column: "ItemId",
                principalTable: "PD_Items_Fillers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PD_Models_Fillers_PD_Items_Fillers_ItemId",
                table: "PD_Models_Fillers",
                column: "ItemId",
                principalTable: "PD_Items_Fillers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PD_Products_PD_Equipaments_EquipamentId",
                table: "PD_Products",
                column: "EquipamentId",
                principalTable: "PD_Equipaments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_PD_Segments_Fillers_PD_Items_Fillers_ItemId",
                table: "PD_Segments_Fillers",
                column: "ItemId",
                principalTable: "PD_Items_Fillers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
