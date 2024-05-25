using Microsoft.EntityFrameworkCore.Migrations;

namespace Repository.Migrations
{
    public partial class addedcompanyIdfieldfixedexpensestrackings : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CompanyId",
                table: "FN_FixedExpensesTrackings",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_FN_FixedExpensesTrackings_CompanyId",
                table: "FN_FixedExpensesTrackings",
                column: "CompanyId");

            migrationBuilder.AddForeignKey(
                name: "FK_FN_FixedExpensesTrackings_MN_Companies_CompanyId",
                table: "FN_FixedExpensesTrackings",
                column: "CompanyId",
                principalTable: "MN_Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FN_FixedExpensesTrackings_MN_Companies_CompanyId",
                table: "FN_FixedExpensesTrackings");

            migrationBuilder.DropIndex(
                name: "IX_FN_FixedExpensesTrackings_CompanyId",
                table: "FN_FixedExpensesTrackings");

            migrationBuilder.DropColumn(
                name: "CompanyId",
                table: "FN_FixedExpensesTrackings");
        }
    }
}
