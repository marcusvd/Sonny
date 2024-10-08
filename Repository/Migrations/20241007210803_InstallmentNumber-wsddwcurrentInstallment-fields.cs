using Microsoft.EntityFrameworkCore.Migrations;

namespace Repository.Migrations
{
    public partial class InstallmentNumberwsddwcurrentInstallmentfields : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "InvoiceId",
                table: "FN_CreditCardExpensesInvoices",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "InvoiceId",
                table: "FN_CreditCardExpensesInvoices");
        }
    }
}
