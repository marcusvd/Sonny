using Microsoft.EntityFrameworkCore.Migrations;

namespace Repository.Migrations
{
    public partial class NayLindeza : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PartnerType",
                table: "MN_Partners",
                newName: "PartnerBusiness");

            migrationBuilder.RenameColumn(
                name: "CustomerType",
                table: "MN_Customers",
                newName: "EntityType");

            migrationBuilder.AddColumn<int>(
                name: "EntityType",
                table: "MN_Partners",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EntityType",
                table: "MN_Partners");

            migrationBuilder.RenameColumn(
                name: "PartnerBusiness",
                table: "MN_Partners",
                newName: "PartnerType");

            migrationBuilder.RenameColumn(
                name: "EntityType",
                table: "MN_Customers",
                newName: "CustomerType");
        }
    }
}
