using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Repository.Migrations
{
    public partial class change_table_month_expenses_fillers_to_categoryExpenses : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {}

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FN_MonthFixedExpenses_FN_CategoryExpenses_CategoryExpensesId",
                table: "FN_MonthFixedExpenses");

            migrationBuilder.DropTable(
                name: "FN_CategoryExpenses");

            migrationBuilder.RenameColumn(
                name: "Description",
                table: "FN_MonthFixedExpenses",
                newName: "NameIdentification");

            migrationBuilder.RenameColumn(
                name: "CategoryExpensesId",
                table: "FN_MonthFixedExpenses",
                newName: "NameId");

            migrationBuilder.RenameIndex(
                name: "IX_FN_MonthFixedExpenses_CategoryExpensesId",
                table: "FN_MonthFixedExpenses",
                newName: "IX_FN_MonthFixedExpenses_NameId");

            migrationBuilder.CreateTable(
                name: "FN_MonthFixedExpenses_Fillers",
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
                    table.PrimaryKey("PK_FN_MonthFixedExpenses_Fillers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FN_MonthFixedExpenses_Fillers_MN_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "MN_Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_FN_MonthFixedExpenses_Fillers_CompanyId",
                table: "FN_MonthFixedExpenses_Fillers",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_FN_MonthFixedExpenses_Fillers_ExpensesName",
                table: "FN_MonthFixedExpenses_Fillers",
                column: "ExpensesName",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_FN_MonthFixedExpenses_FN_MonthFixedExpenses_Fillers_NameId",
                table: "FN_MonthFixedExpenses",
                column: "NameId",
                principalTable: "FN_MonthFixedExpenses_Fillers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
