using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Repository.Migrations
{
    public partial class CHangeds : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FixedCostAssured",
                table: "MN_PhysicallyMovingCosts");

            migrationBuilder.AddColumn<int>(
                name: "AdditionalCostsId",
                table: "MN_Customers",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "AdditionalCosts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    FixedPhysicallyMovingCosts = table.Column<decimal>(type: "decimal(65,30)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AdditionalCosts", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_MN_Customers_AdditionalCostsId",
                table: "MN_Customers",
                column: "AdditionalCostsId");

            migrationBuilder.AddForeignKey(
                name: "FK_MN_Customers_AdditionalCosts_AdditionalCostsId",
                table: "MN_Customers",
                column: "AdditionalCostsId",
                principalTable: "AdditionalCosts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MN_Customers_AdditionalCosts_AdditionalCostsId",
                table: "MN_Customers");

            migrationBuilder.DropTable(
                name: "AdditionalCosts");

            migrationBuilder.DropIndex(
                name: "IX_MN_Customers_AdditionalCostsId",
                table: "MN_Customers");

            migrationBuilder.DropColumn(
                name: "AdditionalCostsId",
                table: "MN_Customers");

            migrationBuilder.AddColumn<decimal>(
                name: "FixedCostAssured",
                table: "MN_PhysicallyMovingCosts",
                type: "decimal(65,30)",
                nullable: false,
                defaultValue: 0m);
        }
    }
}
