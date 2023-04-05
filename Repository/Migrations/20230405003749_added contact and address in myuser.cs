using Microsoft.EntityFrameworkCore.Migrations;

namespace Repository.Migrations
{
    public partial class addedcontactandaddressinmyuser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_aspnetUsers_UserProfile_profileId",
                table: "aspnetUsers");

            migrationBuilder.RenameColumn(
                name: "profileId",
                table: "aspnetUsers",
                newName: "ProfileId");

            migrationBuilder.RenameIndex(
                name: "IX_aspnetUsers_profileId",
                table: "aspnetUsers",
                newName: "IX_aspnetUsers_ProfileId");

            migrationBuilder.AddColumn<int>(
                name: "AddressId",
                table: "aspnetUsers",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ContactId",
                table: "aspnetUsers",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_aspnetUsers_AddressId",
                table: "aspnetUsers",
                column: "AddressId");

            migrationBuilder.CreateIndex(
                name: "IX_aspnetUsers_ContactId",
                table: "aspnetUsers",
                column: "ContactId");

            migrationBuilder.AddForeignKey(
                name: "FK_aspnetUsers_Addresses_AddressId",
                table: "aspnetUsers",
                column: "AddressId",
                principalTable: "Addresses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_aspnetUsers_Contacts_ContactId",
                table: "aspnetUsers",
                column: "ContactId",
                principalTable: "Contacts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_aspnetUsers_UserProfile_ProfileId",
                table: "aspnetUsers",
                column: "ProfileId",
                principalTable: "UserProfile",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_aspnetUsers_Addresses_AddressId",
                table: "aspnetUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_aspnetUsers_Contacts_ContactId",
                table: "aspnetUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_aspnetUsers_UserProfile_ProfileId",
                table: "aspnetUsers");

            migrationBuilder.DropIndex(
                name: "IX_aspnetUsers_AddressId",
                table: "aspnetUsers");

            migrationBuilder.DropIndex(
                name: "IX_aspnetUsers_ContactId",
                table: "aspnetUsers");

            migrationBuilder.DropColumn(
                name: "AddressId",
                table: "aspnetUsers");

            migrationBuilder.DropColumn(
                name: "ContactId",
                table: "aspnetUsers");

            migrationBuilder.RenameColumn(
                name: "ProfileId",
                table: "aspnetUsers",
                newName: "profileId");

            migrationBuilder.RenameIndex(
                name: "IX_aspnetUsers_ProfileId",
                table: "aspnetUsers",
                newName: "IX_aspnetUsers_profileId");

            migrationBuilder.AddForeignKey(
                name: "FK_aspnetUsers_UserProfile_profileId",
                table: "aspnetUsers",
                column: "profileId",
                principalTable: "UserProfile",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
