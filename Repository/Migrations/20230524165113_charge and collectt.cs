using Microsoft.EntityFrameworkCore.Migrations;

namespace Repository.Migrations
{
    public partial class chargeandcollectt : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ChargeForm_Customers_CustomerId",
                table: "ChargeForm");

            migrationBuilder.DropForeignKey(
                name: "FK_ChargeForm_Partners_PartnerId",
                table: "ChargeForm");

            migrationBuilder.DropIndex(
                name: "IX_ChargeForm_CustomerId",
                table: "ChargeForm");

            migrationBuilder.DropIndex(
                name: "IX_ChargeForm_PartnerId",
                table: "ChargeForm");

            migrationBuilder.CreateIndex(
                name: "IX_ChargeForm_CustomerId",
                table: "ChargeForm",
                column: "CustomerId");

            migrationBuilder.CreateIndex(
                name: "IX_ChargeForm_PartnerId",
                table: "ChargeForm",
                column: "PartnerId");

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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ChargeForm_Customers_CustomerId",
                table: "ChargeForm");

            migrationBuilder.DropForeignKey(
                name: "FK_ChargeForm_Partners_PartnerId",
                table: "ChargeForm");

            migrationBuilder.DropIndex(
                name: "IX_ChargeForm_CustomerId",
                table: "ChargeForm");

            migrationBuilder.DropIndex(
                name: "IX_ChargeForm_PartnerId",
                table: "ChargeForm");

            migrationBuilder.CreateIndex(
                name: "IX_ChargeForm_CustomerId",
                table: "ChargeForm",
                column: "CustomerId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_ChargeForm_PartnerId",
                table: "ChargeForm",
                column: "PartnerId",
                unique: true);

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
    }
}
