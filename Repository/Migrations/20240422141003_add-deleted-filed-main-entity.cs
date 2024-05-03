using Microsoft.EntityFrameworkCore.Migrations;

namespace Repository.Migrations
{
    public partial class adddeletedfiledmainentity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Disabled",
                table: "MN_Customers",
                newName: "Deleted");

            migrationBuilder.AddColumn<bool>(
                name: "Deleted",
                table: "MN_Partners",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Deleted",
                table: "MN_Partners");

            migrationBuilder.RenameColumn(
                name: "Deleted",
                table: "MN_Customers",
                newName: "Disabled");
        }
    }
}
