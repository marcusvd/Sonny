using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Repository.Migrations
{
    public partial class fildeNormalizedNamecustomerentity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ChargeFrom",
                table: "CollectsDelivers");

            migrationBuilder.AddColumn<string>(
                name: "NormalizedName",
                table: "Customers",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<int>(
                name: "ChargeFromId",
                table: "CollectsDelivers",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "ChargeFrom",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    PartnerId = table.Column<int>(type: "int", nullable: true),
                    CustomerId = table.Column<int>(type: "int", nullable: true),
                    Base = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    Comments = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ChargeFrom", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ChargeFrom_Customers_CustomerId",
                        column: x => x.CustomerId,
                        principalTable: "Customers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ChargeFrom_Partners_PartnerId",
                        column: x => x.PartnerId,
                        principalTable: "Partners",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_CollectsDelivers_ChargeFromId",
                table: "CollectsDelivers",
                column: "ChargeFromId");

            migrationBuilder.CreateIndex(
                name: "IX_ChargeFrom_CustomerId",
                table: "ChargeFrom",
                column: "CustomerId");

            migrationBuilder.CreateIndex(
                name: "IX_ChargeFrom_PartnerId",
                table: "ChargeFrom",
                column: "PartnerId");

            migrationBuilder.AddForeignKey(
                name: "FK_CollectsDelivers_ChargeFrom_ChargeFromId",
                table: "CollectsDelivers",
                column: "ChargeFromId",
                principalTable: "ChargeFrom",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CollectsDelivers_ChargeFrom_ChargeFromId",
                table: "CollectsDelivers");

            migrationBuilder.DropTable(
                name: "ChargeFrom");

            migrationBuilder.DropIndex(
                name: "IX_CollectsDelivers_ChargeFromId",
                table: "CollectsDelivers");

            migrationBuilder.DropColumn(
                name: "NormalizedName",
                table: "Customers");

            migrationBuilder.DropColumn(
                name: "ChargeFromId",
                table: "CollectsDelivers");

            migrationBuilder.AddColumn<string>(
                name: "ChargeFrom",
                table: "CollectsDelivers",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");
        }
    }
}
