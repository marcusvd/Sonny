using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Repository.Migrations
{
    public partial class dwfws : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MN_Companies_SD_Addresses_AddressId",
                table: "MN_Companies");

            migrationBuilder.DropForeignKey(
                name: "FK_MN_Companies_SD_Contacts_ContactId",
                table: "MN_Companies");

            migrationBuilder.DropForeignKey(
                name: "FK_OS_BillingsFroms_aspnetUsers_UserId",
                table: "OS_BillingsFroms");

            migrationBuilder.DropForeignKey(
                name: "FK_OS_Destinies_aspnetUsers_UserId",
                table: "OS_Destinies");

            migrationBuilder.DropIndex(
                name: "IX_OS_Destinies_UserId",
                table: "OS_Destinies");

            migrationBuilder.DropIndex(
                name: "IX_OS_BillingsFroms_UserId",
                table: "OS_BillingsFroms");

            migrationBuilder.DropIndex(
                name: "IX_MN_Companies_AddressId",
                table: "MN_Companies");

            migrationBuilder.DropIndex(
                name: "IX_MN_Companies_ContactId",
                table: "MN_Companies");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "OS_Destinies");

            migrationBuilder.DropColumn(
                name: "SubjectReason",
                table: "OS_CollectsDelivers");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "OS_BillingsFroms");

            migrationBuilder.DropColumn(
                name: "AddressId",
                table: "MN_Companies");

            migrationBuilder.DropColumn(
                name: "ContactId",
                table: "MN_Companies");

            migrationBuilder.RenameColumn(
                name: "Expiration",
                table: "MN_Customers",
                newName: "UserId");

            migrationBuilder.AlterColumn<DateTime>(
                name: "Deleted",
                table: "SD_socialnetworks",
                type: "datetime(6)",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "tinyint(1)");

            migrationBuilder.AddColumn<int>(
                name: "CompanyId",
                table: "SD_socialnetworks",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "Registered",
                table: "SD_socialnetworks",
                type: "datetime(6)",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AlterColumn<DateTime>(
                name: "Deleted",
                table: "SD_Contacts",
                type: "datetime(6)",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "tinyint(1)");

            migrationBuilder.AddColumn<int>(
                name: "CompanyId",
                table: "SD_Contacts",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "Registered",
                table: "SD_Contacts",
                type: "datetime(6)",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AlterColumn<DateTime>(
                name: "Deleted",
                table: "SD_Addresses",
                type: "datetime(6)",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "tinyint(1)");

            migrationBuilder.AddColumn<int>(
                name: "CompanyId",
                table: "SD_Addresses",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "Registered",
                table: "SD_Addresses",
                type: "datetime(6)",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AlterColumn<DateTime>(
                name: "Deleted",
                table: "MN_PhysicallyMovingCosts",
                type: "datetime(6)",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "tinyint(1)");

            migrationBuilder.AddColumn<int>(
                name: "CompanyId",
                table: "MN_PhysicallyMovingCosts",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "Registered",
                table: "MN_PhysicallyMovingCosts",
                type: "datetime(6)",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AlterColumn<DateTime>(
                name: "Deleted",
                table: "MN_PaymentsData",
                type: "datetime(6)",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "tinyint(1)");

            migrationBuilder.AddColumn<int>(
                name: "CompanyId",
                table: "MN_PaymentsData",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "Registered",
                table: "MN_PaymentsData",
                type: "datetime(6)",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AlterColumn<DateTime>(
                name: "Deleted",
                table: "MN_Partners",
                type: "datetime(6)",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "tinyint(1)");

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "MN_Partners",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<DateTime>(
                name: "Deleted",
                table: "MN_PartnerPaymentPixes",
                type: "datetime(6)",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "tinyint(1)");

            migrationBuilder.AddColumn<int>(
                name: "CompanyId",
                table: "MN_PartnerPaymentPixes",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "Registered",
                table: "MN_PartnerPaymentPixes",
                type: "datetime(6)",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AlterColumn<DateTime>(
                name: "Deleted",
                table: "MN_PartnerPaymentBankAccounts",
                type: "datetime(6)",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "tinyint(1)");

            migrationBuilder.AddColumn<int>(
                name: "CompanyId",
                table: "MN_PartnerPaymentBankAccounts",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "Registered",
                table: "MN_PartnerPaymentBankAccounts",
                type: "datetime(6)",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AlterColumn<DateTime>(
                name: "Deleted",
                table: "MN_Customers",
                type: "datetime(6)",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "tinyint(1)");

            migrationBuilder.AlterColumn<DateTime>(
                name: "Assured",
                table: "MN_Customers",
                type: "datetime(6)",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "tinyint(1)");

            migrationBuilder.AddColumn<DateTime>(
                name: "Expires",
                table: "MN_Customers",
                type: "datetime(6)",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AlterColumn<DateTime>(
                name: "Deleted",
                table: "MN_AdditionalCosts",
                type: "datetime(6)",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "tinyint(1)");

            migrationBuilder.AddColumn<int>(
                name: "CompanyId",
                table: "MN_AdditionalCosts",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "Registered",
                table: "MN_AdditionalCosts",
                type: "datetime(6)",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.CreateIndex(
                name: "IX_SD_socialnetworks_CompanyId",
                table: "SD_socialnetworks",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_SD_Contacts_CompanyId",
                table: "SD_Contacts",
                column: "CompanyId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_SD_Addresses_CompanyId",
                table: "SD_Addresses",
                column: "CompanyId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_MN_PhysicallyMovingCosts_CompanyId",
                table: "MN_PhysicallyMovingCosts",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_MN_PaymentsData_CompanyId",
                table: "MN_PaymentsData",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_MN_Partners_UserId",
                table: "MN_Partners",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_MN_PartnerPaymentPixes_CompanyId",
                table: "MN_PartnerPaymentPixes",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_MN_PartnerPaymentBankAccounts_CompanyId",
                table: "MN_PartnerPaymentBankAccounts",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_MN_Customers_UserId",
                table: "MN_Customers",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_MN_AdditionalCosts_CompanyId",
                table: "MN_AdditionalCosts",
                column: "CompanyId");

            migrationBuilder.AddForeignKey(
                name: "FK_MN_AdditionalCosts_MN_Companies_CompanyId",
                table: "MN_AdditionalCosts",
                column: "CompanyId",
                principalTable: "MN_Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_MN_Customers_aspnetUsers_UserId",
                table: "MN_Customers",
                column: "UserId",
                principalTable: "aspnetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_MN_PartnerPaymentBankAccounts_MN_Companies_CompanyId",
                table: "MN_PartnerPaymentBankAccounts",
                column: "CompanyId",
                principalTable: "MN_Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_MN_PartnerPaymentPixes_MN_Companies_CompanyId",
                table: "MN_PartnerPaymentPixes",
                column: "CompanyId",
                principalTable: "MN_Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_MN_Partners_aspnetUsers_UserId",
                table: "MN_Partners",
                column: "UserId",
                principalTable: "aspnetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_MN_PaymentsData_MN_Companies_CompanyId",
                table: "MN_PaymentsData",
                column: "CompanyId",
                principalTable: "MN_Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_MN_PhysicallyMovingCosts_MN_Companies_CompanyId",
                table: "MN_PhysicallyMovingCosts",
                column: "CompanyId",
                principalTable: "MN_Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SD_Addresses_MN_Companies_CompanyId",
                table: "SD_Addresses",
                column: "CompanyId",
                principalTable: "MN_Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SD_Contacts_MN_Companies_CompanyId",
                table: "SD_Contacts",
                column: "CompanyId",
                principalTable: "MN_Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SD_socialnetworks_MN_Companies_CompanyId",
                table: "SD_socialnetworks",
                column: "CompanyId",
                principalTable: "MN_Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MN_AdditionalCosts_MN_Companies_CompanyId",
                table: "MN_AdditionalCosts");

            migrationBuilder.DropForeignKey(
                name: "FK_MN_Customers_aspnetUsers_UserId",
                table: "MN_Customers");

            migrationBuilder.DropForeignKey(
                name: "FK_MN_PartnerPaymentBankAccounts_MN_Companies_CompanyId",
                table: "MN_PartnerPaymentBankAccounts");

            migrationBuilder.DropForeignKey(
                name: "FK_MN_PartnerPaymentPixes_MN_Companies_CompanyId",
                table: "MN_PartnerPaymentPixes");

            migrationBuilder.DropForeignKey(
                name: "FK_MN_Partners_aspnetUsers_UserId",
                table: "MN_Partners");

            migrationBuilder.DropForeignKey(
                name: "FK_MN_PaymentsData_MN_Companies_CompanyId",
                table: "MN_PaymentsData");

            migrationBuilder.DropForeignKey(
                name: "FK_MN_PhysicallyMovingCosts_MN_Companies_CompanyId",
                table: "MN_PhysicallyMovingCosts");

            migrationBuilder.DropForeignKey(
                name: "FK_SD_Addresses_MN_Companies_CompanyId",
                table: "SD_Addresses");

            migrationBuilder.DropForeignKey(
                name: "FK_SD_Contacts_MN_Companies_CompanyId",
                table: "SD_Contacts");

            migrationBuilder.DropForeignKey(
                name: "FK_SD_socialnetworks_MN_Companies_CompanyId",
                table: "SD_socialnetworks");

            migrationBuilder.DropIndex(
                name: "IX_SD_socialnetworks_CompanyId",
                table: "SD_socialnetworks");

            migrationBuilder.DropIndex(
                name: "IX_SD_Contacts_CompanyId",
                table: "SD_Contacts");

            migrationBuilder.DropIndex(
                name: "IX_SD_Addresses_CompanyId",
                table: "SD_Addresses");

            migrationBuilder.DropIndex(
                name: "IX_MN_PhysicallyMovingCosts_CompanyId",
                table: "MN_PhysicallyMovingCosts");

            migrationBuilder.DropIndex(
                name: "IX_MN_PaymentsData_CompanyId",
                table: "MN_PaymentsData");

            migrationBuilder.DropIndex(
                name: "IX_MN_Partners_UserId",
                table: "MN_Partners");

            migrationBuilder.DropIndex(
                name: "IX_MN_PartnerPaymentPixes_CompanyId",
                table: "MN_PartnerPaymentPixes");

            migrationBuilder.DropIndex(
                name: "IX_MN_PartnerPaymentBankAccounts_CompanyId",
                table: "MN_PartnerPaymentBankAccounts");

            migrationBuilder.DropIndex(
                name: "IX_MN_Customers_UserId",
                table: "MN_Customers");

            migrationBuilder.DropIndex(
                name: "IX_MN_AdditionalCosts_CompanyId",
                table: "MN_AdditionalCosts");

            migrationBuilder.DropColumn(
                name: "CompanyId",
                table: "SD_socialnetworks");

            migrationBuilder.DropColumn(
                name: "Registered",
                table: "SD_socialnetworks");

            migrationBuilder.DropColumn(
                name: "CompanyId",
                table: "SD_Contacts");

            migrationBuilder.DropColumn(
                name: "Registered",
                table: "SD_Contacts");

            migrationBuilder.DropColumn(
                name: "CompanyId",
                table: "SD_Addresses");

            migrationBuilder.DropColumn(
                name: "Registered",
                table: "SD_Addresses");

            migrationBuilder.DropColumn(
                name: "CompanyId",
                table: "MN_PhysicallyMovingCosts");

            migrationBuilder.DropColumn(
                name: "Registered",
                table: "MN_PhysicallyMovingCosts");

            migrationBuilder.DropColumn(
                name: "CompanyId",
                table: "MN_PaymentsData");

            migrationBuilder.DropColumn(
                name: "Registered",
                table: "MN_PaymentsData");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "MN_Partners");

            migrationBuilder.DropColumn(
                name: "CompanyId",
                table: "MN_PartnerPaymentPixes");

            migrationBuilder.DropColumn(
                name: "Registered",
                table: "MN_PartnerPaymentPixes");

            migrationBuilder.DropColumn(
                name: "CompanyId",
                table: "MN_PartnerPaymentBankAccounts");

            migrationBuilder.DropColumn(
                name: "Registered",
                table: "MN_PartnerPaymentBankAccounts");

            migrationBuilder.DropColumn(
                name: "Expires",
                table: "MN_Customers");

            migrationBuilder.DropColumn(
                name: "CompanyId",
                table: "MN_AdditionalCosts");

            migrationBuilder.DropColumn(
                name: "Registered",
                table: "MN_AdditionalCosts");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "MN_Customers",
                newName: "Expiration");

            migrationBuilder.AlterColumn<bool>(
                name: "Deleted",
                table: "SD_socialnetworks",
                type: "tinyint(1)",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime(6)");

            migrationBuilder.AlterColumn<bool>(
                name: "Deleted",
                table: "SD_Contacts",
                type: "tinyint(1)",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime(6)");

            migrationBuilder.AlterColumn<bool>(
                name: "Deleted",
                table: "SD_Addresses",
                type: "tinyint(1)",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime(6)");

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "OS_Destinies",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "SubjectReason",
                table: "OS_CollectsDelivers",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "OS_BillingsFroms",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<bool>(
                name: "Deleted",
                table: "MN_PhysicallyMovingCosts",
                type: "tinyint(1)",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime(6)");

            migrationBuilder.AlterColumn<bool>(
                name: "Deleted",
                table: "MN_PaymentsData",
                type: "tinyint(1)",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime(6)");

            migrationBuilder.AlterColumn<bool>(
                name: "Deleted",
                table: "MN_Partners",
                type: "tinyint(1)",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime(6)");

            migrationBuilder.AlterColumn<bool>(
                name: "Deleted",
                table: "MN_PartnerPaymentPixes",
                type: "tinyint(1)",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime(6)");

            migrationBuilder.AlterColumn<bool>(
                name: "Deleted",
                table: "MN_PartnerPaymentBankAccounts",
                type: "tinyint(1)",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime(6)");

            migrationBuilder.AlterColumn<bool>(
                name: "Deleted",
                table: "MN_Customers",
                type: "tinyint(1)",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime(6)");

            migrationBuilder.AlterColumn<bool>(
                name: "Assured",
                table: "MN_Customers",
                type: "tinyint(1)",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime(6)");

            migrationBuilder.AddColumn<int>(
                name: "AddressId",
                table: "MN_Companies",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ContactId",
                table: "MN_Companies",
                type: "int",
                nullable: true);

            migrationBuilder.AlterColumn<bool>(
                name: "Deleted",
                table: "MN_AdditionalCosts",
                type: "tinyint(1)",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime(6)");

            migrationBuilder.CreateIndex(
                name: "IX_OS_Destinies_UserId",
                table: "OS_Destinies",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_OS_BillingsFroms_UserId",
                table: "OS_BillingsFroms",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_MN_Companies_AddressId",
                table: "MN_Companies",
                column: "AddressId");

            migrationBuilder.CreateIndex(
                name: "IX_MN_Companies_ContactId",
                table: "MN_Companies",
                column: "ContactId");

            migrationBuilder.AddForeignKey(
                name: "FK_MN_Companies_SD_Addresses_AddressId",
                table: "MN_Companies",
                column: "AddressId",
                principalTable: "SD_Addresses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_MN_Companies_SD_Contacts_ContactId",
                table: "MN_Companies",
                column: "ContactId",
                principalTable: "SD_Contacts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_OS_BillingsFroms_aspnetUsers_UserId",
                table: "OS_BillingsFroms",
                column: "UserId",
                principalTable: "aspnetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_OS_Destinies_aspnetUsers_UserId",
                table: "OS_Destinies",
                column: "UserId",
                principalTable: "aspnetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
