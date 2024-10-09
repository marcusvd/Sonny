using Microsoft.EntityFrameworkCore.Migrations;

namespace Repository.Migrations
{
    public partial class rentInstallmentfields : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FN_PixExpenses_FN_Pixes_PixOutId",
                table: "FN_PixExpenses");

            migrationBuilder.RenameColumn(
                name: "BenefitedPix",
                table: "FN_PixExpenses",
                newName: "BenefitedKey");

            migrationBuilder.AlterColumn<int>(
                name: "PixOutId",
                table: "FN_PixExpenses",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_FN_PixExpenses_FN_Pixes_PixOutId",
                table: "FN_PixExpenses",
                column: "PixOutId",
                principalTable: "FN_Pixes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FN_PixExpenses_FN_Pixes_PixOutId",
                table: "FN_PixExpenses");

            migrationBuilder.RenameColumn(
                name: "BenefitedKey",
                table: "FN_PixExpenses",
                newName: "BenefitedPix");

            migrationBuilder.AlterColumn<int>(
                name: "PixOutId",
                table: "FN_PixExpenses",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_FN_PixExpenses_FN_Pixes_PixOutId",
                table: "FN_PixExpenses",
                column: "PixOutId",
                principalTable: "FN_Pixes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
