using Microsoft.EntityFrameworkCore.Migrations;

namespace Repository.Migrations
{
    public partial class adddeletedfieldcards : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Deleted",
                table: "FN_Cards",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Deleted",
                table: "FN_Cards");
        }
    }
}
