using Microsoft.EntityFrameworkCore.Migrations;

namespace Repository.Migrations
{
    public partial class deletedfiledagainname_diferentex : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Deleted",
                table: "PD_Items_Fillers",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Deleted",
                table: "PD_Items_Fillers");
        }
    }
}
