using Microsoft.EntityFrameworkCore.Migrations;

namespace Repository.Migrations
{
    public partial class wsdssfdsds : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PD_Manufacturers_PD_ProductsTypes_ProductTypeId",
                table: "PD_Manufacturers");

            migrationBuilder.DropForeignKey(
                name: "FK_PD_Models_PD_Segments_SegmentId",
                table: "PD_Models");

            migrationBuilder.DropForeignKey(
                name: "FK_PD_Segments_PD_Manufacturers_ManufacturerId",
                table: "PD_Segments");

            migrationBuilder.RenameColumn(
                name: "ManufacturerId",
                table: "PD_Segments",
                newName: "ProductTypeId");

            migrationBuilder.RenameIndex(
                name: "IX_PD_Segments_ManufacturerId",
                table: "PD_Segments",
                newName: "IX_PD_Segments_ProductTypeId");

            migrationBuilder.RenameColumn(
                name: "SegmentId",
                table: "PD_Models",
                newName: "ManufacturerId");

            migrationBuilder.RenameIndex(
                name: "IX_PD_Models_SegmentId",
                table: "PD_Models",
                newName: "IX_PD_Models_ManufacturerId");

            migrationBuilder.RenameColumn(
                name: "ProductTypeId",
                table: "PD_Manufacturers",
                newName: "SegmentId");

            migrationBuilder.RenameIndex(
                name: "IX_PD_Manufacturers_ProductTypeId",
                table: "PD_Manufacturers",
                newName: "IX_PD_Manufacturers_SegmentId");

            migrationBuilder.AddForeignKey(
                name: "FK_PD_Manufacturers_PD_Segments_SegmentId",
                table: "PD_Manufacturers",
                column: "SegmentId",
                principalTable: "PD_Segments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PD_Models_PD_Manufacturers_ManufacturerId",
                table: "PD_Models",
                column: "ManufacturerId",
                principalTable: "PD_Manufacturers",
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
                name: "FK_PD_Manufacturers_PD_Segments_SegmentId",
                table: "PD_Manufacturers");

            migrationBuilder.DropForeignKey(
                name: "FK_PD_Models_PD_Manufacturers_ManufacturerId",
                table: "PD_Models");

            migrationBuilder.DropForeignKey(
                name: "FK_PD_Segments_PD_ProductsTypes_ProductTypeId",
                table: "PD_Segments");

            migrationBuilder.RenameColumn(
                name: "ProductTypeId",
                table: "PD_Segments",
                newName: "ManufacturerId");

            migrationBuilder.RenameIndex(
                name: "IX_PD_Segments_ProductTypeId",
                table: "PD_Segments",
                newName: "IX_PD_Segments_ManufacturerId");

            migrationBuilder.RenameColumn(
                name: "ManufacturerId",
                table: "PD_Models",
                newName: "SegmentId");

            migrationBuilder.RenameIndex(
                name: "IX_PD_Models_ManufacturerId",
                table: "PD_Models",
                newName: "IX_PD_Models_SegmentId");

            migrationBuilder.RenameColumn(
                name: "SegmentId",
                table: "PD_Manufacturers",
                newName: "ProductTypeId");

            migrationBuilder.RenameIndex(
                name: "IX_PD_Manufacturers_SegmentId",
                table: "PD_Manufacturers",
                newName: "IX_PD_Manufacturers_ProductTypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_PD_Manufacturers_PD_ProductsTypes_ProductTypeId",
                table: "PD_Manufacturers",
                column: "ProductTypeId",
                principalTable: "PD_ProductsTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PD_Models_PD_Segments_SegmentId",
                table: "PD_Models",
                column: "SegmentId",
                principalTable: "PD_Segments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PD_Segments_PD_Manufacturers_ManufacturerId",
                table: "PD_Segments",
                column: "ManufacturerId",
                principalTable: "PD_Manufacturers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
