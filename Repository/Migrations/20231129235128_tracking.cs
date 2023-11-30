using Microsoft.EntityFrameworkCore.Migrations;

namespace Repository.Migrations
{
    public partial class tracking : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tracking_aspnetUsers_UserId",
                table: "Tracking");

            migrationBuilder.DropForeignKey(
                name: "FK_Tracking_MN_Customers_CustomerId",
                table: "Tracking");

            migrationBuilder.DropForeignKey(
                name: "FK_Tracking_PD_Products_ProductId",
                table: "Tracking");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Tracking",
                table: "Tracking");

            migrationBuilder.RenameTable(
                name: "Tracking",
                newName: "PD_Trackings");

            migrationBuilder.RenameIndex(
                name: "IX_Tracking_UserId",
                table: "PD_Trackings",
                newName: "IX_PD_Trackings_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_Tracking_ProductId",
                table: "PD_Trackings",
                newName: "IX_PD_Trackings_ProductId");

            migrationBuilder.RenameIndex(
                name: "IX_Tracking_CustomerId",
                table: "PD_Trackings",
                newName: "IX_PD_Trackings_CustomerId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PD_Trackings",
                table: "PD_Trackings",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_PD_Trackings_aspnetUsers_UserId",
                table: "PD_Trackings",
                column: "UserId",
                principalTable: "aspnetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PD_Trackings_MN_Customers_CustomerId",
                table: "PD_Trackings",
                column: "CustomerId",
                principalTable: "MN_Customers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_PD_Trackings_PD_Products_ProductId",
                table: "PD_Trackings",
                column: "ProductId",
                principalTable: "PD_Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PD_Trackings_aspnetUsers_UserId",
                table: "PD_Trackings");

            migrationBuilder.DropForeignKey(
                name: "FK_PD_Trackings_MN_Customers_CustomerId",
                table: "PD_Trackings");

            migrationBuilder.DropForeignKey(
                name: "FK_PD_Trackings_PD_Products_ProductId",
                table: "PD_Trackings");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PD_Trackings",
                table: "PD_Trackings");

            migrationBuilder.RenameTable(
                name: "PD_Trackings",
                newName: "Tracking");

            migrationBuilder.RenameIndex(
                name: "IX_PD_Trackings_UserId",
                table: "Tracking",
                newName: "IX_Tracking_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_PD_Trackings_ProductId",
                table: "Tracking",
                newName: "IX_Tracking_ProductId");

            migrationBuilder.RenameIndex(
                name: "IX_PD_Trackings_CustomerId",
                table: "Tracking",
                newName: "IX_Tracking_CustomerId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Tracking",
                table: "Tracking",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Tracking_aspnetUsers_UserId",
                table: "Tracking",
                column: "UserId",
                principalTable: "aspnetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Tracking_MN_Customers_CustomerId",
                table: "Tracking",
                column: "CustomerId",
                principalTable: "MN_Customers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Tracking_PD_Products_ProductId",
                table: "Tracking",
                column: "ProductId",
                principalTable: "PD_Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
