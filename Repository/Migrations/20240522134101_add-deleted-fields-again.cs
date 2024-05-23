using Microsoft.EntityFrameworkCore.Migrations;

namespace Repository.Migrations
{
    public partial class adddeletedfieldsagain : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Deleted",
                table: "SD_socialnetworks",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "Deleted",
                table: "SD_Contacts",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "Deleted",
                table: "SD_Addresses",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "Deleted",
                table: "MN_PhysicallyMovingCosts",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "Deleted",
                table: "MN_Companies",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "Deleted",
                table: "MN_AdditionalCosts",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "Deleted",
                table: "aspnetUsers",
                type: "tinyint(1)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Deleted",
                table: "SD_socialnetworks");

            migrationBuilder.DropColumn(
                name: "Deleted",
                table: "SD_Contacts");

            migrationBuilder.DropColumn(
                name: "Deleted",
                table: "SD_Addresses");

            migrationBuilder.DropColumn(
                name: "Deleted",
                table: "MN_PhysicallyMovingCosts");

            migrationBuilder.DropColumn(
                name: "Deleted",
                table: "MN_Companies");

            migrationBuilder.DropColumn(
                name: "Deleted",
                table: "MN_AdditionalCosts");

            migrationBuilder.DropColumn(
                name: "Deleted",
                table: "aspnetUsers");
        }
    }
}
