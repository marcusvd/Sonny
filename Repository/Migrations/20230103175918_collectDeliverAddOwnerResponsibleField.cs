using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Repository.Migrations
{
    public partial class collectDeliverAddOwnerResponsibleField : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ImgPath");

            migrationBuilder.DropTable(
                name: "OsRemoveEquipament");

            migrationBuilder.DropTable(
                name: "NetworkDevices");

            migrationBuilder.DeleteData(
                table: "Addresses",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Addresses",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Addresses",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Addresses",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Addresses",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Addresses",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Addresses",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Contacts",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Contacts",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Contacts",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Contacts",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Contacts",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Contacts",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Contacts",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "Partners",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Partners",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Partners",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Partners",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Partners",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "TypesPayments",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "TypesPayments",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "TypesPayments",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "TypesPayments",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.AddColumn<string>(
                name: "OwnerResponsible",
                table: "CollectsDelivers",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "OwnerResponsible",
                table: "CollectsDelivers");

            migrationBuilder.CreateTable(
                name: "NetworkDevices",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Apps = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ClientId = table.Column<int>(type: "int", nullable: false),
                    Connectivity = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CustomerId = table.Column<int>(type: "int", nullable: true),
                    Door = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Equipament = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Ip = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Mac = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Manufacturer = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Model = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Notes = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Password = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    PhysicalLocation = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Sn = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ToSeach = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    User = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NetworkDevices", x => x.Id);
                    table.ForeignKey(
                        name: "FK_NetworkDevices_Customers_CustomerId",
                        column: x => x.CustomerId,
                        principalTable: "Customers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "OsRemoveEquipament",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Client = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Equipament = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Model = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Problem = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Pwd = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Start = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    Usr = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OsRemoveEquipament", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "ImgPath",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    NetworkDeviceId = table.Column<int>(type: "int", nullable: true),
                    img = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ImgPath", x => x.id);
                    table.ForeignKey(
                        name: "FK_ImgPath_NetworkDevices_NetworkDeviceId",
                        column: x => x.NetworkDeviceId,
                        principalTable: "NetworkDevices",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.InsertData(
                table: "Addresses",
                columns: new[] { "Id", "City", "Complement", "District", "Number", "State", "Street", "ZipCode" },
                values: new object[,]
                {
                    { 3, "Belo Horizonte", "", "Funcionários", "446", "MG", "Av. Getúlio Vargas", "30112-020" },
                    { 7, "Belo Horizonte", "", "Milionários", "25", "MG", " R. Maringá", "30620-270" },
                    { 6, "-------------", "", "-------------", "-------------", "-------------", "-------------", "-------------" },
                    { 5, "Belo Horizonte", "", "Horizontes", "4678", "MG", "R. Camanducaia", "98989-4856" },
                    { 1, "Belo Horizonte", "", "Santa Efigênia", "123", "MG", "R. Padre Rolim", "31255-080" },
                    { 2, "Belo Horizonte", " sala 801", "Floresta", "32", "MG", " R. Curvelo", "31015-172" },
                    { 4, "Belo Horizonte", "", "Pompéia", "95", "MG", "R. Veredinha", "30280-520" }
                });

            migrationBuilder.InsertData(
                table: "Contacts",
                columns: new[] { "Id", "Cel", "Email", "Landline", "Site", "Zap" },
                values: new object[,]
                {
                    { 6, "(31) 9-9999-9999", "marcelo@marcelomotoca.com.br", "(31) 9999-9999", null, "(31) 9-9999-9999" },
                    { 5, "(31) 9-8553-2934", "comercial@perfectprint.com.br", "(31) 3272-7620", null, "(31) 9-8553-2934" },
                    { 4, "(31) 9-9851-1532", "oppen@oppeninformatica.com.br", "(31) 3234-4661", null, "(31) 9-9851-1532" },
                    { 3, "(31) 9-9851-1532", "oppen@oppeninformatica.com.br", "(31) 3234-4661", null, "(31) 9-9851-1532" },
                    { 2, "(31) 9-8859-8734", "lucas@laenderevianna.com.br", "(31) 2516-2327", null, "(31) 9-8859-8734" },
                    { 8, "", "comercial@comercialrosasantos.com.br", "(31) 2512-6346", null, "" },
                    { 7, "-------------", "-------------", "-------------", null, "-------------" }
                });

            migrationBuilder.InsertData(
                table: "Partners",
                columns: new[] { "Id", "AddressId", "BusinessLine", "CNPJ", "Comments", "ContactId", "EletronicRepair", "HardwareSupplier", "Name", "Registered", "Responsible", "Transporter" },
                values: new object[,]
                {
                    { 5, null, "Motoboy faz e desfaz qualquer treta!", "", "De confiança!", null, false, false, "Marcelinho Motoca", new DateTime(2022, 12, 7, 11, 34, 42, 544, DateTimeKind.Local).AddTicks(5638), "Marcelo Duarte", false },
                    { 4, null, "Assistência técnica, aluguel e venda de periféricos e impressoras", "", "", null, false, false, "Perfect print", new DateTime(2022, 12, 7, 11, 34, 42, 544, DateTimeKind.Local).AddTicks(5633), "Luiz Junior", false },
                    { 3, null, "FORNECEDOR HARDWARE", "", "", null, false, false, "Oficina dos Bits", new DateTime(2022, 12, 7, 11, 34, 42, 544, DateTimeKind.Local).AddTicks(5628), "Claudio Nogueira", false },
                    { 2, null, "FORNECEDOR HARDWARE", "", "", null, false, false, "Oppen Informática", new DateTime(2022, 12, 7, 11, 34, 42, 544, DateTimeKind.Local).AddTicks(5585), "Juliano", false },
                    { 1, null, "Desenvolvimento de softwares e supporte a redes", "", "", null, false, false, "BaseDeTroca", new DateTime(2022, 12, 7, 11, 34, 42, 542, DateTimeKind.Local).AddTicks(7062), "Marcus Vinícius Dias", false }
                });

            migrationBuilder.InsertData(
                table: "TypesPayments",
                columns: new[] { "Id", "Description", "Name" },
                values: new object[,]
                {
                    { 4, "Credito", "Credito" },
                    { 3, "Débito", "Débito" },
                    { 2, "", "Pix" },
                    { 1, "Pagamento em espécie.", "Dinheiro" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_ImgPath_NetworkDeviceId",
                table: "ImgPath",
                column: "NetworkDeviceId");

            migrationBuilder.CreateIndex(
                name: "IX_NetworkDevices_CustomerId",
                table: "NetworkDevices",
                column: "CustomerId");
        }
    }
}
