﻿using Microsoft.EntityFrameworkCore.Migrations;

namespace Repository.Migrations
{
    public partial class pixesExpensesentitiesFinancing : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "FinancingAndLoanExpenseId",
                table: "FN_PixExpenses",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "MonthlyFixedExpenseId",
                table: "FN_PixExpenses",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "VariableExpenseId",
                table: "FN_PixExpenses",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "YearlyFixedExpenseId",
                table: "FN_PixExpenses",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_FN_PixExpenses_FinancingAndLoanExpenseId",
                table: "FN_PixExpenses",
                column: "FinancingAndLoanExpenseId");

            migrationBuilder.CreateIndex(
                name: "IX_FN_PixExpenses_MonthlyFixedExpenseId",
                table: "FN_PixExpenses",
                column: "MonthlyFixedExpenseId");

            migrationBuilder.CreateIndex(
                name: "IX_FN_PixExpenses_VariableExpenseId",
                table: "FN_PixExpenses",
                column: "VariableExpenseId");

            migrationBuilder.CreateIndex(
                name: "IX_FN_PixExpenses_YearlyFixedExpenseId",
                table: "FN_PixExpenses",
                column: "YearlyFixedExpenseId");

            migrationBuilder.AddForeignKey(
                name: "FK_FN_PixExpenses_FN_FinancingsAndLoansExpenses_FinancingAndLoa~",
                table: "FN_PixExpenses",
                column: "FinancingAndLoanExpenseId",
                principalTable: "FN_FinancingsAndLoansExpenses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_FN_PixExpenses_FN_MonthlyFixedExpenses_MonthlyFixedExpenseId",
                table: "FN_PixExpenses",
                column: "MonthlyFixedExpenseId",
                principalTable: "FN_MonthlyFixedExpenses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_FN_PixExpenses_FN_VariablesExpenses_VariableExpenseId",
                table: "FN_PixExpenses",
                column: "VariableExpenseId",
                principalTable: "FN_VariablesExpenses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_FN_PixExpenses_FN_YearlyFixedExpenses_YearlyFixedExpenseId",
                table: "FN_PixExpenses",
                column: "YearlyFixedExpenseId",
                principalTable: "FN_YearlyFixedExpenses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FN_PixExpenses_FN_FinancingsAndLoansExpenses_FinancingAndLoa~",
                table: "FN_PixExpenses");

            migrationBuilder.DropForeignKey(
                name: "FK_FN_PixExpenses_FN_MonthlyFixedExpenses_MonthlyFixedExpenseId",
                table: "FN_PixExpenses");

            migrationBuilder.DropForeignKey(
                name: "FK_FN_PixExpenses_FN_VariablesExpenses_VariableExpenseId",
                table: "FN_PixExpenses");

            migrationBuilder.DropForeignKey(
                name: "FK_FN_PixExpenses_FN_YearlyFixedExpenses_YearlyFixedExpenseId",
                table: "FN_PixExpenses");

            migrationBuilder.DropIndex(
                name: "IX_FN_PixExpenses_FinancingAndLoanExpenseId",
                table: "FN_PixExpenses");

            migrationBuilder.DropIndex(
                name: "IX_FN_PixExpenses_MonthlyFixedExpenseId",
                table: "FN_PixExpenses");

            migrationBuilder.DropIndex(
                name: "IX_FN_PixExpenses_VariableExpenseId",
                table: "FN_PixExpenses");

            migrationBuilder.DropIndex(
                name: "IX_FN_PixExpenses_YearlyFixedExpenseId",
                table: "FN_PixExpenses");

            migrationBuilder.DropColumn(
                name: "FinancingAndLoanExpenseId",
                table: "FN_PixExpenses");

            migrationBuilder.DropColumn(
                name: "MonthlyFixedExpenseId",
                table: "FN_PixExpenses");

            migrationBuilder.DropColumn(
                name: "VariableExpenseId",
                table: "FN_PixExpenses");

            migrationBuilder.DropColumn(
                name: "YearlyFixedExpenseId",
                table: "FN_PixExpenses");
        }
    }
}
