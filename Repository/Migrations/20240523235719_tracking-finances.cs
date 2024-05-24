using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Repository.Migrations
{
    public partial class trackingfinances : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FN_EssentialExpenses");

            migrationBuilder.DropColumn(
                name: "NumberInstallment",
                table: "FN_FixedExpenses");

            migrationBuilder.AddColumn<bool>(
                name: "Deleted",
                table: "FN_FixedExpenses",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateTable(
                name: "FN_FixedExpensesTrackings",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    ExpensesId = table.Column<int>(type: "int", nullable: false),
                    BankAccountId = table.Column<int>(type: "int", nullable: false),
                    PaidBy = table.Column<int>(type: "int", nullable: false),
                    CardId = table.Column<int>(type: "int", nullable: true),
                    WasPaid = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    EntryRegister = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    Price = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    Interest = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    Deleted = table.Column<bool>(type: "tinyint(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FN_FixedExpensesTrackings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FN_FixedExpensesTrackings_aspnetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "aspnetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FN_FixedExpensesTrackings_FN_BankAccount_BankAccountId",
                        column: x => x.BankAccountId,
                        principalTable: "FN_BankAccount",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FN_FixedExpensesTrackings_FN_Cards_CardId",
                        column: x => x.CardId,
                        principalTable: "FN_Cards",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_FN_FixedExpensesTrackings_FN_FixedExpenses_ExpensesId",
                        column: x => x.ExpensesId,
                        principalTable: "FN_FixedExpenses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_FN_FixedExpensesTrackings_BankAccountId",
                table: "FN_FixedExpensesTrackings",
                column: "BankAccountId");

            migrationBuilder.CreateIndex(
                name: "IX_FN_FixedExpensesTrackings_CardId",
                table: "FN_FixedExpensesTrackings",
                column: "CardId");

            migrationBuilder.CreateIndex(
                name: "IX_FN_FixedExpensesTrackings_ExpensesId",
                table: "FN_FixedExpensesTrackings",
                column: "ExpensesId");

            migrationBuilder.CreateIndex(
                name: "IX_FN_FixedExpensesTrackings_UserId",
                table: "FN_FixedExpensesTrackings",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FN_FixedExpensesTrackings");

            migrationBuilder.DropColumn(
                name: "Deleted",
                table: "FN_FixedExpenses");

            migrationBuilder.AddColumn<int>(
                name: "NumberInstallment",
                table: "FN_FixedExpenses",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "FN_EssentialExpenses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    BankAccountId = table.Column<int>(type: "int", nullable: false),
                    CardId = table.Column<int>(type: "int", nullable: true),
                    EntryRegister = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    ExpensesId = table.Column<int>(type: "int", nullable: false),
                    Interest = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    PaidBy = table.Column<int>(type: "int", nullable: false),
                    Price = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    WasPaid = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FN_EssentialExpenses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FN_EssentialExpenses_aspnetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "aspnetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FN_EssentialExpenses_FN_BankAccount_BankAccountId",
                        column: x => x.BankAccountId,
                        principalTable: "FN_BankAccount",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FN_EssentialExpenses_FN_Cards_CardId",
                        column: x => x.CardId,
                        principalTable: "FN_Cards",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_FN_EssentialExpenses_FN_FixedExpenses_ExpensesId",
                        column: x => x.ExpensesId,
                        principalTable: "FN_FixedExpenses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_FN_EssentialExpenses_BankAccountId",
                table: "FN_EssentialExpenses",
                column: "BankAccountId");

            migrationBuilder.CreateIndex(
                name: "IX_FN_EssentialExpenses_CardId",
                table: "FN_EssentialExpenses",
                column: "CardId");

            migrationBuilder.CreateIndex(
                name: "IX_FN_EssentialExpenses_ExpensesId",
                table: "FN_EssentialExpenses",
                column: "ExpensesId");

            migrationBuilder.CreateIndex(
                name: "IX_FN_EssentialExpenses_UserId",
                table: "FN_EssentialExpenses",
                column: "UserId");
        }
    }
}
