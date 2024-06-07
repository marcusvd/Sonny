using Microsoft.EntityFrameworkCore.Migrations;

namespace Repository.Migrations
{
    public partial class migration3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PaidBy",
                table: "FN_FixedExpensesTrackings",
                newName: "PixId");

            migrationBuilder.CreateIndex(
                name: "IX_FN_FixedExpensesTrackings_PixId",
                table: "FN_FixedExpensesTrackings",
                column: "PixId");

            migrationBuilder.AddForeignKey(
                name: "FK_FN_FixedExpensesTrackings_FN_Pixes_PixId",
                table: "FN_FixedExpensesTrackings",
                column: "PixId",
                principalTable: "FN_Pixes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FN_FixedExpensesTrackings_FN_Pixes_PixId",
                table: "FN_FixedExpensesTrackings");

            migrationBuilder.DropIndex(
                name: "IX_FN_FixedExpensesTrackings_PixId",
                table: "FN_FixedExpensesTrackings");

            migrationBuilder.RenameColumn(
                name: "PixId",
                table: "FN_FixedExpensesTrackings",
                newName: "PaidBy");
        }
    }
}
