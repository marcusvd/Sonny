using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Repository.Migrations
{
    public partial class repair : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BS_Prices");

            migrationBuilder.DropColumn(
                name: "Started",
                table: "BS_Services");

            migrationBuilder.RenameColumn(
                name: "ExecutedServicesComments",
                table: "BS_Services",
                newName: "Comments");

            migrationBuilder.CreateTable(
                name: "BS_Repairs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    ServiceName = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    PriceService = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    ServiceId = table.Column<int>(type: "int", nullable: false),
                    RepairStatus = table.Column<int>(type: "int", nullable: false),
                    Added = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    ExecutedServicesComments = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BS_Repairs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BS_Repairs_BS_Services_ServiceId",
                        column: x => x.ServiceId,
                        principalTable: "BS_Services",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_BS_Repairs_ServiceId",
                table: "BS_Repairs",
                column: "ServiceId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BS_Repairs");

            migrationBuilder.RenameColumn(
                name: "Comments",
                table: "BS_Services",
                newName: "ExecutedServicesComments");

            migrationBuilder.AddColumn<DateTime>(
                name: "Started",
                table: "BS_Services",
                type: "datetime(6)",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.CreateTable(
                name: "BS_Prices",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    PriceService = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    ServiceId = table.Column<int>(type: "int", nullable: false),
                    ServiceName = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BS_Prices", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BS_Prices_BS_Services_ServiceId",
                        column: x => x.ServiceId,
                        principalTable: "BS_Services",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_BS_Prices_ServiceId",
                table: "BS_Prices",
                column: "ServiceId");
        }
    }
}
