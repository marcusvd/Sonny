using Microsoft.EntityFrameworkCore.Migrations;

namespace Repository.Migrations
{
    public partial class km : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PD_Quantities_aspnetUsers_ReservedByUserId",
                table: "PD_Quantities");

            migrationBuilder.RenameColumn(
                name: "ReservedByUserId",
                table: "PD_Quantities",
                newName: "ReservedOrSoldByUserId");

            migrationBuilder.RenameIndex(
                name: "IX_PD_Quantities_ReservedByUserId",
                table: "PD_Quantities",
                newName: "IX_PD_Quantities_ReservedOrSoldByUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_PD_Quantities_aspnetUsers_ReservedOrSoldByUserId",
                table: "PD_Quantities",
                column: "ReservedOrSoldByUserId",
                principalTable: "aspnetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PD_Quantities_aspnetUsers_ReservedOrSoldByUserId",
                table: "PD_Quantities");

            migrationBuilder.RenameColumn(
                name: "ReservedOrSoldByUserId",
                table: "PD_Quantities",
                newName: "ReservedByUserId");

            migrationBuilder.RenameIndex(
                name: "IX_PD_Quantities_ReservedOrSoldByUserId",
                table: "PD_Quantities",
                newName: "IX_PD_Quantities_ReservedByUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_PD_Quantities_aspnetUsers_ReservedByUserId",
                table: "PD_Quantities",
                column: "ReservedByUserId",
                principalTable: "aspnetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }
    }
}
