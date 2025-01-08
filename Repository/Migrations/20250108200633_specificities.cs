using Microsoft.EntityFrameworkCore.Migrations;

namespace Repository.Migrations
{
    public partial class specificities : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PD_Specificities_PD_Models_ModelId",
                table: "PD_Specificities");

            migrationBuilder.DropIndex(
                name: "IX_PD_Specificities_ModelId",
                table: "PD_Specificities");

            migrationBuilder.DropColumn(
                name: "ModelId",
                table: "PD_Specificities");

            migrationBuilder.AddColumn<int>(
                name: "SpecificitiesId",
                table: "PD_Models",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_PD_Models_SpecificitiesId",
                table: "PD_Models",
                column: "SpecificitiesId");

            migrationBuilder.AddForeignKey(
                name: "FK_PD_Models_PD_Specificities_SpecificitiesId",
                table: "PD_Models",
                column: "SpecificitiesId",
                principalTable: "PD_Specificities",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PD_Models_PD_Specificities_SpecificitiesId",
                table: "PD_Models");

            migrationBuilder.DropIndex(
                name: "IX_PD_Models_SpecificitiesId",
                table: "PD_Models");

            migrationBuilder.DropColumn(
                name: "SpecificitiesId",
                table: "PD_Models");

            migrationBuilder.AddColumn<int>(
                name: "ModelId",
                table: "PD_Specificities",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_PD_Specificities_ModelId",
                table: "PD_Specificities",
                column: "ModelId");

            migrationBuilder.AddForeignKey(
                name: "FK_PD_Specificities_PD_Models_ModelId",
                table: "PD_Specificities",
                column: "ModelId",
                principalTable: "PD_Models",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
