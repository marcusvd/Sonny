using Microsoft.EntityFrameworkCore.Migrations;

namespace Repository.Migrations
{
    public partial class manufacturerLinks : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ManufacturerLink",
                table: "PD_Specificities",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ManufacturerLink",
                table: "PD_Specificities");
        }
    }
}
