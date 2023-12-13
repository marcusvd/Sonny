using Microsoft.EntityFrameworkCore.Migrations;

namespace Repository.Migrations
{
    public partial class CHangeFileds : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsRemote",
                table: "BS_BudgetsServices");

            migrationBuilder.AddColumn<int>(
                name: "ExecutionMode",
                table: "BS_BudgetsServices",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ExecutionMode",
                table: "BS_BudgetsServices");

            migrationBuilder.AddColumn<bool>(
                name: "IsRemote",
                table: "BS_BudgetsServices",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);
        }
    }
}
