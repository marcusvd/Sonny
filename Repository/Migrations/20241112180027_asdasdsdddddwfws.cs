using Microsoft.EntityFrameworkCore.Migrations;

namespace Repository.Migrations
{
    public partial class asdasdsdddddwfws : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.DropPrimaryKey(
                name: "PK_PD_Segments_Fillers",
                table: "PD_Segments_Fillers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PD_Models_Fillers",
                table: "PD_Models_Fillers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PD_Manufacturers_Fillers",
                table: "PD_Manufacturers_Fillers");

            migrationBuilder.RenameTable(
                name: "PD_Segments_Fillers",
                newName: "PD_Segments");

            migrationBuilder.RenameTable(
                name: "PD_Models_Fillers",
                newName: "PD_Models");

            migrationBuilder.RenameTable(
                name: "PD_Manufacturers_Fillers",
                newName: "PD_Manufacturers");

            migrationBuilder.RenameIndex(
                name: "IX_PD_Segments_Fillers_ProductTypeId",
                table: "PD_Segments",
                newName: "IX_PD_Segments_ProductTypeId");

            migrationBuilder.RenameIndex(
                name: "IX_PD_Segments_Fillers_CompanyId",
                table: "PD_Segments",
                newName: "IX_PD_Segments_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_PD_Models_Fillers_ProductTypeId",
                table: "PD_Models",
                newName: "IX_PD_Models_ProductTypeId");

            migrationBuilder.RenameIndex(
                name: "IX_PD_Models_Fillers_Name",
                table: "PD_Models",
                newName: "IX_PD_Models_Name");

            migrationBuilder.RenameIndex(
                name: "IX_PD_Models_Fillers_CompanyId",
                table: "PD_Models",
                newName: "IX_PD_Models_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_PD_Manufacturers_Fillers_ProductTypeId",
                table: "PD_Manufacturers",
                newName: "IX_PD_Manufacturers_ProductTypeId");

            migrationBuilder.RenameIndex(
                name: "IX_PD_Manufacturers_Fillers_CompanyId",
                table: "PD_Manufacturers",
                newName: "IX_PD_Manufacturers_CompanyId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PD_Segments",
                table: "PD_Segments",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PD_Models",
                table: "PD_Models",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PD_Manufacturers",
                table: "PD_Manufacturers",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_PD_Manufacturers_MN_Companies_CompanyId",
                table: "PD_Manufacturers",
                column: "CompanyId",
                principalTable: "MN_Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PD_Manufacturers_PD_ProductsTypes_ProductTypeId",
                table: "PD_Manufacturers",
                column: "ProductTypeId",
                principalTable: "PD_ProductsTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PD_Models_MN_Companies_CompanyId",
                table: "PD_Models",
                column: "CompanyId",
                principalTable: "MN_Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PD_Models_PD_ProductsTypes_ProductTypeId",
                table: "PD_Models",
                column: "ProductTypeId",
                principalTable: "PD_ProductsTypes",
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
                name: "FK_PD_Products_PD_Segments_SegmentId",
                table: "PD_Products",
                column: "SegmentId",
                principalTable: "PD_Segments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_PD_Segments_MN_Companies_CompanyId",
                table: "PD_Segments",
                column: "CompanyId",
                principalTable: "MN_Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PD_Segments_PD_ProductsTypes_ProductTypeId",
                table: "PD_Segments",
                column: "ProductTypeId",
                principalTable: "PD_ProductsTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PD_Manufacturers_MN_Companies_CompanyId",
                table: "PD_Manufacturers");

            migrationBuilder.DropForeignKey(
                name: "FK_PD_Manufacturers_PD_ProductsTypes_ProductTypeId",
                table: "PD_Manufacturers");

            migrationBuilder.DropForeignKey(
                name: "FK_PD_Models_MN_Companies_CompanyId",
                table: "PD_Models");

            migrationBuilder.DropForeignKey(
                name: "FK_PD_Models_PD_ProductsTypes_ProductTypeId",
                table: "PD_Models");

            migrationBuilder.DropForeignKey(
                name: "FK_PD_Products_PD_Manufacturers_ManufacturerId",
                table: "PD_Products");

            migrationBuilder.DropForeignKey(
                name: "FK_PD_Products_PD_Models_ModelId",
                table: "PD_Products");

            migrationBuilder.DropForeignKey(
                name: "FK_PD_Products_PD_Segments_SegmentId",
                table: "PD_Products");

            migrationBuilder.DropForeignKey(
                name: "FK_PD_Segments_MN_Companies_CompanyId",
                table: "PD_Segments");

            migrationBuilder.DropForeignKey(
                name: "FK_PD_Segments_PD_ProductsTypes_ProductTypeId",
                table: "PD_Segments");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PD_Segments",
                table: "PD_Segments");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PD_Models",
                table: "PD_Models");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PD_Manufacturers",
                table: "PD_Manufacturers");

            migrationBuilder.RenameTable(
                name: "PD_Segments",
                newName: "PD_Segments_Fillers");

            migrationBuilder.RenameTable(
                name: "PD_Models",
                newName: "PD_Models_Fillers");

            migrationBuilder.RenameTable(
                name: "PD_Manufacturers",
                newName: "PD_Manufacturers_Fillers");

            migrationBuilder.RenameIndex(
                name: "IX_PD_Segments_ProductTypeId",
                table: "PD_Segments_Fillers",
                newName: "IX_PD_Segments_Fillers_ProductTypeId");

            migrationBuilder.RenameIndex(
                name: "IX_PD_Segments_CompanyId",
                table: "PD_Segments_Fillers",
                newName: "IX_PD_Segments_Fillers_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_PD_Models_ProductTypeId",
                table: "PD_Models_Fillers",
                newName: "IX_PD_Models_Fillers_ProductTypeId");

            migrationBuilder.RenameIndex(
                name: "IX_PD_Models_Name",
                table: "PD_Models_Fillers",
                newName: "IX_PD_Models_Fillers_Name");

            migrationBuilder.RenameIndex(
                name: "IX_PD_Models_CompanyId",
                table: "PD_Models_Fillers",
                newName: "IX_PD_Models_Fillers_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_PD_Manufacturers_ProductTypeId",
                table: "PD_Manufacturers_Fillers",
                newName: "IX_PD_Manufacturers_Fillers_ProductTypeId");

            migrationBuilder.RenameIndex(
                name: "IX_PD_Manufacturers_CompanyId",
                table: "PD_Manufacturers_Fillers",
                newName: "IX_PD_Manufacturers_Fillers_CompanyId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PD_Segments_Fillers",
                table: "PD_Segments_Fillers",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PD_Models_Fillers",
                table: "PD_Models_Fillers",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PD_Manufacturers_Fillers",
                table: "PD_Manufacturers_Fillers",
                column: "Id");

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
    }
}
