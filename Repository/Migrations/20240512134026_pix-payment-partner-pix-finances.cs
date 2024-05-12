using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Repository.Migrations
{
    public partial class pixpaymentpartnerpixfinances : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BankAccount",
                table: "MN_PaymentsData");

            migrationBuilder.DropColumn(
                name: "Pix",
                table: "MN_PaymentsData");

            migrationBuilder.DropColumn(
                name: "Pix",
                table: "FN_BankAccount");

            migrationBuilder.CreateTable(
                name: "FN_Pix",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Key = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Value = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    BankAccountId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FN_Pix", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FN_Pix_FN_BankAccount_BankAccountId",
                        column: x => x.BankAccountId,
                        principalTable: "FN_BankAccount",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "PartnerPaymentBankAccount",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Institution = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Account = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Agency = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Type = table.Column<int>(type: "int", nullable: false),
                    PaymentDataId = table.Column<int>(type: "int", nullable: false),
                    Description = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PartnerPaymentBankAccount", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PartnerPaymentBankAccount_MN_PaymentsData_PaymentDataId",
                        column: x => x.PaymentDataId,
                        principalTable: "MN_PaymentsData",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "PartnerPaymentPix",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Key = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Value = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    PaymentDataId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PartnerPaymentPix", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PartnerPaymentPix_MN_PaymentsData_PaymentDataId",
                        column: x => x.PaymentDataId,
                        principalTable: "MN_PaymentsData",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_FN_Pix_BankAccountId",
                table: "FN_Pix",
                column: "BankAccountId");

            migrationBuilder.CreateIndex(
                name: "IX_PartnerPaymentBankAccount_PaymentDataId",
                table: "PartnerPaymentBankAccount",
                column: "PaymentDataId");

            migrationBuilder.CreateIndex(
                name: "IX_PartnerPaymentPix_PaymentDataId",
                table: "PartnerPaymentPix",
                column: "PaymentDataId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FN_Pix");

            migrationBuilder.DropTable(
                name: "PartnerPaymentBankAccount");

            migrationBuilder.DropTable(
                name: "PartnerPaymentPix");

            migrationBuilder.AddColumn<string>(
                name: "BankAccount",
                table: "MN_PaymentsData",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "Pix",
                table: "MN_PaymentsData",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "Pix",
                table: "FN_BankAccount",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");
        }
    }
}
