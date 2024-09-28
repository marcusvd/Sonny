using Microsoft.EntityFrameworkCore.Migrations;

namespace Repository.Migrations
{
    public partial class currentInstallmentfieldcreditcardexpenses : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CurrentInstallment",
                table: "FN_CreditCardExpenses",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CurrentInstallment",
                table: "FN_CreditCardExpenses");
        }
    }
}
