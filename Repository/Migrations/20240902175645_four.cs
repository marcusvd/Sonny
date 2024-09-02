using Microsoft.EntityFrameworkCore.Migrations;

namespace Repository.Migrations
{
    public partial class four : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LinkCopyBill",
                table: "FN_VariablesExpenses");

            migrationBuilder.DropColumn(
                name: "PASSLinkCopyBill",
                table: "FN_VariablesExpenses");

            migrationBuilder.DropColumn(
                name: "USERLinkCopyBill",
                table: "FN_VariablesExpenses");

            migrationBuilder.DropColumn(
                name: "LinkCopyBill",
                table: "FN_CreditCardExpenses");

            migrationBuilder.DropColumn(
                name: "PASSLinkCopyBill",
                table: "FN_CreditCardExpenses");

            migrationBuilder.DropColumn(
                name: "USERLinkCopyBill",
                table: "FN_CreditCardExpenses");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "LinkCopyBill",
                table: "FN_VariablesExpenses",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "PASSLinkCopyBill",
                table: "FN_VariablesExpenses",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "USERLinkCopyBill",
                table: "FN_VariablesExpenses",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "LinkCopyBill",
                table: "FN_CreditCardExpenses",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "PASSLinkCopyBill",
                table: "FN_CreditCardExpenses",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "USERLinkCopyBill",
                table: "FN_CreditCardExpenses",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");
        }
    }
}
