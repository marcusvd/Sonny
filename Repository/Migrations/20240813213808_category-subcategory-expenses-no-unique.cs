using Microsoft.EntityFrameworkCore.Migrations;

namespace Repository.Migrations
{
    public partial class categorysubcategoryexpensesnounique : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_FN_SubcategoriesExpenses_Name",
                table: "FN_SubcategoriesExpenses");

            migrationBuilder.DropIndex(
                name: "IX_FN_CategoryExpenses_Name",
                table: "FN_CategoryExpenses");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "FN_SubcategoriesExpenses",
                type: "longtext",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(255)")
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "FN_CategoryExpenses",
                type: "longtext",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(255)")
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "FN_SubcategoriesExpenses",
                type: "varchar(255)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "longtext",
                oldNullable: true)
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "FN_CategoryExpenses",
                type: "varchar(255)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "longtext",
                oldNullable: true)
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_FN_SubcategoriesExpenses_Name",
                table: "FN_SubcategoriesExpenses",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_FN_CategoryExpenses_Name",
                table: "FN_CategoryExpenses",
                column: "Name",
                unique: true);
        }
    }
}
