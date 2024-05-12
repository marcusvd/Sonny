using Microsoft.EntityFrameworkCore.Migrations;

namespace Repository.Migrations
{
    public partial class pixpaymentpartnerpixfinances2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FN_Pix_FN_BankAccount_BankAccountId",
                table: "FN_Pix");

            migrationBuilder.DropForeignKey(
                name: "FK_PartnerPaymentBankAccount_MN_PaymentsData_PaymentDataId",
                table: "PartnerPaymentBankAccount");

            migrationBuilder.DropForeignKey(
                name: "FK_PartnerPaymentPix_MN_PaymentsData_PaymentDataId",
                table: "PartnerPaymentPix");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PartnerPaymentPix",
                table: "PartnerPaymentPix");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PartnerPaymentBankAccount",
                table: "PartnerPaymentBankAccount");

            migrationBuilder.DropPrimaryKey(
                name: "PK_FN_Pix",
                table: "FN_Pix");

            migrationBuilder.RenameTable(
                name: "PartnerPaymentPix",
                newName: "MN_PartnerPaymentPixes");

            migrationBuilder.RenameTable(
                name: "PartnerPaymentBankAccount",
                newName: "MN_PartnerPaymentBankAccounts");

            migrationBuilder.RenameTable(
                name: "FN_Pix",
                newName: "FN_Pixes");

            migrationBuilder.RenameIndex(
                name: "IX_PartnerPaymentPix_PaymentDataId",
                table: "MN_PartnerPaymentPixes",
                newName: "IX_MN_PartnerPaymentPixes_PaymentDataId");

            migrationBuilder.RenameIndex(
                name: "IX_PartnerPaymentBankAccount_PaymentDataId",
                table: "MN_PartnerPaymentBankAccounts",
                newName: "IX_MN_PartnerPaymentBankAccounts_PaymentDataId");

            migrationBuilder.RenameIndex(
                name: "IX_FN_Pix_BankAccountId",
                table: "FN_Pixes",
                newName: "IX_FN_Pixes_BankAccountId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_MN_PartnerPaymentPixes",
                table: "MN_PartnerPaymentPixes",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_MN_PartnerPaymentBankAccounts",
                table: "MN_PartnerPaymentBankAccounts",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_FN_Pixes",
                table: "FN_Pixes",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_FN_Pixes_FN_BankAccount_BankAccountId",
                table: "FN_Pixes",
                column: "BankAccountId",
                principalTable: "FN_BankAccount",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_MN_PartnerPaymentBankAccounts_MN_PaymentsData_PaymentDataId",
                table: "MN_PartnerPaymentBankAccounts",
                column: "PaymentDataId",
                principalTable: "MN_PaymentsData",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_MN_PartnerPaymentPixes_MN_PaymentsData_PaymentDataId",
                table: "MN_PartnerPaymentPixes",
                column: "PaymentDataId",
                principalTable: "MN_PaymentsData",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FN_Pixes_FN_BankAccount_BankAccountId",
                table: "FN_Pixes");

            migrationBuilder.DropForeignKey(
                name: "FK_MN_PartnerPaymentBankAccounts_MN_PaymentsData_PaymentDataId",
                table: "MN_PartnerPaymentBankAccounts");

            migrationBuilder.DropForeignKey(
                name: "FK_MN_PartnerPaymentPixes_MN_PaymentsData_PaymentDataId",
                table: "MN_PartnerPaymentPixes");

            migrationBuilder.DropPrimaryKey(
                name: "PK_MN_PartnerPaymentPixes",
                table: "MN_PartnerPaymentPixes");

            migrationBuilder.DropPrimaryKey(
                name: "PK_MN_PartnerPaymentBankAccounts",
                table: "MN_PartnerPaymentBankAccounts");

            migrationBuilder.DropPrimaryKey(
                name: "PK_FN_Pixes",
                table: "FN_Pixes");

            migrationBuilder.RenameTable(
                name: "MN_PartnerPaymentPixes",
                newName: "PartnerPaymentPix");

            migrationBuilder.RenameTable(
                name: "MN_PartnerPaymentBankAccounts",
                newName: "PartnerPaymentBankAccount");

            migrationBuilder.RenameTable(
                name: "FN_Pixes",
                newName: "FN_Pix");

            migrationBuilder.RenameIndex(
                name: "IX_MN_PartnerPaymentPixes_PaymentDataId",
                table: "PartnerPaymentPix",
                newName: "IX_PartnerPaymentPix_PaymentDataId");

            migrationBuilder.RenameIndex(
                name: "IX_MN_PartnerPaymentBankAccounts_PaymentDataId",
                table: "PartnerPaymentBankAccount",
                newName: "IX_PartnerPaymentBankAccount_PaymentDataId");

            migrationBuilder.RenameIndex(
                name: "IX_FN_Pixes_BankAccountId",
                table: "FN_Pix",
                newName: "IX_FN_Pix_BankAccountId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PartnerPaymentPix",
                table: "PartnerPaymentPix",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PartnerPaymentBankAccount",
                table: "PartnerPaymentBankAccount",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_FN_Pix",
                table: "FN_Pix",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_FN_Pix_FN_BankAccount_BankAccountId",
                table: "FN_Pix",
                column: "BankAccountId",
                principalTable: "FN_BankAccount",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PartnerPaymentBankAccount_MN_PaymentsData_PaymentDataId",
                table: "PartnerPaymentBankAccount",
                column: "PaymentDataId",
                principalTable: "MN_PaymentsData",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_PartnerPaymentPix_MN_PaymentsData_PaymentDataId",
                table: "PartnerPaymentPix",
                column: "PaymentDataId",
                principalTable: "MN_PaymentsData",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
