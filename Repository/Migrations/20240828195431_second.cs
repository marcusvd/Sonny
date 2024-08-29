using Microsoft.EntityFrameworkCore.Migrations;

namespace Repository.Migrations
{
    public partial class second : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "TypeOfExpense",
                table: "FN_CategoriesExpenses",
                newName: "PayCycle");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PayCycle",
                table: "FN_CategoriesExpenses",
                newName: "TypeOfExpense");
        }
    }
}
