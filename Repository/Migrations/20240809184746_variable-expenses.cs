using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Repository.Migrations
{
    public partial class variableexpenses : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FN_ExpensesNotPredictable");

            migrationBuilder.CreateTable(
                name: "FN_VariableExpenses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    CompanyId = table.Column<int>(type: "int", nullable: false),
                    CategoryExpensesId = table.Column<int>(type: "int", nullable: false),
                    SubcategoryExpensesId = table.Column<int>(type: "int", nullable: false),
                    BankAccountId = table.Column<int>(type: "int", nullable: true),
                    CardId = table.Column<int>(type: "int", nullable: true),
                    PixId = table.Column<int>(type: "int", nullable: true),
                    OthersPaymentMethods = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Item = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Place = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    PaidDay = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    Registerd = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    Price = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    Description = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Deleted = table.Column<bool>(type: "tinyint(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FN_VariableExpenses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FN_VariableExpenses_aspnetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "aspnetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FN_VariableExpenses_FN_BankAccount_BankAccountId",
                        column: x => x.BankAccountId,
                        principalTable: "FN_BankAccount",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_FN_VariableExpenses_FN_Cards_CardId",
                        column: x => x.CardId,
                        principalTable: "FN_Cards",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_FN_VariableExpenses_FN_CategoryExpenses_CategoryExpensesId",
                        column: x => x.CategoryExpensesId,
                        principalTable: "FN_CategoryExpenses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FN_VariableExpenses_FN_Pixes_PixId",
                        column: x => x.PixId,
                        principalTable: "FN_Pixes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_FN_VariableExpenses_FN_SubcategoriesExpenses_SubcategoryExpe~",
                        column: x => x.SubcategoryExpensesId,
                        principalTable: "FN_SubcategoriesExpenses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FN_VariableExpenses_MN_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "MN_Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_FN_VariableExpenses_BankAccountId",
                table: "FN_VariableExpenses",
                column: "BankAccountId");

            migrationBuilder.CreateIndex(
                name: "IX_FN_VariableExpenses_CardId",
                table: "FN_VariableExpenses",
                column: "CardId");

            migrationBuilder.CreateIndex(
                name: "IX_FN_VariableExpenses_CategoryExpensesId",
                table: "FN_VariableExpenses",
                column: "CategoryExpensesId");

            migrationBuilder.CreateIndex(
                name: "IX_FN_VariableExpenses_CompanyId",
                table: "FN_VariableExpenses",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_FN_VariableExpenses_PixId",
                table: "FN_VariableExpenses",
                column: "PixId");

            migrationBuilder.CreateIndex(
                name: "IX_FN_VariableExpenses_SubcategoryExpensesId",
                table: "FN_VariableExpenses",
                column: "SubcategoryExpensesId");

            migrationBuilder.CreateIndex(
                name: "IX_FN_VariableExpenses_UserId",
                table: "FN_VariableExpenses",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FN_VariableExpenses");

            migrationBuilder.CreateTable(
                name: "FN_ExpensesNotPredictable",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    BankAccountId = table.Column<int>(type: "int", nullable: false),
                    CardId = table.Column<int>(type: "int", nullable: true),
                    CustomerId = table.Column<int>(type: "int", nullable: true),
                    DaySpent = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    Description = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    EntryRegister = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    ItemOrPlaceName = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Price = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false)
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
                        name: "FK_FN_ExpensesNotPredictable_FN_Cards_CardId",
                        column: x => x.CardId,
                        principalTable: "FN_Cards",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_FN_ExpensesNotPredictable_MN_Customers_CustomerId",
                        column: x => x.CustomerId,
                        principalTable: "MN_Customers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_FN_ExpensesNotPredictable_BankAccountId",
                table: "FN_ExpensesNotPredictable",
                column: "BankAccountId");

            migrationBuilder.CreateIndex(
                name: "IX_FN_ExpensesNotPredictable_CardId",
                table: "FN_ExpensesNotPredictable",
                column: "CardId");

            migrationBuilder.CreateIndex(
                name: "IX_FN_ExpensesNotPredictable_CustomerId",
                table: "FN_ExpensesNotPredictable",
                column: "CustomerId");

            migrationBuilder.CreateIndex(
                name: "IX_FN_ExpensesNotPredictable_UserId",
                table: "FN_ExpensesNotPredictable",
                column: "UserId");
        }
    }
}
