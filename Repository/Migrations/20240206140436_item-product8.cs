using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Repository.Migrations
{
    public partial class itemproduct8 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PD_Equipament_Fillers");

            migrationBuilder.DropTable(
                name: "PD_Manufacturer_Fillers");

            migrationBuilder.DropTable(
                name: "PD_Segment_Fillers");

            migrationBuilder.CreateTable(
                name: "PD_Items_Fillers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    CompanyId = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Description = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PD_Items_Fillers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PD_Items_Fillers_MN_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "MN_Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Manufacturers_Fillers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    ItemId = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Manufacturers_Fillers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Manufacturers_Fillers_PD_Items_Fillers_ItemId",
                        column: x => x.ItemId,
                        principalTable: "PD_Items_Fillers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "PD_Models_Fillers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    ItemId = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PD_Models_Fillers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PD_Models_Fillers_PD_Items_Fillers_ItemId",
                        column: x => x.ItemId,
                        principalTable: "PD_Items_Fillers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "PD_Segments_Fillers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    ItemId = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PD_Segments_Fillers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PD_Segments_Fillers_PD_Items_Fillers_ItemId",
                        column: x => x.ItemId,
                        principalTable: "PD_Items_Fillers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_Manufacturers_Fillers_ItemId",
                table: "Manufacturers_Fillers",
                column: "ItemId");

            migrationBuilder.CreateIndex(
                name: "IX_PD_Items_Fillers_CompanyId",
                table: "PD_Items_Fillers",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_PD_Models_Fillers_ItemId",
                table: "PD_Models_Fillers",
                column: "ItemId");

            migrationBuilder.CreateIndex(
                name: "IX_PD_Segments_Fillers_ItemId",
                table: "PD_Segments_Fillers",
                column: "ItemId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Manufacturers_Fillers");

            migrationBuilder.DropTable(
                name: "PD_Models_Fillers");

            migrationBuilder.DropTable(
                name: "PD_Segments_Fillers");

            migrationBuilder.DropTable(
                name: "PD_Items_Fillers");

            migrationBuilder.CreateTable(
                name: "PD_Equipament_Fillers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    CompanyId = table.Column<int>(type: "int", nullable: false),
                    Equipament = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PD_Equipament_Fillers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PD_Equipament_Fillers_MN_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "MN_Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "PD_Manufacturer_Fillers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    CompanyId = table.Column<int>(type: "int", nullable: false),
                    Manufacturer = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PD_Manufacturer_Fillers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PD_Manufacturer_Fillers_MN_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "MN_Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "PD_Segment_Fillers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    CompanyId = table.Column<int>(type: "int", nullable: false),
                    Segment = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PD_Segment_Fillers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PD_Segment_Fillers_MN_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "MN_Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_PD_Equipament_Fillers_CompanyId",
                table: "PD_Equipament_Fillers",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_PD_Equipament_Fillers_Equipament",
                table: "PD_Equipament_Fillers",
                column: "Equipament",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_PD_Manufacturer_Fillers_CompanyId",
                table: "PD_Manufacturer_Fillers",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_PD_Manufacturer_Fillers_Manufacturer",
                table: "PD_Manufacturer_Fillers",
                column: "Manufacturer",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_PD_Segment_Fillers_CompanyId",
                table: "PD_Segment_Fillers",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_PD_Segment_Fillers_Segment",
                table: "PD_Segment_Fillers",
                column: "Segment",
                unique: true);
        }
    }
}
