using Microsoft.EntityFrameworkCore.Migrations;

namespace Repository.Migrations
{
    public partial class amountchanged : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "AmountPrice",
                table: "FN_CreditCardExpensesInvoices",
                newName: "Price");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Price",
                table: "FN_CreditCardExpensesInvoices",
                newName: "AmountPrice");
        }
    }
}
