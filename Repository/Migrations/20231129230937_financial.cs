using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Repository.Migrations
{
    public partial class financial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FN_EssentialCycle");

            migrationBuilder.DropTable(
                name: "FN_NotPredictable");

            migrationBuilder.DropTable(
                name: "FN_BillToPayList");

            migrationBuilder.CreateTable(
                name: "FN_Expenses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    CompanyId = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Expiration = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    NumberInstallment = table.Column<int>(type: "int", nullable: false),
                    CyclePayment = table.Column<int>(type: "int", nullable: false),
                    LinkCopyBill = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    USERLinkCopyBill = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    PASSLinkCopyBill = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FN_Expenses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FN_Expenses_MN_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "MN_Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "FN_EssentialExpenses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    ExpensesId = table.Column<int>(type: "int", nullable: false),
                    BankAccountId = table.Column<int>(type: "int", nullable: false),
                    PaidBy = table.Column<int>(type: "int", nullable: false),
                    WasPaid = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    EntryRegister = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    Price = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    Interest = table.Column<decimal>(type: "decimal(65,30)", nullable: false)
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
                        name: "FK_FN_EssentialExpenses_FN_Expenses_ExpensesId",
                        column: x => x.ExpensesId,
                        principalTable: "FN_Expenses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "FN_ExpensesNotPredictable",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    BankAccountId = table.Column<int>(type: "int", nullable: false),
                    ExpensesId = table.Column<int>(type: "int", nullable: true),
                    PaidBy = table.Column<int>(type: "int", nullable: false),
                    ItemOrPlaceName = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    DaySpent = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    EntryRegister = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    Price = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    Description = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FN_ExpensesNotPredictable", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FN_ExpensesNotPredictable_aspnetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "aspnetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FN_ExpensesNotPredictable_FN_BankAccount_BankAccountId",
                        column: x => x.BankAccountId,
                        principalTable: "FN_BankAccount",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FN_ExpensesNotPredictable_FN_Expenses_ExpensesId",
                        column: x => x.ExpensesId,
                        principalTable: "FN_Expenses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_FN_EssentialExpenses_BankAccountId",
                table: "FN_EssentialExpenses",
                column: "BankAccountId");

            migrationBuilder.CreateIndex(
                name: "IX_FN_EssentialExpenses_ExpensesId",
                table: "FN_EssentialExpenses",
                column: "ExpensesId");

            migrationBuilder.CreateIndex(
                name: "IX_FN_EssentialExpenses_UserId",
                table: "FN_EssentialExpenses",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_FN_Expenses_CompanyId",
                table: "FN_Expenses",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_FN_ExpensesNotPredictable_BankAccountId",
                table: "FN_ExpensesNotPredictable",
                column: "BankAccountId");

            migrationBuilder.CreateIndex(
                name: "IX_FN_ExpensesNotPredictable_ExpensesId",
                table: "FN_ExpensesNotPredictable",
                column: "ExpensesId");

            migrationBuilder.CreateIndex(
                name: "IX_FN_ExpensesNotPredictable_UserId",
                table: "FN_ExpensesNotPredictable",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FN_EssentialExpenses");

            migrationBuilder.DropTable(
                name: "FN_ExpensesNotPredictable");

            migrationBuilder.DropTable(
                name: "FN_Expenses");

            migrationBuilder.CreateTable(
                name: "FN_BillToPayList",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    BillName = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CompanyId = table.Column<int>(type: "int", nullable: false),
                    CyclePayment = table.Column<int>(type: "int", nullable: false),
                    Expiration = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    LinkCopyBill = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    PASSLinkCopyBill = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    USERLinkCopyBill = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FN_BillToPayList", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FN_BillToPayList_MN_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "MN_Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "FN_EssentialCycle",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    BankAccountId = table.Column<int>(type: "int", nullable: false),
                    BillToPayListId = table.Column<int>(type: "int", nullable: false),
                    EntryRegister = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    Interest = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    PaidBy = table.Column<int>(type: "int", nullable: false),
                    Price = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    WasPaid = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FN_EssentialCycle", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FN_EssentialCycle_aspnetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "aspnetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FN_EssentialCycle_FN_BankAccount_BankAccountId",
                        column: x => x.BankAccountId,
                        principalTable: "FN_BankAccount",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FN_EssentialCycle_FN_BillToPayList_BillToPayListId",
                        column: x => x.BillToPayListId,
                        principalTable: "FN_BillToPayList",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "FN_NotPredictable",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    BankAccountId = table.Column<int>(type: "int", nullable: false),
                    BillToPayListId = table.Column<int>(type: "int", nullable: true),
                    DaySpent = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    Description = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    EntryRegister = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    ItemOrPlaceName = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    PaidBy = table.Column<int>(type: "int", nullable: false),
                    Price = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FN_NotPredictable", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FN_NotPredictable_aspnetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "aspnetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FN_NotPredictable_FN_BankAccount_BankAccountId",
                        column: x => x.BankAccountId,
                        principalTable: "FN_BankAccount",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FN_NotPredictable_FN_BillToPayList_BillToPayListId",
                        column: x => x.BillToPayListId,
                        principalTable: "FN_BillToPayList",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_FN_BillToPayList_CompanyId",
                table: "FN_BillToPayList",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_FN_EssentialCycle_BankAccountId",
                table: "FN_EssentialCycle",
                column: "BankAccountId");

            migrationBuilder.CreateIndex(
                name: "IX_FN_EssentialCycle_BillToPayListId",
                table: "FN_EssentialCycle",
                column: "BillToPayListId");

            migrationBuilder.CreateIndex(
                name: "IX_FN_EssentialCycle_UserId",
                table: "FN_EssentialCycle",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_FN_NotPredictable_BankAccountId",
                table: "FN_NotPredictable",
                column: "BankAccountId");

            migrationBuilder.CreateIndex(
                name: "IX_FN_NotPredictable_BillToPayListId",
                table: "FN_NotPredictable",
                column: "BillToPayListId");

            migrationBuilder.CreateIndex(
                name: "IX_FN_NotPredictable_UserId",
                table: "FN_NotPredictable",
                column: "UserId");
        }
    }
}
