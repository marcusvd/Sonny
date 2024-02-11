using Microsoft.EntityFrameworkCore.Migrations;

namespace Repository.Migrations
{
    public partial class itemproduct12 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "PD_Segments_Fillers",
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
                table: "PD_Models_Fillers",
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
                table: "PD_Manufacturers_Fillers",
                type: "varchar(255)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "longtext",
                oldNullable: true)
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_PD_Segments_Fillers_Name",
                table: "PD_Segments_Fillers",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_PD_Models_Fillers_Name",
                table: "PD_Models_Fillers",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_PD_Manufacturers_Fillers_Name",
                table: "PD_Manufacturers_Fillers",
                column: "Name",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_PD_Segments_Fillers_Name",
                table: "PD_Segments_Fillers");

            migrationBuilder.DropIndex(
                name: "IX_PD_Models_Fillers_Name",
                table: "PD_Models_Fillers");

            migrationBuilder.DropIndex(
                name: "IX_PD_Manufacturers_Fillers_Name",
                table: "PD_Manufacturers_Fillers");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "PD_Segments_Fillers",
                type: "longtext",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(255)")
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "PD_Models_Fillers",
                type: "longtext",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(255)")
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "PD_Manufacturers_Fillers",
                type: "longtext",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(255)")
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");
        }
    }
}
