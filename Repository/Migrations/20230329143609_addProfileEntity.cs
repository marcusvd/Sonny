using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Repository.Migrations
{
    public partial class addProfileEntity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "profileId",
                table: "aspnetUsers",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "UserProfile",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    UserProfileImage = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserProfile", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_aspnetUsers_profileId",
                table: "aspnetUsers",
                column: "profileId");

            migrationBuilder.AddForeignKey(
                name: "FK_aspnetUsers_UserProfile_profileId",
                table: "aspnetUsers",
                column: "profileId",
                principalTable: "UserProfile",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_aspnetUsers_UserProfile_profileId",
                table: "aspnetUsers");

            migrationBuilder.DropTable(
                name: "UserProfile");

            migrationBuilder.DropIndex(
                name: "IX_aspnetUsers_profileId",
                table: "aspnetUsers");

            migrationBuilder.DropColumn(
                name: "profileId",
                table: "aspnetUsers");
        }
    }
}
