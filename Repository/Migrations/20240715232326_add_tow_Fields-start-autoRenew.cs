using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Repository.Migrations
{
    public partial class add_tow_FieldsstartautoRenew : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PaidBy",
                table: "FN_ExpensesNotPredictable");

            migrationBuilder.AddColumn<bool>(
                name: "AutoRenew",
                table: "FN_YearlyFixedExpenses",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "Start",
                table: "FN_YearlyFixedExpenses",
                type: "datetime(6)",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AutoRenew",
                table: "FN_YearlyFixedExpenses");

            migrationBuilder.DropColumn(
                name: "Start",
                table: "FN_YearlyFixedExpenses");

            migrationBuilder.AddColumn<int>(
                name: "PaidBy",
                table: "FN_ExpensesNotPredictable",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
