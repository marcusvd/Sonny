using Microsoft.EntityFrameworkCore.Migrations;

namespace Repository.Migrations
{
    public partial class itemproduct10 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Manufacturers_Fillers_PD_Items_Fillers_ItemId",
                table: "Manufacturers_Fillers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Manufacturers_Fillers",
                table: "Manufacturers_Fillers");

            migrationBuilder.RenameTable(
                name: "Manufacturers_Fillers",
                newName: "PD_Manufacturers_Fillers");

            migrationBuilder.RenameIndex(
                name: "IX_Manufacturers_Fillers_ItemId",
                table: "PD_Manufacturers_Fillers",
                newName: "IX_PD_Manufacturers_Fillers_ItemId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PD_Manufacturers_Fillers",
                table: "PD_Manufacturers_Fillers",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_PD_Manufacturers_Fillers_PD_Items_Fillers_ItemId",
                table: "PD_Manufacturers_Fillers",
                column: "ItemId",
                principalTable: "PD_Items_Fillers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PD_Manufacturers_Fillers_PD_Items_Fillers_ItemId",
                table: "PD_Manufacturers_Fillers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PD_Manufacturers_Fillers",
                table: "PD_Manufacturers_Fillers");

            migrationBuilder.RenameTable(
                name: "PD_Manufacturers_Fillers",
                newName: "Manufacturers_Fillers");

            migrationBuilder.RenameIndex(
                name: "IX_PD_Manufacturers_Fillers_ItemId",
                table: "Manufacturers_Fillers",
                newName: "IX_Manufacturers_Fillers_ItemId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Manufacturers_Fillers",
                table: "Manufacturers_Fillers",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Manufacturers_Fillers_PD_Items_Fillers_ItemId",
                table: "Manufacturers_Fillers",
                column: "ItemId",
                principalTable: "PD_Items_Fillers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
