using Microsoft.EntityFrameworkCore.Migrations;

namespace Repository.Migrations
{
    public partial class Developing3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Collect",
                table: "OS_Destinies");

            migrationBuilder.DropColumn(
                name: "Deliver",
                table: "OS_Destinies");

            migrationBuilder.DropColumn(
                name: "Price",
                table: "OS_Destinies");

            migrationBuilder.AddColumn<bool>(
                name: "Collect",
                table: "OS_CollectsDelivers",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "Deliver",
                table: "OS_CollectsDelivers",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "Other",
                table: "OS_CollectsDelivers",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<decimal>(
                name: "Price",
                table: "OS_CollectsDelivers",
                type: "decimal(65,30)",
                nullable: false,
                defaultValue: 0m);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Collect",
                table: "OS_CollectsDelivers");

            migrationBuilder.DropColumn(
                name: "Deliver",
                table: "OS_CollectsDelivers");

            migrationBuilder.DropColumn(
                name: "Other",
                table: "OS_CollectsDelivers");

            migrationBuilder.DropColumn(
                name: "Price",
                table: "OS_CollectsDelivers");

            migrationBuilder.AddColumn<bool>(
                name: "Collect",
                table: "OS_Destinies",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "Deliver",
                table: "OS_Destinies",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<decimal>(
                name: "Price",
                table: "OS_Destinies",
                type: "decimal(65,30)",
                nullable: false,
                defaultValue: 0m);
        }
    }
}
