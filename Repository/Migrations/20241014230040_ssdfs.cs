using Microsoft.EntityFrameworkCore.Migrations;

namespace Repository.Migrations
{
    public partial class ssdfs : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LateFee",
                table: "FN_FinancingsAndLoansExpenses");

            migrationBuilder.DropColumn(
                name: "LateFeeDaily",
                table: "FN_FinancingsAndLoansExpenses");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "LateFee",
                table: "FN_FinancingsAndLoansExpenses",
                type: "decimal(65,30)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "LateFeeDaily",
                table: "FN_FinancingsAndLoansExpenses",
                type: "decimal(65,30)",
                nullable: false,
                defaultValue: 0m);
        }
    }
}
