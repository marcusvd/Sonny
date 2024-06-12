using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Repository.Migrations
{
    public partial class changeentityfixedexpensesandtracking : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FN_FixedExpensesTrackings");

            migrationBuilder.DropTable(
                name: "FN_FixedExpenses");

            migrationBuilder.CreateTable(
                name: "FN_MonthFixedExpenses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    CompanyId = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
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
                    table.PrimaryKey("PK_FN_MonthFixedExpenses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FN_MonthFixedExpenses_MN_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "MN_Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "FN_MonthFixedExpensesTrackings",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    CompanyId = table.Column<int>(type: "int", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: true),
                    MonthFixedExpensesId = table.Column<int>(type: "int", nullable: false),
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
                    table.PrimaryKey("PK_FN_MonthFixedExpensesTrackings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FN_MonthFixedExpensesTrackings_aspnetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "aspnetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_FN_MonthFixedExpensesTrackings_FN_BankAccount_BankAccountId",
                        column: x => x.BankAccountId,
                        principalTable: "FN_BankAccount",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_FN_MonthFixedExpensesTrackings_FN_Cards_CardId",
                        column: x => x.CardId,
                        principalTable: "FN_Cards",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_FN_MonthFixedExpensesTrackings_FN_MonthFixedExpenses_MonthFi~",
                        column: x => x.MonthFixedExpensesId,
                        principalTable: "FN_MonthFixedExpenses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FN_MonthFixedExpensesTrackings_FN_Pixes_PixId",
                        column: x => x.PixId,
                        principalTable: "FN_Pixes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_FN_MonthFixedExpensesTrackings_MN_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "MN_Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_FN_MonthFixedExpenses_CompanyId",
                table: "FN_MonthFixedExpenses",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_FN_MonthFixedExpensesTrackings_BankAccountId",
                table: "FN_MonthFixedExpensesTrackings",
                column: "BankAccountId");

            migrationBuilder.CreateIndex(
                name: "IX_FN_MonthFixedExpensesTrackings_CardId",
                table: "FN_MonthFixedExpensesTrackings",
                column: "CardId");

            migrationBuilder.CreateIndex(
                name: "IX_FN_MonthFixedExpensesTrackings_CompanyId",
                table: "FN_MonthFixedExpensesTrackings",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_FN_MonthFixedExpensesTrackings_MonthFixedExpensesId",
                table: "FN_MonthFixedExpensesTrackings",
                column: "MonthFixedExpensesId");

            migrationBuilder.CreateIndex(
                name: "IX_FN_MonthFixedExpensesTrackings_PixId",
                table: "FN_MonthFixedExpensesTrackings",
                column: "PixId");

            migrationBuilder.CreateIndex(
                name: "IX_FN_MonthFixedExpensesTrackings_UserId",
                table: "FN_MonthFixedExpensesTrackings",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FN_MonthFixedExpensesTrackings");

            migrationBuilder.DropTable(
                name: "FN_MonthFixedExpenses");

            migrationBuilder.CreateTable(
                name: "FN_FixedExpenses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    CompanyId = table.Column<int>(type: "int", nullable: false),
                    CyclePayment = table.Column<int>(type: "int", nullable: false),
                    Deleted = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    Expiration = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    LinkCopyBill = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Name = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    NameIdentification = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    PASSLinkCopyBill = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Price = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    Registered = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    USERLinkCopyBill = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FN_FixedExpenses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FN_FixedExpenses_MN_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "MN_Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "FN_FixedExpensesTrackings",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    BankAccountId = table.Column<int>(type: "int", nullable: true),
                    CardId = table.Column<int>(type: "int", nullable: true),
                    CompanyId = table.Column<int>(type: "int", nullable: false),
                    Deleted = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    FixedExpensesId = table.Column<int>(type: "int", nullable: false),
                    Interest = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    OthersPaymentMethods = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    PixId = table.Column<int>(type: "int", nullable: true),
                    Price = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    Registered = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: true),
                    WasPaid = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FN_FixedExpensesTrackings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FN_FixedExpensesTrackings_aspnetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "aspnetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_FN_FixedExpensesTrackings_FN_BankAccount_BankAccountId",
                        column: x => x.BankAccountId,
                        principalTable: "FN_BankAccount",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_FN_FixedExpensesTrackings_FN_Cards_CardId",
                        column: x => x.CardId,
                        principalTable: "FN_Cards",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_FN_FixedExpensesTrackings_FN_FixedExpenses_FixedExpensesId",
                        column: x => x.FixedExpensesId,
                        principalTable: "FN_FixedExpenses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FN_FixedExpensesTrackings_FN_Pixes_PixId",
                        column: x => x.PixId,
                        principalTable: "FN_Pixes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_FN_FixedExpensesTrackings_MN_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "MN_Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_FN_FixedExpenses_CompanyId",
                table: "FN_FixedExpenses",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_FN_FixedExpensesTrackings_BankAccountId",
                table: "FN_FixedExpensesTrackings",
                column: "BankAccountId");

            migrationBuilder.CreateIndex(
                name: "IX_FN_FixedExpensesTrackings_CardId",
                table: "FN_FixedExpensesTrackings",
                column: "CardId");

            migrationBuilder.CreateIndex(
                name: "IX_FN_FixedExpensesTrackings_CompanyId",
                table: "FN_FixedExpensesTrackings",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_FN_FixedExpensesTrackings_FixedExpensesId",
                table: "FN_FixedExpensesTrackings",
                column: "FixedExpensesId");

            migrationBuilder.CreateIndex(
                name: "IX_FN_FixedExpensesTrackings_PixId",
                table: "FN_FixedExpensesTrackings",
                column: "PixId");

            migrationBuilder.CreateIndex(
                name: "IX_FN_FixedExpensesTrackings_UserId",
                table: "FN_FixedExpensesTrackings",
                column: "UserId");
        }
    }
}
