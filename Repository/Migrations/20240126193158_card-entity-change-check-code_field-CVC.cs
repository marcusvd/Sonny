using Microsoft.EntityFrameworkCore.Migrations;

namespace Repository.Migrations
{
    public partial class cardentitychangecheckcode_fieldCVC : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "CheckCode",
                table: "FN_Cards",
                newName: "CVC");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "CVC",
                table: "FN_Cards",
                newName: "CheckCode");
        }
    }
}
