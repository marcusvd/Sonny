using Microsoft.EntityFrameworkCore.Migrations;

namespace Repository.Migrations
{
    public partial class ujfytfhdfs : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "InstallmentNumber",
                table: "FN_CreditCardExpenses",
                newName: "InstallmentsQuantity");

            migrationBuilder.AddColumn<decimal>(
                name: "PaymentAtSight",
                table: "FN_CreditCardExpenses",
                type: "decimal(65,30)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "TotalPercentageInterest",
                table: "FN_CreditCardExpenses",
                type: "decimal(65,30)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "TotalPriceInterest",
                table: "FN_CreditCardExpenses",
                type: "decimal(65,30)",
                nullable: false,
                defaultValue: 0m);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PaymentAtSight",
                table: "FN_CreditCardExpenses");

            migrationBuilder.DropColumn(
                name: "TotalPercentageInterest",
                table: "FN_CreditCardExpenses");

            migrationBuilder.DropColumn(
                name: "TotalPriceInterest",
                table: "FN_CreditCardExpenses");

            migrationBuilder.RenameColumn(
                name: "InstallmentsQuantity",
                table: "FN_CreditCardExpenses",
                newName: "InstallmentNumber");
        }
    }
}
