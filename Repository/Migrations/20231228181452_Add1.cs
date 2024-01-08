using Microsoft.EntityFrameworkCore.Migrations;

namespace Repository.Migrations
{
    public partial class Add1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MN_PaymentsData_MN_Partners_PartnerId",
                table: "MN_PaymentsData");

            migrationBuilder.DropIndex(
                name: "IX_MN_PaymentsData_PartnerId",
                table: "MN_PaymentsData");

            migrationBuilder.DropColumn(
                name: "PartnerId",
                table: "MN_PaymentsData");

            migrationBuilder.RenameColumn(
                name: "PaymentName",
                table: "MN_PaymentsData",
                newName: "Pix");

            migrationBuilder.RenameColumn(
                name: "Payment",
                table: "MN_PaymentsData",
                newName: "Others");

            migrationBuilder.AddColumn<string>(
                name: "BankAccount",
                table: "MN_PaymentsData",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<bool>(
                name: "Money",
                table: "MN_PaymentsData",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "PaymentsDataId",
                table: "MN_Partners",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_MN_Partners_PaymentsDataId",
                table: "MN_Partners",
                column: "PaymentsDataId");

            migrationBuilder.AddForeignKey(
                name: "FK_MN_Partners_MN_PaymentsData_PaymentsDataId",
                table: "MN_Partners",
                column: "PaymentsDataId",
                principalTable: "MN_PaymentsData",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MN_Partners_MN_PaymentsData_PaymentsDataId",
                table: "MN_Partners");

            migrationBuilder.DropIndex(
                name: "IX_MN_Partners_PaymentsDataId",
                table: "MN_Partners");

            migrationBuilder.DropColumn(
                name: "BankAccount",
                table: "MN_PaymentsData");

            migrationBuilder.DropColumn(
                name: "Money",
                table: "MN_PaymentsData");

            migrationBuilder.DropColumn(
                name: "PaymentsDataId",
                table: "MN_Partners");

            migrationBuilder.RenameColumn(
                name: "Pix",
                table: "MN_PaymentsData",
                newName: "PaymentName");

            migrationBuilder.RenameColumn(
                name: "Others",
                table: "MN_PaymentsData",
                newName: "Payment");

            migrationBuilder.AddColumn<int>(
                name: "PartnerId",
                table: "MN_PaymentsData",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_MN_PaymentsData_PartnerId",
                table: "MN_PaymentsData",
                column: "PartnerId");

            migrationBuilder.AddForeignKey(
                name: "FK_MN_PaymentsData_MN_Partners_PartnerId",
                table: "MN_PaymentsData",
                column: "PartnerId",
                principalTable: "MN_Partners",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
