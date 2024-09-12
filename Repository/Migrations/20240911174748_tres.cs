using Microsoft.EntityFrameworkCore.Migrations;

namespace Repository.Migrations
{
    public partial class tres : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CreditCardLimitOperation_aspnetUsers_UserId",
                table: "CreditCardLimitOperation");

            migrationBuilder.DropForeignKey(
                name: "FK_CreditCardLimitOperation_FN_Cards_CardId",
                table: "CreditCardLimitOperation");

            migrationBuilder.DropForeignKey(
                name: "FK_CreditCardLimitOperation_MN_Companies_CompanyId",
                table: "CreditCardLimitOperation");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CreditCardLimitOperation",
                table: "CreditCardLimitOperation");

            migrationBuilder.RenameTable(
                name: "CreditCardLimitOperation",
                newName: "FN_CreditCardLimitOperations");

            migrationBuilder.RenameIndex(
                name: "IX_CreditCardLimitOperation_UserId",
                table: "FN_CreditCardLimitOperations",
                newName: "IX_FN_CreditCardLimitOperations_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_CreditCardLimitOperation_CompanyId",
                table: "FN_CreditCardLimitOperations",
                newName: "IX_FN_CreditCardLimitOperations_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_CreditCardLimitOperation_CardId",
                table: "FN_CreditCardLimitOperations",
                newName: "IX_FN_CreditCardLimitOperations_CardId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_FN_CreditCardLimitOperations",
                table: "FN_CreditCardLimitOperations",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_FN_CreditCardLimitOperations_aspnetUsers_UserId",
                table: "FN_CreditCardLimitOperations",
                column: "UserId",
                principalTable: "aspnetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_FN_CreditCardLimitOperations_FN_Cards_CardId",
                table: "FN_CreditCardLimitOperations",
                column: "CardId",
                principalTable: "FN_Cards",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_FN_CreditCardLimitOperations_MN_Companies_CompanyId",
                table: "FN_CreditCardLimitOperations",
                column: "CompanyId",
                principalTable: "MN_Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FN_CreditCardLimitOperations_aspnetUsers_UserId",
                table: "FN_CreditCardLimitOperations");

            migrationBuilder.DropForeignKey(
                name: "FK_FN_CreditCardLimitOperations_FN_Cards_CardId",
                table: "FN_CreditCardLimitOperations");

            migrationBuilder.DropForeignKey(
                name: "FK_FN_CreditCardLimitOperations_MN_Companies_CompanyId",
                table: "FN_CreditCardLimitOperations");

            migrationBuilder.DropPrimaryKey(
                name: "PK_FN_CreditCardLimitOperations",
                table: "FN_CreditCardLimitOperations");

            migrationBuilder.RenameTable(
                name: "FN_CreditCardLimitOperations",
                newName: "CreditCardLimitOperation");

            migrationBuilder.RenameIndex(
                name: "IX_FN_CreditCardLimitOperations_UserId",
                table: "CreditCardLimitOperation",
                newName: "IX_CreditCardLimitOperation_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_FN_CreditCardLimitOperations_CompanyId",
                table: "CreditCardLimitOperation",
                newName: "IX_CreditCardLimitOperation_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_FN_CreditCardLimitOperations_CardId",
                table: "CreditCardLimitOperation",
                newName: "IX_CreditCardLimitOperation_CardId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CreditCardLimitOperation",
                table: "CreditCardLimitOperation",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_CreditCardLimitOperation_aspnetUsers_UserId",
                table: "CreditCardLimitOperation",
                column: "UserId",
                principalTable: "aspnetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_CreditCardLimitOperation_FN_Cards_CardId",
                table: "CreditCardLimitOperation",
                column: "CardId",
                principalTable: "FN_Cards",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CreditCardLimitOperation_MN_Companies_CompanyId",
                table: "CreditCardLimitOperation",
                column: "CompanyId",
                principalTable: "MN_Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
