using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Repository.Migrations
{
    public partial class FinancialYearly : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "FN_YearlyFixedExpenses_Fillers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    ExpensesName = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CompanyId = table.Column<int>(type: "int", nullable: false),
                    Deleted = table.Column<bool>(type: "tinyint(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FN_YearlyFixedExpenses_Fillers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FN_YearlyFixedExpenses_Fillers_MN_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "MN_Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "FN_YearlyFixedExpenses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    CompanyId = table.Column<int>(type: "int", nullable: false),
                    NameId = table.Column<int>(type: "int", nullable: false),
                    NameIdentification = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Price = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    Expiration = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    Registered = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    LinkCopyBill = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    USERLinkCopyBill = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    PASSLinkCopyBill = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Deleted = table.Column<bool>(type: "tinyint(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FN_YearlyFixedExpenses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FN_YearlyFixedExpenses_FN_YearlyFixedExpenses_Fillers_NameId",
                        column: x => x.NameId,
                        principalTable: "FN_YearlyFixedExpenses_Fillers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FN_YearlyFixedExpenses_MN_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "MN_Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "FN_YearlyFixedExpensesTrackings",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    CompanyId = table.Column<int>(type: "int", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: true),
                    YearlyFixedExpensesId = table.Column<int>(type: "int", nullable: false),
                    BankAccountId = table.Column<int>(type: "int", nullable: true),
                    CardId = table.Column<int>(type: "int", nullable: true),
                    PixId = table.Column<int>(type: "int", nullable: true),
                    OthersPaymentMethods = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    WasPaid = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    Expiration = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    Registered = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    Price = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    Interest = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    Deleted = table.Column<bool>(type: "tinyint(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FN_YearlyFixedExpensesTrackings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FN_YearlyFixedExpensesTrackings_aspnetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "aspnetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_FN_YearlyFixedExpensesTrackings_FN_BankAccount_BankAccountId",
                        column: x => x.BankAccountId,
                        principalTable: "FN_BankAccount",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_FN_YearlyFixedExpensesTrackings_FN_Cards_CardId",
                        column: x => x.CardId,
                        principalTable: "FN_Cards",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_FN_YearlyFixedExpensesTrackings_FN_Pixes_PixId",
                        column: x => x.PixId,
                        principalTable: "FN_Pixes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_FN_YearlyFixedExpensesTrackings_FN_YearlyFixedExpenses_Yearl~",
                        column: x => x.YearlyFixedExpensesId,
                        principalTable: "FN_YearlyFixedExpenses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FN_YearlyFixedExpensesTrackings_MN_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "MN_Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_FN_YearlyFixedExpenses_CompanyId",
                table: "FN_YearlyFixedExpenses",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_FN_YearlyFixedExpenses_NameId",
                table: "FN_YearlyFixedExpenses",
                column: "NameId");

            migrationBuilder.CreateIndex(
                name: "IX_FN_YearlyFixedExpenses_Fillers_CompanyId",
                table: "FN_YearlyFixedExpenses_Fillers",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_FN_YearlyFixedExpenses_Fillers_ExpensesName",
                table: "FN_YearlyFixedExpenses_Fillers",
                column: "ExpensesName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_FN_YearlyFixedExpensesTrackings_BankAccountId",
                table: "FN_YearlyFixedExpensesTrackings",
                column: "BankAccountId");

            migrationBuilder.CreateIndex(
                name: "IX_FN_YearlyFixedExpensesTrackings_CardId",
                table: "FN_YearlyFixedExpensesTrackings",
                column: "CardId");

            migrationBuilder.CreateIndex(
                name: "IX_FN_YearlyFixedExpensesTrackings_CompanyId",
                table: "FN_YearlyFixedExpensesTrackings",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_FN_YearlyFixedExpensesTrackings_PixId",
                table: "FN_YearlyFixedExpensesTrackings",
                column: "PixId");

            migrationBuilder.CreateIndex(
                name: "IX_FN_YearlyFixedExpensesTrackings_UserId",
                table: "FN_YearlyFixedExpensesTrackings",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_FN_YearlyFixedExpensesTrackings_YearlyFixedExpensesId",
                table: "FN_YearlyFixedExpensesTrackings",
                column: "YearlyFixedExpensesId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FN_YearlyFixedExpensesTrackings");

            migrationBuilder.DropTable(
                name: "FN_YearlyFixedExpenses");

            migrationBuilder.DropTable(
                name: "FN_YearlyFixedExpenses_Fillers");
        }
    }
}
