using Microsoft.EntityFrameworkCore.Migrations;

namespace Repository.Migrations
{
    public partial class lToAnother : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Capacity",
                table: "PD_Specificities");

            migrationBuilder.DropColumn(
                name: "Generation",
                table: "PD_Specificities");

            migrationBuilder.DropColumn(
                name: "Speed",
                table: "PD_Specificities");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Capacity",
                table: "PD_Specificities",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "Generation",
                table: "PD_Specificities",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "Speed",
                table: "PD_Specificities",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");
        }
    }
}
