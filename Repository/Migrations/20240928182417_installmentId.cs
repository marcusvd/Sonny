using Microsoft.EntityFrameworkCore.Migrations;

namespace Repository.Migrations
{
    public partial class installmentId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "InstallmentId",
                table: "FN_CreditCardExpenses",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "InstallmentId",
                table: "FN_CreditCardExpenses");
        }
    }
}
