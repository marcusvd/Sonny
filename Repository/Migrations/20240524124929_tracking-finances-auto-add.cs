using Microsoft.EntityFrameworkCore.Migrations;

namespace Repository.Migrations
{
    public partial class trackingfinancesautoadd : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FN_FixedExpensesTrackings_aspnetUsers_UserId",
                table: "FN_FixedExpensesTrackings");

            migrationBuilder.DropForeignKey(
                name: "FK_FN_FixedExpensesTrackings_FN_BankAccount_BankAccountId",
                table: "FN_FixedExpensesTrackings");

            migrationBuilder.DropForeignKey(
                name: "FK_FN_FixedExpensesTrackings_FN_FixedExpenses_ExpensesId",
                table: "FN_FixedExpensesTrackings");

            migrationBuilder.RenameColumn(
                name: "ExpensesId",
                table: "FN_FixedExpensesTrackings",
                newName: "FixedExpensesId");

            migrationBuilder.RenameIndex(
                name: "IX_FN_FixedExpensesTrackings_ExpensesId",
                table: "FN_FixedExpensesTrackings",
                newName: "IX_FN_FixedExpensesTrackings_FixedExpensesId");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "FN_FixedExpensesTrackings",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "PaidBy",
                table: "FN_FixedExpensesTrackings",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "BankAccountId",
                table: "FN_FixedExpensesTrackings",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_FN_FixedExpensesTrackings_aspnetUsers_UserId",
                table: "FN_FixedExpensesTrackings",
                column: "UserId",
                principalTable: "aspnetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_FN_FixedExpensesTrackings_FN_BankAccount_BankAccountId",
                table: "FN_FixedExpensesTrackings",
                column: "BankAccountId",
                principalTable: "FN_BankAccount",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_FN_FixedExpensesTrackings_FN_FixedExpenses_FixedExpensesId",
                table: "FN_FixedExpensesTrackings",
                column: "FixedExpensesId",
                principalTable: "FN_FixedExpenses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FN_FixedExpensesTrackings_aspnetUsers_UserId",
                table: "FN_FixedExpensesTrackings");

            migrationBuilder.DropForeignKey(
                name: "FK_FN_FixedExpensesTrackings_FN_BankAccount_BankAccountId",
                table: "FN_FixedExpensesTrackings");

            migrationBuilder.DropForeignKey(
                name: "FK_FN_FixedExpensesTrackings_FN_FixedExpenses_FixedExpensesId",
                table: "FN_FixedExpensesTrackings");

            migrationBuilder.RenameColumn(
                name: "FixedExpensesId",
                table: "FN_FixedExpensesTrackings",
                newName: "ExpensesId");

            migrationBuilder.RenameIndex(
                name: "IX_FN_FixedExpensesTrackings_FixedExpensesId",
                table: "FN_FixedExpensesTrackings",
                newName: "IX_FN_FixedExpensesTrackings_ExpensesId");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "FN_FixedExpensesTrackings",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "PaidBy",
                table: "FN_FixedExpensesTrackings",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "BankAccountId",
                table: "FN_FixedExpensesTrackings",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_FN_FixedExpensesTrackings_aspnetUsers_UserId",
                table: "FN_FixedExpensesTrackings",
                column: "UserId",
                principalTable: "aspnetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_FN_FixedExpensesTrackings_FN_BankAccount_BankAccountId",
                table: "FN_FixedExpensesTrackings",
                column: "BankAccountId",
                principalTable: "FN_BankAccount",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_FN_FixedExpensesTrackings_FN_FixedExpenses_ExpensesId",
                table: "FN_FixedExpensesTrackings",
                column: "ExpensesId",
                principalTable: "FN_FixedExpenses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
