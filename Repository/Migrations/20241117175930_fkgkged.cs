using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Repository.Migrations
{
    public partial class fkgkged : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PD_Products_PD_Manufacturers_ManufacturerId",
                table: "PD_Products");

            migrationBuilder.DropForeignKey(
                name: "FK_PD_Products_PD_Models_ModelId",
                table: "PD_Products");

            migrationBuilder.DropForeignKey(
                name: "FK_PD_Products_PD_Segments_SegmentId",
                table: "PD_Products");

            migrationBuilder.AlterColumn<int>(
                name: "SegmentId",
                table: "PD_Products",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "ModelId",
                table: "PD_Products",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "ManufacturerId",
                table: "PD_Products",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "IsTested",
                table: "PD_ItemsProducts",
                type: "datetime(6)",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "tinyint(1)");

            migrationBuilder.AddForeignKey(
                name: "FK_PD_Products_PD_Manufacturers_ManufacturerId",
                table: "PD_Products",
                column: "ManufacturerId",
                principalTable: "PD_Manufacturers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PD_Products_PD_Models_ModelId",
                table: "PD_Products",
                column: "ModelId",
                principalTable: "PD_Models",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PD_Products_PD_Segments_SegmentId",
                table: "PD_Products",
                column: "SegmentId",
                principalTable: "PD_Segments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PD_Products_PD_Manufacturers_ManufacturerId",
                table: "PD_Products");

            migrationBuilder.DropForeignKey(
                name: "FK_PD_Products_PD_Models_ModelId",
                table: "PD_Products");

            migrationBuilder.DropForeignKey(
                name: "FK_PD_Products_PD_Segments_SegmentId",
                table: "PD_Products");

            migrationBuilder.AlterColumn<int>(
                name: "SegmentId",
                table: "PD_Products",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "ModelId",
                table: "PD_Products",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "ManufacturerId",
                table: "PD_Products",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<bool>(
                name: "IsTested",
                table: "PD_ItemsProducts",
                type: "tinyint(1)",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime(6)");

            migrationBuilder.AddForeignKey(
                name: "FK_PD_Products_PD_Manufacturers_ManufacturerId",
                table: "PD_Products",
                column: "ManufacturerId",
                principalTable: "PD_Manufacturers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_PD_Products_PD_Models_ModelId",
                table: "PD_Products",
                column: "ModelId",
                principalTable: "PD_Models",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_PD_Products_PD_Segments_SegmentId",
                table: "PD_Products",
                column: "SegmentId",
                principalTable: "PD_Segments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
