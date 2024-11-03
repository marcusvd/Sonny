using Microsoft.EntityFrameworkCore.Migrations;

namespace Repository.Migrations
{
    public partial class amountddddcddddddhanged : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "Interest",
                table: "FN_PixExpenses",
                type: "decimal(65,30)",
                nullable: false,
                defaultValue: 0m);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Interest",
                table: "FN_PixExpenses");
        }
    }
}
