using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Repository.Migrations
{
    public partial class sdfs : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "Deleted",
                table: "FN_SubcategoriesExpenses",
                type: "datetime(6)",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "tinyint(1)");

            migrationBuilder.AddColumn<int>(
                name: "CompanyId",
                table: "FN_SubcategoriesExpenses",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "Registered",
                table: "FN_SubcategoriesExpenses",
                type: "datetime(6)",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "FN_SubcategoriesExpenses",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<DateTime>(
                name: "Deleted",
                table: "FN_CategoriesExpenses",
                type: "datetime(6)",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "tinyint(1)");

            migrationBuilder.AddColumn<DateTime>(
                name: "Registered",
                table: "FN_CategoriesExpenses",
                type: "datetime(6)",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "FN_CategoriesExpenses",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_FN_CategoriesExpenses_UserId",
                table: "FN_CategoriesExpenses",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_FN_CategoriesExpenses_aspnetUsers_UserId",
                table: "FN_CategoriesExpenses",
                column: "UserId",
                principalTable: "aspnetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FN_CategoriesExpenses_aspnetUsers_UserId",
                table: "FN_CategoriesExpenses");

            migrationBuilder.DropIndex(
                name: "IX_FN_CategoriesExpenses_UserId",
                table: "FN_CategoriesExpenses");

            migrationBuilder.DropColumn(
                name: "CompanyId",
                table: "FN_SubcategoriesExpenses");

            migrationBuilder.DropColumn(
                name: "Registered",
                table: "FN_SubcategoriesExpenses");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "FN_SubcategoriesExpenses");

            migrationBuilder.DropColumn(
                name: "Registered",
                table: "FN_CategoriesExpenses");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "FN_CategoriesExpenses");

            migrationBuilder.AlterColumn<bool>(
                name: "Deleted",
                table: "FN_SubcategoriesExpenses",
                type: "tinyint(1)",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime(6)");

            migrationBuilder.AlterColumn<bool>(
                name: "Deleted",
                table: "FN_CategoriesExpenses",
                type: "tinyint(1)",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime(6)");
        }
    }
}
