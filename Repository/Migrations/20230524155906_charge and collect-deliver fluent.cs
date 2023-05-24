using Microsoft.EntityFrameworkCore.Migrations;

namespace Repository.Migrations
{
    public partial class chargeandcollectdeliverfluent : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ChargeForm_Customers_CustomerId",
                table: "ChargeForm");

            migrationBuilder.DropForeignKey(
                name: "FK_ChargeForm_Partners_PartnerId",
                table: "ChargeForm");

            migrationBuilder.AddForeignKey(
                name: "FK_ChargeForm_Customers_CustomerId",
                table: "ChargeForm",
                column: "CustomerId",
                principalTable: "Customers",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_ChargeForm_Partners_PartnerId",
                table: "ChargeForm",
                column: "PartnerId",
                principalTable: "Partners",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ChargeForm_Customers_CustomerId",
                table: "ChargeForm");

            migrationBuilder.DropForeignKey(
                name: "FK_ChargeForm_Partners_PartnerId",
                table: "ChargeForm");

            migrationBuilder.AddForeignKey(
                name: "FK_ChargeForm_Customers_CustomerId",
                table: "ChargeForm",
                column: "CustomerId",
                principalTable: "Customers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ChargeForm_Partners_PartnerId",
                table: "ChargeForm",
                column: "PartnerId",
                principalTable: "Partners",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
