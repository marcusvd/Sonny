using Microsoft.EntityFrameworkCore.Migrations;

namespace Repository.Migrations
{
    public partial class financ4 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CustomerId",
                table: "FN_ExpensesNotPredictable",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_FN_ExpensesNotPredictable_CustomerId",
                table: "FN_ExpensesNotPredictable",
                column: "CustomerId");

            migrationBuilder.AddForeignKey(
                name: "FK_FN_ExpensesNotPredictable_MN_Customers_CustomerId",
                table: "FN_ExpensesNotPredictable",
                column: "CustomerId",
                principalTable: "MN_Customers",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FN_ExpensesNotPredictable_MN_Customers_CustomerId",
                table: "FN_ExpensesNotPredictable");

            migrationBuilder.DropIndex(
                name: "IX_FN_ExpensesNotPredictable_CustomerId",
                table: "FN_ExpensesNotPredictable");

            migrationBuilder.DropColumn(
                name: "CustomerId",
                table: "FN_ExpensesNotPredictable");
        }
    }
}
