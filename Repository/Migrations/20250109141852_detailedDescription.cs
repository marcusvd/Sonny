using Microsoft.EntityFrameworkCore.Migrations;

namespace Repository.Migrations
{
    public partial class detailedDescription : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Version",
                table: "PD_Specificities",
                newName: "DetailedDescription");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "DetailedDescription",
                table: "PD_Specificities",
                newName: "Version");
        }
    }
}
