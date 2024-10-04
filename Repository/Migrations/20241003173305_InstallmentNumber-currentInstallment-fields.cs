using Microsoft.EntityFrameworkCore.Migrations;

namespace Repository.Migrations
{
    public partial class InstallmentNumbercurrentInstallmentfields : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CurrentInstallment",
                table: "FN_FinancingsAndLoansExpenses",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "InstallmentId",
                table: "FN_FinancingsAndLoansExpenses",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<int>(
                name: "InstallmentNumber",
                table: "FN_FinancingsAndLoansExpenses",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CurrentInstallment",
                table: "FN_FinancingsAndLoansExpenses");

            migrationBuilder.DropColumn(
                name: "InstallmentId",
                table: "FN_FinancingsAndLoansExpenses");

            migrationBuilder.DropColumn(
                name: "InstallmentNumber",
                table: "FN_FinancingsAndLoansExpenses");
        }
    }
}
