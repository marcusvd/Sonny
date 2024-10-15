using Microsoft.EntityFrameworkCore.Migrations;

namespace Repository.Migrations
{
    public partial class fasdss : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Closed",
                table: "FN_FinancingsAndLoansExpenses",
                newName: "WasPaid");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "WasPaid",
                table: "FN_FinancingsAndLoansExpenses",
                newName: "Closed");
        }
    }
}
