using Microsoft.EntityFrameworkCore.Migrations;

namespace Repository.Migrations
{
    public partial class second : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "SubcategoryExpensesId",
                table: "FN_YearlyFixedExpenses",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_FN_YearlyFixedExpenses_SubcategoryExpensesId",
                table: "FN_YearlyFixedExpenses",
                column: "SubcategoryExpensesId");

            migrationBuilder.AddForeignKey(
                name: "FK_FN_YearlyFixedExpenses_FN_SubcategoriesExpenses_SubcategoryE~",
                table: "FN_YearlyFixedExpenses",
                column: "SubcategoryExpensesId",
                principalTable: "FN_SubcategoriesExpenses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FN_YearlyFixedExpenses_FN_SubcategoriesExpenses_SubcategoryE~",
                table: "FN_YearlyFixedExpenses");

            migrationBuilder.DropIndex(
                name: "IX_FN_YearlyFixedExpenses_SubcategoryExpensesId",
                table: "FN_YearlyFixedExpenses");

            migrationBuilder.DropColumn(
                name: "SubcategoryExpensesId",
                table: "FN_YearlyFixedExpenses");
        }
    }
}
