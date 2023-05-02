using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Repository.Migrations
{
    public partial class companywitheletronicrepair : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "EletronicsRepairs");

            migrationBuilder.RenameColumn(
                name: "EletronicRepair",
                table: "Partners",
                newName: "ElectronicRepair");

            migrationBuilder.AddColumn<int>(
                name: "CompanyId",
                table: "Card",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "ElectronicsRepairs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    CompanyId = table.Column<int>(type: "int", nullable: false),
                    Item = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    EntryDate = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    Description = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Problem = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    User = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Password = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Price = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    PartnerId = table.Column<int>(type: "int", nullable: false),
                    CustomerId = table.Column<int>(type: "int", nullable: false),
                    solution = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Authorized = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    Finished = table.Column<bool>(type: "tinyint(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ElectronicsRepairs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ElectronicsRepairs_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ElectronicsRepairs_Customers_CustomerId",
                        column: x => x.CustomerId,
                        principalTable: "Customers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ElectronicsRepairs_Partners_PartnerId",
                        column: x => x.PartnerId,
                        principalTable: "Partners",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_Card_CompanyId",
                table: "Card",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_ElectronicsRepairs_CompanyId",
                table: "ElectronicsRepairs",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_ElectronicsRepairs_CustomerId",
                table: "ElectronicsRepairs",
                column: "CustomerId");

            migrationBuilder.CreateIndex(
                name: "IX_ElectronicsRepairs_PartnerId",
                table: "ElectronicsRepairs",
                column: "PartnerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Card_Companies_CompanyId",
                table: "Card",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Card_Companies_CompanyId",
                table: "Card");

            migrationBuilder.DropTable(
                name: "ElectronicsRepairs");

            migrationBuilder.DropIndex(
                name: "IX_Card_CompanyId",
                table: "Card");

            migrationBuilder.DropColumn(
                name: "CompanyId",
                table: "Card");

            migrationBuilder.RenameColumn(
                name: "ElectronicRepair",
                table: "Partners",
                newName: "EletronicRepair");

            migrationBuilder.CreateTable(
                name: "EletronicsRepairs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Authorized = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    CustomerId = table.Column<int>(type: "int", nullable: false),
                    Description = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    EntryDate = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    Finished = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    Item = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    PartnerId = table.Column<int>(type: "int", nullable: false),
                    Password = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Price = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    Problem = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    User = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    solution = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EletronicsRepairs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EletronicsRepairs_Customers_CustomerId",
                        column: x => x.CustomerId,
                        principalTable: "Customers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_EletronicsRepairs_Partners_PartnerId",
                        column: x => x.PartnerId,
                        principalTable: "Partners",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_EletronicsRepairs_CustomerId",
                table: "EletronicsRepairs",
                column: "CustomerId");

            migrationBuilder.CreateIndex(
                name: "IX_EletronicsRepairs_PartnerId",
                table: "EletronicsRepairs",
                column: "PartnerId");
        }
    }
}
