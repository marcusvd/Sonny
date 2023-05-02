using Microsoft.EntityFrameworkCore.Migrations;

namespace Repository.Migrations
{
    public partial class changeCollectDeliverrelationship10 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CollectsDelivers_aspnetUsers_MyUserId",
                table: "CollectsDelivers");

            migrationBuilder.AlterColumn<int>(
                name: "MyUserId",
                table: "CollectsDelivers",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_CollectsDelivers_aspnetUsers_MyUserId",
                table: "CollectsDelivers",
                column: "MyUserId",
                principalTable: "aspnetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CollectsDelivers_aspnetUsers_MyUserId",
                table: "CollectsDelivers");

            migrationBuilder.AlterColumn<int>(
                name: "MyUserId",
                table: "CollectsDelivers",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_CollectsDelivers_aspnetUsers_MyUserId",
                table: "CollectsDelivers",
                column: "MyUserId",
                principalTable: "aspnetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
