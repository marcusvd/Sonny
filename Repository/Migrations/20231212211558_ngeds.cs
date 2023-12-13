using Microsoft.EntityFrameworkCore.Migrations;

namespace Repository.Migrations
{
    public partial class ngeds : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MN_Customers_AdditionalCosts_AdditionalCostsId",
                table: "MN_Customers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_AdditionalCosts",
                table: "AdditionalCosts");

            migrationBuilder.RenameTable(
                name: "AdditionalCosts",
                newName: "MN_AdditionalCosts");

            migrationBuilder.AddPrimaryKey(
                name: "PK_MN_AdditionalCosts",
                table: "MN_AdditionalCosts",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_MN_Customers_MN_AdditionalCosts_AdditionalCostsId",
                table: "MN_Customers",
                column: "AdditionalCostsId",
                principalTable: "MN_AdditionalCosts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MN_Customers_MN_AdditionalCosts_AdditionalCostsId",
                table: "MN_Customers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_MN_AdditionalCosts",
                table: "MN_AdditionalCosts");

            migrationBuilder.RenameTable(
                name: "MN_AdditionalCosts",
                newName: "AdditionalCosts");

            migrationBuilder.AddPrimaryKey(
                name: "PK_AdditionalCosts",
                table: "AdditionalCosts",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_MN_Customers_AdditionalCosts_AdditionalCostsId",
                table: "MN_Customers",
                column: "AdditionalCostsId",
                principalTable: "AdditionalCosts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
