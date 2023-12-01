using Microsoft.EntityFrameworkCore.Migrations;

namespace Repository.Migrations
{
    public partial class financial1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "NameIdentification",
                table: "FN_Expenses",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NameIdentification",
                table: "FN_Expenses");
        }
    }
}
