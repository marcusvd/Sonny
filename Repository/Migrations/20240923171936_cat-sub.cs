using Microsoft.EntityFrameworkCore.Migrations;

namespace Repository.Migrations
{
    public partial class catsub : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PayCycle",
                table: "FN_CategoriesExpenses");

            migrationBuilder.AddColumn<int>(
                name: "PayCycle",
                table: "FN_SubcategoriesExpenses",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PayCycle",
                table: "FN_SubcategoriesExpenses");

            migrationBuilder.AddColumn<int>(
                name: "PayCycle",
                table: "FN_CategoriesExpenses",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
