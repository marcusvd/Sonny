using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Repository.Migrations
{
    public partial class serviceBench : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ServiceBenchId",
                table: "SolutionsPrices",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "ServicesBenchs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    ClientId = table.Column<int>(type: "int", nullable: false),
                    ClientNoRegister = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ClientProblems = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Visually = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Status = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    User = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    BenchStartedIn = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    Finished = table.Column<bool>(type: "tinyint(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ServicesBenchs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ServicesBenchs_Clients_ClientId",
                        column: x => x.ClientId,
                        principalTable: "Clients",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.UpdateData(
                table: "Partners",
                keyColumn: "Id",
                keyValue: 1,
                column: "Today",
                value: new DateTime(2022, 8, 24, 14, 32, 38, 775, DateTimeKind.Local).AddTicks(4602));

            migrationBuilder.UpdateData(
                table: "Partners",
                keyColumn: "Id",
                keyValue: 2,
                column: "Today",
                value: new DateTime(2022, 8, 24, 14, 32, 38, 776, DateTimeKind.Local).AddTicks(8371));

            migrationBuilder.UpdateData(
                table: "Partners",
                keyColumn: "Id",
                keyValue: 3,
                column: "Today",
                value: new DateTime(2022, 8, 24, 14, 32, 38, 776, DateTimeKind.Local).AddTicks(8504));

            migrationBuilder.UpdateData(
                table: "Partners",
                keyColumn: "Id",
                keyValue: 4,
                column: "Today",
                value: new DateTime(2022, 8, 24, 14, 32, 38, 776, DateTimeKind.Local).AddTicks(8511));

            migrationBuilder.UpdateData(
                table: "Partners",
                keyColumn: "Id",
                keyValue: 5,
                column: "Today",
                value: new DateTime(2022, 8, 24, 14, 32, 38, 776, DateTimeKind.Local).AddTicks(8514));

            migrationBuilder.CreateIndex(
                name: "IX_SolutionsPrices_ServiceBenchId",
                table: "SolutionsPrices",
                column: "ServiceBenchId");

            migrationBuilder.CreateIndex(
                name: "IX_ServicesBenchs_ClientId",
                table: "ServicesBenchs",
                column: "ClientId");

            migrationBuilder.AddForeignKey(
                name: "FK_SolutionsPrices_ServicesBenchs_ServiceBenchId",
                table: "SolutionsPrices",
                column: "ServiceBenchId",
                principalTable: "ServicesBenchs",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SolutionsPrices_ServicesBenchs_ServiceBenchId",
                table: "SolutionsPrices");

            migrationBuilder.DropTable(
                name: "ServicesBenchs");

            migrationBuilder.DropIndex(
                name: "IX_SolutionsPrices_ServiceBenchId",
                table: "SolutionsPrices");

            migrationBuilder.DropColumn(
                name: "ServiceBenchId",
                table: "SolutionsPrices");

            migrationBuilder.UpdateData(
                table: "Partners",
                keyColumn: "Id",
                keyValue: 1,
                column: "Today",
                value: new DateTime(2022, 8, 24, 11, 23, 53, 658, DateTimeKind.Local).AddTicks(4258));

            migrationBuilder.UpdateData(
                table: "Partners",
                keyColumn: "Id",
                keyValue: 2,
                column: "Today",
                value: new DateTime(2022, 8, 24, 11, 23, 53, 660, DateTimeKind.Local).AddTicks(6197));

            migrationBuilder.UpdateData(
                table: "Partners",
                keyColumn: "Id",
                keyValue: 3,
                column: "Today",
                value: new DateTime(2022, 8, 24, 11, 23, 53, 660, DateTimeKind.Local).AddTicks(6263));

            migrationBuilder.UpdateData(
                table: "Partners",
                keyColumn: "Id",
                keyValue: 4,
                column: "Today",
                value: new DateTime(2022, 8, 24, 11, 23, 53, 660, DateTimeKind.Local).AddTicks(6268));

            migrationBuilder.UpdateData(
                table: "Partners",
                keyColumn: "Id",
                keyValue: 5,
                column: "Today",
                value: new DateTime(2022, 8, 24, 11, 23, 53, 660, DateTimeKind.Local).AddTicks(6272));
        }
    }
}
