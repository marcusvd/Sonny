using Microsoft.EntityFrameworkCore.Migrations;

namespace Repository.Migrations
{
    public partial class financial2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CardId",
                table: "FN_EssentialExpenses",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_FN_EssentialExpenses_CardId",
                table: "FN_EssentialExpenses",
                column: "CardId");

            migrationBuilder.AddForeignKey(
                name: "FK_FN_EssentialExpenses_FN_Cards_CardId",
                table: "FN_EssentialExpenses",
                column: "CardId",
                principalTable: "FN_Cards",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FN_EssentialExpenses_FN_Cards_CardId",
                table: "FN_EssentialExpenses");

            migrationBuilder.DropIndex(
                name: "IX_FN_EssentialExpenses_CardId",
                table: "FN_EssentialExpenses");

            migrationBuilder.DropColumn(
                name: "CardId",
                table: "FN_EssentialExpenses");
        }
    }
}
