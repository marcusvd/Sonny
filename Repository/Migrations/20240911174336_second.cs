using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Repository.Migrations
{
    public partial class second : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Limit",
                table: "FN_Cards",
                newName: "CreditLimit");

            migrationBuilder.CreateTable(
                name: "CreditCardLimitOperation",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    CardId = table.Column<int>(type: "int", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: true),
                    CompanyId = table.Column<int>(type: "int", nullable: false),
                    LimitCreditUsed = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    PriceOfLastPayment = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    Registered = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    LastPayment = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CreditCardLimitOperation", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CreditCardLimitOperation_aspnetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "aspnetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_CreditCardLimitOperation_FN_Cards_CardId",
                        column: x => x.CardId,
                        principalTable: "FN_Cards",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CreditCardLimitOperation_MN_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "MN_Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_CreditCardLimitOperation_CardId",
                table: "CreditCardLimitOperation",
                column: "CardId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_CreditCardLimitOperation_CompanyId",
                table: "CreditCardLimitOperation",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_CreditCardLimitOperation_UserId",
                table: "CreditCardLimitOperation",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CreditCardLimitOperation");

            migrationBuilder.RenameColumn(
                name: "CreditLimit",
                table: "FN_Cards",
                newName: "Limit");
        }
    }
}
