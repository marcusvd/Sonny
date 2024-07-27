using Microsoft.EntityFrameworkCore.Migrations;

namespace Repository.Migrations
{
    public partial class added_subcategory_inside_CategoryExpenses_again : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SubcategoryExpenses_FN_CategoryExpenses_CategoryExpensesId",
                table: "SubcategoryExpenses");

            migrationBuilder.DropPrimaryKey(
                name: "PK_SubcategoryExpenses",
                table: "SubcategoryExpenses");

            migrationBuilder.RenameTable(
                name: "SubcategoryExpenses",
                newName: "FN_SubcategoriesExpenses");

            migrationBuilder.RenameIndex(
                name: "IX_SubcategoryExpenses_CategoryExpensesId",
                table: "FN_SubcategoriesExpenses",
                newName: "IX_FN_SubcategoriesExpenses_CategoryExpensesId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_FN_SubcategoriesExpenses",
                table: "FN_SubcategoriesExpenses",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_FN_SubcategoriesExpenses_FN_CategoryExpenses_CategoryExpense~",
                table: "FN_SubcategoriesExpenses",
                column: "CategoryExpensesId",
                principalTable: "FN_CategoryExpenses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FN_SubcategoriesExpenses_FN_CategoryExpenses_CategoryExpense~",
                table: "FN_SubcategoriesExpenses");

            migrationBuilder.DropPrimaryKey(
                name: "PK_FN_SubcategoriesExpenses",
                table: "FN_SubcategoriesExpenses");

            migrationBuilder.RenameTable(
                name: "FN_SubcategoriesExpenses",
                newName: "SubcategoryExpenses");

            migrationBuilder.RenameIndex(
                name: "IX_FN_SubcategoriesExpenses_CategoryExpensesId",
                table: "SubcategoryExpenses",
                newName: "IX_SubcategoryExpenses_CategoryExpensesId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_SubcategoryExpenses",
                table: "SubcategoryExpenses",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_SubcategoryExpenses_FN_CategoryExpenses_CategoryExpensesId",
                table: "SubcategoryExpenses",
                column: "CategoryExpensesId",
                principalTable: "FN_CategoryExpenses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
