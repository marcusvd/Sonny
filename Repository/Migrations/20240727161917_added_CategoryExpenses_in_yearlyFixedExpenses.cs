using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Repository.Migrations
{
    public partial class added_CategoryExpenses_in_yearlyFixedExpenses : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // migrationBuilder.DropForeignKey(
            //     name: "FK_FN_YearlyFixedExpenses_FN_YearlyFixedExpenses_Fillers_NameId",
            //     table: "FN_YearlyFixedExpenses");

            // migrationBuilder.DropTable(
            //     name: "FN_YearlyFixedExpenses_Fillers");

            // migrationBuilder.RenameColumn(
            //     name: "NameIdentification",
            //     table: "FN_YearlyFixedExpenses",
            //     newName: "Description");

            // migrationBuilder.RenameColumn(
            //     name: "NameId",
            //     table: "FN_YearlyFixedExpenses",
            //     newName: "CategoryExpensesId");

            // migrationBuilder.RenameIndex(
            //     name: "IX_FN_YearlyFixedExpenses_NameId",
            //     table: "FN_YearlyFixedExpenses",
            //     newName: "IX_FN_YearlyFixedExpenses_CategoryExpensesId");

            // migrationBuilder.AddForeignKey(
            //     name: "FK_FN_YearlyFixedExpenses_FN_CategoryExpenses_CategoryExpensesId",
            //     table: "FN_YearlyFixedExpenses",
            //     column: "CategoryExpensesId",
            //     principalTable: "FN_CategoryExpenses",
            //     principalColumn: "Id",
            //     onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FN_YearlyFixedExpenses_FN_CategoryExpenses_CategoryExpensesId",
                table: "FN_YearlyFixedExpenses");

            migrationBuilder.RenameColumn(
                name: "Description",
                table: "FN_YearlyFixedExpenses",
                newName: "NameIdentification");

            migrationBuilder.RenameColumn(
                name: "CategoryExpensesId",
                table: "FN_YearlyFixedExpenses",
                newName: "NameId");

            migrationBuilder.RenameIndex(
                name: "IX_FN_YearlyFixedExpenses_CategoryExpensesId",
                table: "FN_YearlyFixedExpenses",
                newName: "IX_FN_YearlyFixedExpenses_NameId");

            migrationBuilder.CreateTable(
                name: "FN_YearlyFixedExpenses_Fillers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    CompanyId = table.Column<int>(type: "int", nullable: false),
                    Deleted = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    ExpensesName = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
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

            migrationBuilder.CreateIndex(
                name: "IX_FN_YearlyFixedExpenses_Fillers_CompanyId",
                table: "FN_YearlyFixedExpenses_Fillers",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_FN_YearlyFixedExpenses_Fillers_ExpensesName",
                table: "FN_YearlyFixedExpenses_Fillers",
                column: "ExpensesName",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_FN_YearlyFixedExpenses_FN_YearlyFixedExpenses_Fillers_NameId",
                table: "FN_YearlyFixedExpenses",
                column: "NameId",
                principalTable: "FN_YearlyFixedExpenses_Fillers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
