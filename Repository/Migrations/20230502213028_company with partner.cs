using Microsoft.EntityFrameworkCore.Migrations;

namespace Repository.Migrations
{
    public partial class companywithpartner : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CompanyId",
                table: "Partners",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Partners_CompanyId",
                table: "Partners",
                column: "CompanyId");

            migrationBuilder.AddForeignKey(
                name: "FK_Partners_Companies_CompanyId",
                table: "Partners",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Partners_Companies_CompanyId",
                table: "Partners");

            migrationBuilder.DropIndex(
                name: "IX_Partners_CompanyId",
                table: "Partners");

            migrationBuilder.DropColumn(
                name: "CompanyId",
                table: "Partners");
        }
    }
}
