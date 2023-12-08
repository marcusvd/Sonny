using Microsoft.EntityFrameworkCore.Migrations;

namespace Repository.Migrations
{
    public partial class inanc4 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CardId",
                table: "FN_ExpensesNotPredictable",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_FN_ExpensesNotPredictable_CardId",
                table: "FN_ExpensesNotPredictable",
                column: "CardId");

            migrationBuilder.AddForeignKey(
                name: "FK_FN_ExpensesNotPredictable_FN_Cards_CardId",
                table: "FN_ExpensesNotPredictable",
                column: "CardId",
                principalTable: "FN_Cards",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FN_ExpensesNotPredictable_FN_Cards_CardId",
                table: "FN_ExpensesNotPredictable");

            migrationBuilder.DropIndex(
                name: "IX_FN_ExpensesNotPredictable_CardId",
                table: "FN_ExpensesNotPredictable");

            migrationBuilder.DropColumn(
                name: "CardId",
                table: "FN_ExpensesNotPredictable");
        }
    }
}
