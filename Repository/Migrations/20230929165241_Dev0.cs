using Microsoft.EntityFrameworkCore.Migrations;

namespace Repository.Migrations
{
    public partial class Dev0 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "PD_EquipamentTypes",
                type: "varchar(255)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "longtext",
                oldNullable: true)
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<int>(
                name: "CompanyId",
                table: "BS_TableProvidedServicesPrices",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_PD_EquipamentTypes_Name",
                table: "PD_EquipamentTypes",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_BS_TableProvidedServicesPrices_CompanyId",
                table: "BS_TableProvidedServicesPrices",
                column: "CompanyId");

            migrationBuilder.AddForeignKey(
                name: "FK_BS_TableProvidedServicesPrices_MN_Companies_CompanyId",
                table: "BS_TableProvidedServicesPrices",
                column: "CompanyId",
                principalTable: "MN_Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BS_TableProvidedServicesPrices_MN_Companies_CompanyId",
                table: "BS_TableProvidedServicesPrices");

            migrationBuilder.DropIndex(
                name: "IX_PD_EquipamentTypes_Name",
                table: "PD_EquipamentTypes");

            migrationBuilder.DropIndex(
                name: "IX_BS_TableProvidedServicesPrices_CompanyId",
                table: "BS_TableProvidedServicesPrices");

            migrationBuilder.DropColumn(
                name: "CompanyId",
                table: "BS_TableProvidedServicesPrices");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "PD_EquipamentTypes",
                type: "longtext",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(255)")
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");
        }
    }
}
