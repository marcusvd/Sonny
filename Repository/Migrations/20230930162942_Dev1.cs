using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Repository.Migrations
{
    public partial class Dev1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ApartPrice",
                table: "BS_CollectsDeliversCosts");

            migrationBuilder.DropColumn(
                name: "IsHaveCost",
                table: "BS_CollectsDeliversCosts");

            migrationBuilder.DropColumn(
                name: "BudgetOpen",
                table: "BS_BudgetsServices");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "ApartPrice",
                table: "BS_CollectsDeliversCosts",
                type: "decimal(65,30)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<bool>(
                name: "IsHaveCost",
                table: "BS_CollectsDeliversCosts",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "BudgetOpen",
                table: "BS_BudgetsServices",
                type: "datetime(6)",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }
    }
}
