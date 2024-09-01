using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Repository.Migrations
{
    public partial class three : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "FN_CreditCardExpenses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    UserId = table.Column<int>(type: "int", nullable: true),
                    CompanyId = table.Column<int>(type: "int", nullable: false),
                    CategoryExpenseId = table.Column<int>(type: "int", nullable: false),
                    SubcategoryExpenseId = table.Column<int>(type: "int", nullable: false),
                    BankAccountId = table.Column<int>(type: "int", nullable: true),
                    Deleted = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    CardId = table.Column<int>(type: "int", nullable: true),
                    PixId = table.Column<int>(type: "int", nullable: true),
                    Price = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    Interest = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    Expires = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    Registered = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    WasPaid = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    OthersPaymentMethods = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Document = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Description = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    LinkCopyBill = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    USERLinkCopyBill = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    PASSLinkCopyBill = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FN_CreditCardExpenses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FN_CreditCardExpenses_aspnetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "aspnetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_FN_CreditCardExpenses_FN_BankAccount_BankAccountId",
                        column: x => x.BankAccountId,
                        principalTable: "FN_BankAccount",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_FN_CreditCardExpenses_FN_Cards_CardId",
                        column: x => x.CardId,
                        principalTable: "FN_Cards",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_FN_CreditCardExpenses_FN_CategoriesExpenses_CategoryExpenseId",
                        column: x => x.CategoryExpenseId,
                        principalTable: "FN_CategoriesExpenses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FN_CreditCardExpenses_FN_Pixes_PixId",
                        column: x => x.PixId,
                        principalTable: "FN_Pixes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_FN_CreditCardExpenses_FN_SubcategoriesExpenses_SubcategoryEx~",
                        column: x => x.SubcategoryExpenseId,
                        principalTable: "FN_SubcategoriesExpenses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FN_CreditCardExpenses_MN_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "MN_Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_FN_CreditCardExpenses_BankAccountId",
                table: "FN_CreditCardExpenses",
                column: "BankAccountId");

            migrationBuilder.CreateIndex(
                name: "IX_FN_CreditCardExpenses_CardId",
                table: "FN_CreditCardExpenses",
                column: "CardId");

            migrationBuilder.CreateIndex(
                name: "IX_FN_CreditCardExpenses_CategoryExpenseId",
                table: "FN_CreditCardExpenses",
                column: "CategoryExpenseId");

            migrationBuilder.CreateIndex(
                name: "IX_FN_CreditCardExpenses_CompanyId",
                table: "FN_CreditCardExpenses",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_FN_CreditCardExpenses_PixId",
                table: "FN_CreditCardExpenses",
                column: "PixId");

            migrationBuilder.CreateIndex(
                name: "IX_FN_CreditCardExpenses_SubcategoryExpenseId",
                table: "FN_CreditCardExpenses",
                column: "SubcategoryExpenseId");

            migrationBuilder.CreateIndex(
                name: "IX_FN_CreditCardExpenses_UserId",
                table: "FN_CreditCardExpenses",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FN_CreditCardExpenses");
        }
    }
}
