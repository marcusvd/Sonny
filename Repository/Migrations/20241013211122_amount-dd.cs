using Microsoft.EntityFrameworkCore.Migrations;

namespace Repository.Migrations
{
    public partial class amountdd : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "TotalPriceFinancingOrLoan",
                table: "FN_FinancingsAndLoansExpenses",
                type: "decimal(65,30)",
                nullable: false,
                defaultValue: 0m);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TotalPriceFinancingOrLoan",
                table: "FN_FinancingsAndLoansExpenses");
        }
    }
}
