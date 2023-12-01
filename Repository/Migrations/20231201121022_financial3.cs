using Microsoft.EntityFrameworkCore.Migrations;

namespace Repository.Migrations
{
    public partial class financial3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FN_EssentialExpenses_FN_Cards_CardId",
                table: "FN_EssentialExpenses");

            migrationBuilder.AlterColumn<int>(
                name: "CardId",
                table: "FN_EssentialExpenses",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_FN_EssentialExpenses_FN_Cards_CardId",
                table: "FN_EssentialExpenses",
                column: "CardId",
                principalTable: "FN_Cards",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FN_EssentialExpenses_FN_Cards_CardId",
                table: "FN_EssentialExpenses");

            migrationBuilder.AlterColumn<int>(
                name: "CardId",
                table: "FN_EssentialExpenses",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_FN_EssentialExpenses_FN_Cards_CardId",
                table: "FN_EssentialExpenses",
                column: "CardId",
                principalTable: "FN_Cards",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
