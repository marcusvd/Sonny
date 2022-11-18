using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Repository.Migrations
{
    public partial class Magrela : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Addresses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    ZipCode = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Street = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Number = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    District = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    City = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    State = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Complement = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Addresses", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "CheckingAccounts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Institution = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Holder = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Agency = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Manager = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Account = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Pix = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Balance = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    Typeaccount = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Description = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CheckingAccounts", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Contacts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Email = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Site = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Cel = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Zap = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Landline = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Contacts", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Equipaments",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Description = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Equipaments", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "MonthlyOutFlows",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Amount = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    Institution = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Started = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    Expiration = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    Installment = table.Column<int>(type: "int", nullable: false),
                    Duplicateurl = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    User = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Password = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Description = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MonthlyOutFlows", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "OsRemoveEquipament",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Start = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    Client = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Usr = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Pwd = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Model = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Equipament = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Problem = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OsRemoveEquipament", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "TypesPayments",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Description = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TypesPayments", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Cards",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Holder = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Flag = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Limit = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    Typeaccount = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Numbercard = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Checkcode = table.Column<int>(type: "int", nullable: false),
                    Description = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Validate = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    CheckingAccountId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cards", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Cards_CheckingAccounts_CheckingAccountId",
                        column: x => x.CheckingAccountId,
                        principalTable: "CheckingAccounts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Companies",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    AddressId = table.Column<int>(type: "int", nullable: false),
                    ContactId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Companies", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Companies_Addresses_AddressId",
                        column: x => x.AddressId,
                        principalTable: "Addresses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Companies_Contacts_ContactId",
                        column: x => x.ContactId,
                        principalTable: "Contacts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Customers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CNPJ = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Responsible = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Comments = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Assured = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    CustomerType = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    Payment = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    Expiration = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    Disabled = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    ToBusinessBox = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    Discount = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    AddressId = table.Column<int>(type: "int", nullable: true),
                    ContactId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Customers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Customers_Addresses_AddressId",
                        column: x => x.AddressId,
                        principalTable: "Addresses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Customers_Contacts_ContactId",
                        column: x => x.ContactId,
                        principalTable: "Contacts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Partners",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Today = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    CNPJ = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Responsible = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Comments = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    BusinessLine = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Transporter = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    Supplier = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    AddressId = table.Column<int>(type: "int", nullable: false),
                    ContactId = table.Column<int>(type: "int", nullable: false),
                    ToSeach = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Partners", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Partners_Addresses_AddressId",
                        column: x => x.AddressId,
                        principalTable: "Addresses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Partners_Contacts_ContactId",
                        column: x => x.ContactId,
                        principalTable: "Contacts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "socialnetworks",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Url = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ContactId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_socialnetworks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_socialnetworks_Contacts_ContactId",
                        column: x => x.ContactId,
                        principalTable: "Contacts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "InterestCorrection",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Reason = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    price = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    Date = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    MonthlyOutFlowId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InterestCorrection", x => x.Id);
                    table.ForeignKey(
                        name: "FK_InterestCorrection_MonthlyOutFlows_MonthlyOutFlowId",
                        column: x => x.MonthlyOutFlowId,
                        principalTable: "MonthlyOutFlows",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "DailyOutFlows",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Today = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    Name = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Amount = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    PersonOrPlace = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    TypepaymentId = table.Column<int>(type: "int", nullable: false),
                    CheckingaccountId = table.Column<int>(type: "int", nullable: false),
                    Description = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DailyOutFlows", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DailyOutFlows_CheckingAccounts_CheckingaccountId",
                        column: x => x.CheckingaccountId,
                        principalTable: "CheckingAccounts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DailyOutFlows_TypesPayments_TypepaymentId",
                        column: x => x.TypepaymentId,
                        principalTable: "TypesPayments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "DailyInFlows",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Today = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CustomerId = table.Column<int>(type: "int", nullable: false),
                    TypepaymentId = table.Column<int>(type: "int", nullable: false),
                    CheckingaccountId = table.Column<int>(type: "int", nullable: false),
                    Amount = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Description = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DailyInFlows", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DailyInFlows_CheckingAccounts_CheckingaccountId",
                        column: x => x.CheckingaccountId,
                        principalTable: "CheckingAccounts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DailyInFlows_Customers_CustomerId",
                        column: x => x.CustomerId,
                        principalTable: "Customers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DailyInFlows_TypesPayments_TypepaymentId",
                        column: x => x.TypepaymentId,
                        principalTable: "TypesPayments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "NetworkDevices",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    ClientId = table.Column<int>(type: "int", nullable: false),
                    CustomerId = table.Column<int>(type: "int", nullable: true),
                    Equipament = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Manufacturer = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Model = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    User = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    PhysicalLocation = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Password = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Sn = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Ip = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Mac = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Door = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Apps = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Connectivity = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Notes = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ToSeach = table.Column<string>(type: "longtext", nullable: true)
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
                name: "ServicesBench",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    CustomerId = table.Column<int>(type: "int", nullable: false),
                    DateServiceStarted = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    DateServiceFinished = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    Finished = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    Remote = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    RemoteAccessData = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Visually = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Status = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ServicesBench", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ServicesBench_Customers_CustomerId",
                        column: x => x.CustomerId,
                        principalTable: "Customers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "ServicesBudgets",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    CustomerId = table.Column<int>(type: "int", nullable: false),
                    BudgetStartedIn = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    Visually = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    RemoteAccessData = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ClientProblems = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    BenchStartedIn = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    Status = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Authorized = table.Column<bool>(type: "tinyint(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ServicesBudgets", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ServicesBudgets_Customers_CustomerId",
                        column: x => x.CustomerId,
                        principalTable: "Customers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "CollectsDelivers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    TransporterNoregisterd = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    TransporterId = table.Column<int>(type: "int", nullable: true),
                    Subject = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    SourceCustomerId = table.Column<int>(type: "int", nullable: true),
                    SourcePartnerId = table.Column<int>(type: "int", nullable: true),
                    SourceCompanyId = table.Column<int>(type: "int", nullable: true),
                    SourceNoRegisterName = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    SourceNoRegisterAddress = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    DestinyCustomerId = table.Column<int>(type: "int", nullable: true),
                    DestinyPartnerId = table.Column<int>(type: "int", nullable: true),
                    DestinyCompanyId = table.Column<int>(type: "int", nullable: true),
                    DestinyNoRegisterName = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    DestinyNoRegisterAddress = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Start = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    Price = table.Column<int>(type: "int", nullable: true),
                    Items = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Comments = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CollectsDelivers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CollectsDelivers_Companies_DestinyCompanyId",
                        column: x => x.DestinyCompanyId,
                        principalTable: "Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_CollectsDelivers_Companies_SourceCompanyId",
                        column: x => x.SourceCompanyId,
                        principalTable: "Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_CollectsDelivers_Customers_DestinyCustomerId",
                        column: x => x.DestinyCustomerId,
                        principalTable: "Customers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_CollectsDelivers_Customers_SourceCustomerId",
                        column: x => x.SourceCustomerId,
                        principalTable: "Customers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_CollectsDelivers_Partners_DestinyPartnerId",
                        column: x => x.DestinyPartnerId,
                        principalTable: "Partners",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_CollectsDelivers_Partners_SourcePartnerId",
                        column: x => x.SourcePartnerId,
                        principalTable: "Partners",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_CollectsDelivers_Partners_TransporterId",
                        column: x => x.TransporterId,
                        principalTable: "Partners",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "EletronicsRepairs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Item = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    day = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    Problem = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    User = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Password = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Price = table.Column<int>(type: "int", nullable: false),
                    PartnerId = table.Column<int>(type: "int", nullable: false),
                    solution = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Authorized = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    Finished = table.Column<bool>(type: "tinyint(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EletronicsRepairs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EletronicsRepairs_Partners_PartnerId",
                        column: x => x.PartnerId,
                        principalTable: "Partners",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Inventories",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    EquipamentId = table.Column<int>(type: "int", nullable: false),
                    Cost = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    Saleprice = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    IsNew = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    Istested = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    Sold = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    PartnerId = table.Column<int>(type: "int", nullable: false),
                    Warranty = table.Column<int>(type: "int", nullable: false),
                    EntryDate = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    SoldDate = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    Sn = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Driver = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Manufactorer = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Model = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Generation = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Capacity = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Speed = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Comment = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Historical = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Inventories", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Inventories_Equipaments_EquipamentId",
                        column: x => x.EquipamentId,
                        principalTable: "Equipaments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Inventories_Partners_PartnerId",
                        column: x => x.PartnerId,
                        principalTable: "Partners",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "ImgPath",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    img = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    NetworkDeviceId = table.Column<int>(type: "int", nullable: true)
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

            migrationBuilder.CreateTable(
                name: "BenchToCashBox",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Technician = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    PriceService = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    ProblemByTechnician = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    TechnicalSolutionApplied = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Status = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Solved = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    ServiceBenchId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BenchToCashBox", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BenchToCashBox_ServicesBench_ServiceBenchId",
                        column: x => x.ServiceBenchId,
                        principalTable: "ServicesBench",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "SolutionsPrices",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    DateService = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    Technician = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    PriceService = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    ProblemByTechnician = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    TechnicalSolution = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Remote = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    Approved = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    ServiceBudgetId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SolutionsPrices", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SolutionsPrices_ServicesBudgets_ServiceBudgetId",
                        column: x => x.ServiceBudgetId,
                        principalTable: "ServicesBudgets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.InsertData(
                table: "Addresses",
                columns: new[] { "Id", "City", "Complement", "District", "Number", "State", "Street", "ZipCode" },
                values: new object[,]
                {
                    { 1, "Belo Horizonte", "", "Santa Efigênia", "123", "MG", "R. Padre Rolim", "31255-080" },
                    { 2, "Belo Horizonte", " sala 801", "Floresta", "32", "MG", " R. Curvelo", "31015-172" },
                    { 3, "Belo Horizonte", "", "Funcionários", "446", "MG", "Av. Getúlio Vargas", "30112-020" },
                    { 4, "Belo Horizonte", "", "Pompéia", "95", "MG", "R. Veredinha", "30280-520" },
                    { 5, "Belo Horizonte", "", "Horizontes", "4678", "MG", "R. Camanducaia", "98989-4856" },
                    { 6, "-------------", "", "-------------", "-------------", "-------------", "-------------", "-------------" },
                    { 7, "Belo Horizonte", "", "Milionários", "25", "MG", " R. Maringá", "30620-270" }
                });

            migrationBuilder.InsertData(
                table: "Contacts",
                columns: new[] { "Id", "Cel", "Email", "Landline", "Site", "Zap" },
                values: new object[,]
                {
                    { 8, "", "comercial@comercialrosasantos.com.br", "(31) 2512-6346", null, "" },
                    { 7, "-------------", "-------------", "-------------", null, "-------------" },
                    { 6, "(31) 9-9999-9999", "marcelo@marcelomotoca.com.br", "(31) 9999-9999", null, "(31) 9-9999-9999" },
                    { 4, "(31) 9-9851-1532", "oppen@oppeninformatica.com.br", "(31) 3234-4661", null, "(31) 9-9851-1532" },
                    { 3, "(31) 9-9851-1532", "oppen@oppeninformatica.com.br", "(31) 3234-4661", null, "(31) 9-9851-1532" },
                    { 2, "(31) 9-8859-8734", "lucas@laenderevianna.com.br", "(31) 2516-2327", null, "(31) 9-8859-8734" },
                    { 5, "(31) 9-8553-2934", "comercial@perfectprint.com.br", "(31) 3272-7620", null, "(31) 9-8553-2934" }
                });

            migrationBuilder.InsertData(
                table: "Equipaments",
                columns: new[] { "Id", "Description", "Name" },
                values: new object[,]
                {
                    { 8, null, "Mouse" },
                    { 12, null, "Adaptador" },
                    { 11, null, "Placa de rede" },
                    { 10, null, "Placa de Video" },
                    { 9, null, "Cooler" },
                    { 7, null, "Teclado" },
                    { 1, null, "Processadores" },
                    { 5, null, "Placa Mãe" },
                    { 4, null, "Fonte" },
                    { 3, null, "Armazenamento" },
                    { 2, null, "Memórias" },
                    { 6, null, "Monitor" }
                });

            migrationBuilder.InsertData(
                table: "TypesPayments",
                columns: new[] { "Id", "Description", "Name" },
                values: new object[,]
                {
                    { 3, "Débito", "Débito" },
                    { 1, "Pagamento em espécie.", "Dinheiro" },
                    { 2, "", "Pix" },
                    { 4, "Credito", "Credito" }
                });

            migrationBuilder.InsertData(
                table: "Partners",
                columns: new[] { "Id", "AddressId", "BusinessLine", "CNPJ", "Comments", "ContactId", "Name", "Responsible", "Supplier", "ToSeach", "Today", "Transporter" },
                values: new object[,]
                {
                    { 1, 4, "Desenvolvimento de softwares e supporte a redes", "", "", 4, "BaseDeTroca", "Marcus Vinícius Dias", false, "Oficina dos Bits Leonardo", new DateTime(2022, 11, 18, 13, 14, 46, 142, DateTimeKind.Local).AddTicks(8160), false },
                    { 2, 4, "Venda de hardware", "", "", 4, "Oppen Informática", "Juliano", true, "Oppen Informática Juliano", new DateTime(2022, 11, 18, 13, 14, 46, 144, DateTimeKind.Local).AddTicks(6667), false },
                    { 3, 4, "Venda de hardware", "", "", 4, "Oficina dos Bits", "Claudio Nogueira", true, "Oficina dos Bits Leonardo", new DateTime(2022, 11, 18, 13, 14, 46, 144, DateTimeKind.Local).AddTicks(6694), false },
                    { 4, 5, "Assistência técnica, aluguel e venda de periféricos e impressoras", "", "", 5, "Perfect print", "Luiz Junior", false, "Perfect print Luiz Junior", new DateTime(2022, 11, 18, 13, 14, 46, 144, DateTimeKind.Local).AddTicks(6699), false },
                    { 5, 6, "Motoboy faz e desfaz qualquer treta!", "", "De confiança!", 6, "Marcelinho Motoca", "Marcelo Duarte", false, "Perfect print Luiz Junior", new DateTime(2022, 11, 18, 13, 14, 46, 144, DateTimeKind.Local).AddTicks(6702), true }
                });

            migrationBuilder.CreateIndex(
                name: "IX_BenchToCashBox_ServiceBenchId",
                table: "BenchToCashBox",
                column: "ServiceBenchId");

            migrationBuilder.CreateIndex(
                name: "IX_Cards_CheckingAccountId",
                table: "Cards",
                column: "CheckingAccountId");

            migrationBuilder.CreateIndex(
                name: "IX_CollectsDelivers_DestinyCompanyId",
                table: "CollectsDelivers",
                column: "DestinyCompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_CollectsDelivers_DestinyCustomerId",
                table: "CollectsDelivers",
                column: "DestinyCustomerId");

            migrationBuilder.CreateIndex(
                name: "IX_CollectsDelivers_DestinyPartnerId",
                table: "CollectsDelivers",
                column: "DestinyPartnerId");

            migrationBuilder.CreateIndex(
                name: "IX_CollectsDelivers_SourceCompanyId",
                table: "CollectsDelivers",
                column: "SourceCompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_CollectsDelivers_SourceCustomerId",
                table: "CollectsDelivers",
                column: "SourceCustomerId");

            migrationBuilder.CreateIndex(
                name: "IX_CollectsDelivers_SourcePartnerId",
                table: "CollectsDelivers",
                column: "SourcePartnerId");

            migrationBuilder.CreateIndex(
                name: "IX_CollectsDelivers_TransporterId",
                table: "CollectsDelivers",
                column: "TransporterId");

            migrationBuilder.CreateIndex(
                name: "IX_Companies_AddressId",
                table: "Companies",
                column: "AddressId");

            migrationBuilder.CreateIndex(
                name: "IX_Companies_ContactId",
                table: "Companies",
                column: "ContactId");

            migrationBuilder.CreateIndex(
                name: "IX_Customers_AddressId",
                table: "Customers",
                column: "AddressId");

            migrationBuilder.CreateIndex(
                name: "IX_Customers_ContactId",
                table: "Customers",
                column: "ContactId");

            migrationBuilder.CreateIndex(
                name: "IX_DailyInFlows_CheckingaccountId",
                table: "DailyInFlows",
                column: "CheckingaccountId");

            migrationBuilder.CreateIndex(
                name: "IX_DailyInFlows_CustomerId",
                table: "DailyInFlows",
                column: "CustomerId");

            migrationBuilder.CreateIndex(
                name: "IX_DailyInFlows_TypepaymentId",
                table: "DailyInFlows",
                column: "TypepaymentId");

            migrationBuilder.CreateIndex(
                name: "IX_DailyOutFlows_CheckingaccountId",
                table: "DailyOutFlows",
                column: "CheckingaccountId");

            migrationBuilder.CreateIndex(
                name: "IX_DailyOutFlows_TypepaymentId",
                table: "DailyOutFlows",
                column: "TypepaymentId");

            migrationBuilder.CreateIndex(
                name: "IX_EletronicsRepairs_PartnerId",
                table: "EletronicsRepairs",
                column: "PartnerId");

            migrationBuilder.CreateIndex(
                name: "IX_ImgPath_NetworkDeviceId",
                table: "ImgPath",
                column: "NetworkDeviceId");

            migrationBuilder.CreateIndex(
                name: "IX_InterestCorrection_MonthlyOutFlowId",
                table: "InterestCorrection",
                column: "MonthlyOutFlowId");

            migrationBuilder.CreateIndex(
                name: "IX_Inventories_EquipamentId",
                table: "Inventories",
                column: "EquipamentId");

            migrationBuilder.CreateIndex(
                name: "IX_Inventories_PartnerId",
                table: "Inventories",
                column: "PartnerId");

            migrationBuilder.CreateIndex(
                name: "IX_NetworkDevices_CustomerId",
                table: "NetworkDevices",
                column: "CustomerId");

            migrationBuilder.CreateIndex(
                name: "IX_Partners_AddressId",
                table: "Partners",
                column: "AddressId");

            migrationBuilder.CreateIndex(
                name: "IX_Partners_ContactId",
                table: "Partners",
                column: "ContactId");

            migrationBuilder.CreateIndex(
                name: "IX_ServicesBench_CustomerId",
                table: "ServicesBench",
                column: "CustomerId");

            migrationBuilder.CreateIndex(
                name: "IX_ServicesBudgets_CustomerId",
                table: "ServicesBudgets",
                column: "CustomerId");

            migrationBuilder.CreateIndex(
                name: "IX_socialnetworks_ContactId",
                table: "socialnetworks",
                column: "ContactId");

            migrationBuilder.CreateIndex(
                name: "IX_SolutionsPrices_ServiceBudgetId",
                table: "SolutionsPrices",
                column: "ServiceBudgetId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BenchToCashBox");

            migrationBuilder.DropTable(
                name: "Cards");

            migrationBuilder.DropTable(
                name: "CollectsDelivers");

            migrationBuilder.DropTable(
                name: "DailyInFlows");

            migrationBuilder.DropTable(
                name: "DailyOutFlows");

            migrationBuilder.DropTable(
                name: "EletronicsRepairs");

            migrationBuilder.DropTable(
                name: "ImgPath");

            migrationBuilder.DropTable(
                name: "InterestCorrection");

            migrationBuilder.DropTable(
                name: "Inventories");

            migrationBuilder.DropTable(
                name: "OsRemoveEquipament");

            migrationBuilder.DropTable(
                name: "socialnetworks");

            migrationBuilder.DropTable(
                name: "SolutionsPrices");

            migrationBuilder.DropTable(
                name: "ServicesBench");

            migrationBuilder.DropTable(
                name: "Companies");

            migrationBuilder.DropTable(
                name: "CheckingAccounts");

            migrationBuilder.DropTable(
                name: "TypesPayments");

            migrationBuilder.DropTable(
                name: "NetworkDevices");

            migrationBuilder.DropTable(
                name: "MonthlyOutFlows");

            migrationBuilder.DropTable(
                name: "Equipaments");

            migrationBuilder.DropTable(
                name: "Partners");

            migrationBuilder.DropTable(
                name: "ServicesBudgets");

            migrationBuilder.DropTable(
                name: "Customers");

            migrationBuilder.DropTable(
                name: "Addresses");

            migrationBuilder.DropTable(
                name: "Contacts");
        }
    }
}
