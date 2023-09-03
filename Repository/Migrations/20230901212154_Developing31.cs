using Microsoft.EntityFrameworkCore.Migrations;

namespace Repository.Migrations
{
    public partial class Developing31 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AmountPrice",
                table: "OS_BillingsFroms");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "AmountPrice",
                table: "OS_BillingsFroms",
                type: "decimal(65,30)",
                nullable: false,
                defaultValue: 0m);
        }
    }
}
