using Microsoft.EntityFrameworkCore.Migrations;

namespace Repository.Migrations
{
    public partial class dddddwfws : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SD_Addresses_MN_Companies_CompanyId",
                table: "SD_Addresses");

            migrationBuilder.DropForeignKey(
                name: "FK_SD_Contacts_MN_Companies_CompanyId",
                table: "SD_Contacts");

            migrationBuilder.DropIndex(
                name: "IX_SD_Contacts_CompanyId",
                table: "SD_Contacts");

            migrationBuilder.DropIndex(
                name: "IX_SD_Addresses_CompanyId",
                table: "SD_Addresses");

            migrationBuilder.DropColumn(
                name: "CompanyId",
                table: "SD_Contacts");

            migrationBuilder.DropColumn(
                name: "CompanyId",
                table: "SD_Addresses");

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
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MN_Companies_SD_Addresses_AddressId",
                table: "MN_Companies");

            migrationBuilder.DropForeignKey(
                name: "FK_MN_Companies_SD_Contacts_ContactId",
                table: "MN_Companies");

            migrationBuilder.DropIndex(
                name: "IX_MN_Companies_AddressId",
                table: "MN_Companies");

            migrationBuilder.DropIndex(
                name: "IX_MN_Companies_ContactId",
                table: "MN_Companies");

            migrationBuilder.DropColumn(
                name: "AddressId",
                table: "MN_Companies");

            migrationBuilder.DropColumn(
                name: "ContactId",
                table: "MN_Companies");

            migrationBuilder.AddColumn<int>(
                name: "CompanyId",
                table: "SD_Contacts",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "CompanyId",
                table: "SD_Addresses",
                type: "int",
                nullable: false,
                defaultValue: 0);

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
        }
    }
}
