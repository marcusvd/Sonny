using Microsoft.EntityFrameworkCore.Migrations;

namespace Repository.Migrations
{
    public partial class itemproduct14 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_PD_Models_Fillers_Name",
                table: "PD_Models_Fillers");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "PD_Models_Fillers",
                type: "longtext",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(255)")
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "PD_Models_Fillers",
                type: "varchar(255)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "longtext")
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_PD_Models_Fillers_Name",
                table: "PD_Models_Fillers",
                column: "Name",
                unique: true);
        }
    }
}
