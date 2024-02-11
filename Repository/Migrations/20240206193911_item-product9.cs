using Microsoft.EntityFrameworkCore.Migrations;

namespace Repository.Migrations
{
    public partial class itemproduct9 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "PD_Items_Fillers");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "PD_Models_Fillers",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "PD_Models_Fillers");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "PD_Items_Fillers",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");
        }
    }
}
