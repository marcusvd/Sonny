using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Repository.Migrations
{
    public partial class Ddsaasdfs : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FN_MonthlyFixedExpenses_aspnetUsers_UserId",
                table: "FN_MonthlyFixedExpenses");

            migrationBuilder.DropForeignKey(
                name: "FK_FN_VariablesExpenses_aspnetUsers_UserId",
                table: "FN_VariablesExpenses");

            migrationBuilder.DropForeignKey(
                name: "FK_FN_YearlyFixedExpenses_aspnetUsers_UserId",
                table: "FN_YearlyFixedExpenses");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "FN_YearlyFixedExpenses",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "Deleted",
                table: "FN_YearlyFixedExpenses",
                type: "datetime(6)",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "tinyint(1)");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "FN_VariablesExpenses",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "Deleted",
                table: "FN_VariablesExpenses",
                type: "datetime(6)",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "tinyint(1)");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "FN_MonthlyFixedExpenses",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "Deleted",
                table: "FN_MonthlyFixedExpenses",
                type: "datetime(6)",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "tinyint(1)");

            migrationBuilder.AddForeignKey(
                name: "FK_FN_MonthlyFixedExpenses_aspnetUsers_UserId",
                table: "FN_MonthlyFixedExpenses",
                column: "UserId",
                principalTable: "aspnetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_FN_VariablesExpenses_aspnetUsers_UserId",
                table: "FN_VariablesExpenses",
                column: "UserId",
                principalTable: "aspnetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_FN_YearlyFixedExpenses_aspnetUsers_UserId",
                table: "FN_YearlyFixedExpenses",
                column: "UserId",
                principalTable: "aspnetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FN_MonthlyFixedExpenses_aspnetUsers_UserId",
                table: "FN_MonthlyFixedExpenses");

            migrationBuilder.DropForeignKey(
                name: "FK_FN_VariablesExpenses_aspnetUsers_UserId",
                table: "FN_VariablesExpenses");

            migrationBuilder.DropForeignKey(
                name: "FK_FN_YearlyFixedExpenses_aspnetUsers_UserId",
                table: "FN_YearlyFixedExpenses");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "FN_YearlyFixedExpenses",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<bool>(
                name: "Deleted",
                table: "FN_YearlyFixedExpenses",
                type: "tinyint(1)",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime(6)");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "FN_VariablesExpenses",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<bool>(
                name: "Deleted",
                table: "FN_VariablesExpenses",
                type: "tinyint(1)",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime(6)");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "FN_MonthlyFixedExpenses",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<bool>(
                name: "Deleted",
                table: "FN_MonthlyFixedExpenses",
                type: "tinyint(1)",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime(6)");

            migrationBuilder.AddForeignKey(
                name: "FK_FN_MonthlyFixedExpenses_aspnetUsers_UserId",
                table: "FN_MonthlyFixedExpenses",
                column: "UserId",
                principalTable: "aspnetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_FN_VariablesExpenses_aspnetUsers_UserId",
                table: "FN_VariablesExpenses",
                column: "UserId",
                principalTable: "aspnetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_FN_YearlyFixedExpenses_aspnetUsers_UserId",
                table: "FN_YearlyFixedExpenses",
                column: "UserId",
                principalTable: "aspnetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
