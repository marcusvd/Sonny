using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Repository.Migrations
{
    public partial class assasdsaasdfs : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FN_FinancingsAndLoansExpensesInstallments_aspnetUsers_UserId",
                table: "FN_FinancingsAndLoansExpensesInstallments");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "FN_FinancingsAndLoansExpensesInstallments",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "Deleted",
                table: "FN_FinancingsAndLoansExpensesInstallments",
                type: "datetime(6)",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "tinyint(1)");

            migrationBuilder.AlterColumn<DateTime>(
                name: "Deleted",
                table: "FN_FinancingsAndLoansExpenses",
                type: "datetime(6)",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "tinyint(1)");

            migrationBuilder.AddForeignKey(
                name: "FK_FN_FinancingsAndLoansExpensesInstallments_aspnetUsers_UserId",
                table: "FN_FinancingsAndLoansExpensesInstallments",
                column: "UserId",
                principalTable: "aspnetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FN_FinancingsAndLoansExpensesInstallments_aspnetUsers_UserId",
                table: "FN_FinancingsAndLoansExpensesInstallments");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "FN_FinancingsAndLoansExpensesInstallments",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<bool>(
                name: "Deleted",
                table: "FN_FinancingsAndLoansExpensesInstallments",
                type: "tinyint(1)",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime(6)");

            migrationBuilder.AlterColumn<bool>(
                name: "Deleted",
                table: "FN_FinancingsAndLoansExpenses",
                type: "tinyint(1)",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime(6)");

            migrationBuilder.AddForeignKey(
                name: "FK_FN_FinancingsAndLoansExpensesInstallments_aspnetUsers_UserId",
                table: "FN_FinancingsAndLoansExpensesInstallments",
                column: "UserId",
                principalTable: "aspnetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
