using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Repository.Migrations
{
    public partial class pokm : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "aspnetRoleClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    RoleId = table.Column<int>(type: "int", nullable: false),
                    ClaimType = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ClaimValue = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_aspnetRoleClaims", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "aspnetRoles",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    NormalizedName = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ConcurrencyStamp = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Discriminator = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_aspnetRoles", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "aspnetUserClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    ClaimType = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ClaimValue = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_aspnetUserClaims", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "aspnetUserLogins",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    LoginProvider = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ProviderKey = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ProviderDisplayName = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_aspnetUserLogins", x => x.UserId);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "AspNetUserTokens",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "int", nullable: false),
                    LoginProvider = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Name = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Value = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserTokens", x => new { x.UserId, x.LoginProvider, x.Name });
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "BS_CollectsDeliversCosts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    RoundTrip = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    CostFrom = table.Column<int>(type: "int", nullable: false),
                    Price = table.Column<decimal>(type: "decimal(65,30)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BS_CollectsDeliversCosts", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "MN_PhysicallyMovingCosts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    FixedCostAssured = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    Fuel = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    Apps = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    PublicTransport = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    MotoBoy = table.Column<decimal>(type: "decimal(65,30)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MN_PhysicallyMovingCosts", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "PD_Equipaments",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Manufacturer = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Segment = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Model = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Description = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PD_Equipaments", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "SD_Addresses",
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
                    table.PrimaryKey("PK_SD_Addresses", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "SD_Contacts",
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
                    table.PrimaryKey("PK_SD_Contacts", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "UserProfile",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    UserProfileImage = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserProfile", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "MN_Companies",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    AddressId = table.Column<int>(type: "int", nullable: true),
                    ContactId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MN_Companies", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MN_Companies_SD_Addresses_AddressId",
                        column: x => x.AddressId,
                        principalTable: "SD_Addresses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_MN_Companies_SD_Contacts_ContactId",
                        column: x => x.ContactId,
                        principalTable: "SD_Contacts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "SD_socialnetworks",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Url = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ContactId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SD_socialnetworks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SD_socialnetworks_SD_Contacts_ContactId",
                        column: x => x.ContactId,
                        principalTable: "SD_Contacts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "aspnetUsers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    UserName = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    NormalizedUserName = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Email = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    NormalizedEmail = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    EmailConfirmed = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    PasswordHash = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    SecurityStamp = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ConcurrencyStamp = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    PhoneNumber = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    PhoneNumberConfirmed = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    TwoFactorEnabled = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(type: "datetime(6)", nullable: true),
                    LockoutEnabled = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    AccessFailedCount = table.Column<int>(type: "int", nullable: false),
                    Discriminator = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CompanyId = table.Column<int>(type: "int", nullable: true),
                    ProfileId = table.Column<int>(type: "int", nullable: true),
                    AddressId = table.Column<int>(type: "int", nullable: true),
                    ContactId = table.Column<int>(type: "int", nullable: true),
                    Group = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_aspnetUsers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_aspnetUsers_MN_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "MN_Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_aspnetUsers_SD_Addresses_AddressId",
                        column: x => x.AddressId,
                        principalTable: "SD_Addresses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_aspnetUsers_SD_Contacts_ContactId",
                        column: x => x.ContactId,
                        principalTable: "SD_Contacts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_aspnetUsers_UserProfile_ProfileId",
                        column: x => x.ProfileId,
                        principalTable: "UserProfile",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "BS_TableProvidedServicesPrices",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    ServiceName = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    PriceService = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    CompanyId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BS_TableProvidedServicesPrices", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BS_TableProvidedServicesPrices_MN_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "MN_Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "FN_BankAccount",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    CompanyId = table.Column<int>(type: "int", nullable: false),
                    Holder = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Institution = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Account = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Agency = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ManagerName = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ManagerContact = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Pix = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Balance = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    Type = table.Column<int>(type: "int", nullable: false),
                    Description = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FN_BankAccount", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FN_BankAccount_MN_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "MN_Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "FN_BillToPayList",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    CompanyId = table.Column<int>(type: "int", nullable: false),
                    BillName = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Expiration = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    CyclePayment = table.Column<int>(type: "int", nullable: false),
                    LinkCopyBill = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    USERLinkCopyBill = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    PASSLinkCopyBill = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FN_BillToPayList", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FN_BillToPayList_MN_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "MN_Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "MN_Customers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Assured = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    CustomerType = table.Column<int>(type: "int", nullable: false),
                    Payment = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    Expiration = table.Column<int>(type: "int", nullable: false),
                    Disabled = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    Discount = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    CompanyId = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Responsible = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CNPJ = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Registered = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    Description = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    AddressId = table.Column<int>(type: "int", nullable: true),
                    ContactId = table.Column<int>(type: "int", nullable: true),
                    PhysicallyMovingCostsId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MN_Customers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MN_Customers_MN_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "MN_Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MN_Customers_MN_PhysicallyMovingCosts_PhysicallyMovingCostsId",
                        column: x => x.PhysicallyMovingCostsId,
                        principalTable: "MN_PhysicallyMovingCosts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_MN_Customers_SD_Addresses_AddressId",
                        column: x => x.AddressId,
                        principalTable: "SD_Addresses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_MN_Customers_SD_Contacts_ContactId",
                        column: x => x.ContactId,
                        principalTable: "SD_Contacts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "MN_Partners",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    BusinessLine = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    PartnerType = table.Column<int>(type: "int", nullable: false),
                    CompanyId = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Responsible = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CNPJ = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Registered = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    Description = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    AddressId = table.Column<int>(type: "int", nullable: true),
                    ContactId = table.Column<int>(type: "int", nullable: true),
                    PhysicallyMovingCostsId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MN_Partners", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MN_Partners_MN_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "MN_Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MN_Partners_MN_PhysicallyMovingCosts_PhysicallyMovingCostsId",
                        column: x => x.PhysicallyMovingCostsId,
                        principalTable: "MN_PhysicallyMovingCosts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_MN_Partners_SD_Addresses_AddressId",
                        column: x => x.AddressId,
                        principalTable: "SD_Addresses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_MN_Partners_SD_Contacts_ContactId",
                        column: x => x.ContactId,
                        principalTable: "SD_Contacts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "PD_Equipament_Fillers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Equipament = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CompanyId = table.Column<int>(type: "int", nullable: false)
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
                    Manufacturer = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CompanyId = table.Column<int>(type: "int", nullable: false)
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
                name: "PD_Products",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    CompanyId = table.Column<int>(type: "int", nullable: false),
                    EquipamentId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PD_Products", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PD_Products_MN_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "MN_Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PD_Products_PD_Equipaments_EquipamentId",
                        column: x => x.EquipamentId,
                        principalTable: "PD_Equipaments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "PD_Segment_Fillers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Segment = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CompanyId = table.Column<int>(type: "int", nullable: false)
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

            migrationBuilder.CreateTable(
                name: "aspnetUserRoles",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "int", nullable: false),
                    RoleId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_aspnetUserRoles", x => new { x.UserId, x.RoleId });
                    table.ForeignKey(
                        name: "FK_aspnetUserRoles_aspnetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "aspnetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_aspnetUserRoles_aspnetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "aspnetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "BS_Services",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    ExecutedServicesComments = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    IsAuthorized = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    Started = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    Finished = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BS_Services", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BS_Services_aspnetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "aspnetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "FN_Cards",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Holder = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Flag = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Limit = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    Type = table.Column<int>(type: "int", nullable: false),
                    Number = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CheckCode = table.Column<int>(type: "int", nullable: false),
                    Description = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Validate = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    BankAccountId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FN_Cards", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FN_Cards_FN_BankAccount_BankAccountId",
                        column: x => x.BankAccountId,
                        principalTable: "FN_BankAccount",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "FN_EssentialCycle",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    BillToPayListId = table.Column<int>(type: "int", nullable: false),
                    BankAccountId = table.Column<int>(type: "int", nullable: false),
                    PaidBy = table.Column<int>(type: "int", nullable: false),
                    WasPaid = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    EntryRegister = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    Price = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    Interest = table.Column<decimal>(type: "decimal(65,30)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FN_EssentialCycle", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FN_EssentialCycle_aspnetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "aspnetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FN_EssentialCycle_FN_BankAccount_BankAccountId",
                        column: x => x.BankAccountId,
                        principalTable: "FN_BankAccount",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FN_EssentialCycle_FN_BillToPayList_BillToPayListId",
                        column: x => x.BillToPayListId,
                        principalTable: "FN_BillToPayList",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "FN_NotPredictable",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    BankAccountId = table.Column<int>(type: "int", nullable: false),
                    BillToPayListId = table.Column<int>(type: "int", nullable: true),
                    PaidBy = table.Column<int>(type: "int", nullable: false),
                    ItemOrPlaceName = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    DaySpent = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    EntryRegister = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    Price = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    Description = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FN_NotPredictable", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FN_NotPredictable_aspnetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "aspnetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FN_NotPredictable_FN_BankAccount_BankAccountId",
                        column: x => x.BankAccountId,
                        principalTable: "FN_BankAccount",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FN_NotPredictable_FN_BillToPayList_BillToPayListId",
                        column: x => x.BillToPayListId,
                        principalTable: "FN_BillToPayList",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "OS_BillingsFroms",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    PartnerId = table.Column<int>(type: "int", nullable: true),
                    CustomerId = table.Column<int>(type: "int", nullable: true),
                    Base = table.Column<bool>(type: "tinyint(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OS_BillingsFroms", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OS_BillingsFroms_MN_Customers_CustomerId",
                        column: x => x.CustomerId,
                        principalTable: "MN_Customers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_OS_BillingsFroms_MN_Partners_PartnerId",
                        column: x => x.PartnerId,
                        principalTable: "MN_Partners",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "OS_ElectronicsRepairs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    CompanyId = table.Column<int>(type: "int", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    Item = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    EntryDate = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    Description = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Problem = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    UserEquipament = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    PasswordEquipament = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Price = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    ServiceProviderId = table.Column<int>(type: "int", nullable: false),
                    CustomerId = table.Column<int>(type: "int", nullable: false),
                    SolutionApplied = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Status = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OS_ElectronicsRepairs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OS_ElectronicsRepairs_aspnetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "aspnetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OS_ElectronicsRepairs_MN_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "MN_Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OS_ElectronicsRepairs_MN_Customers_CustomerId",
                        column: x => x.CustomerId,
                        principalTable: "MN_Customers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OS_ElectronicsRepairs_MN_Partners_ServiceProviderId",
                        column: x => x.ServiceProviderId,
                        principalTable: "MN_Partners",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "PD_Quantities",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Sn = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    NfNumber = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CostPrice = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    SoldPrice = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    EntryDate = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    SoldDate = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    WarrantyEnd = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    WarrantyEndLocal = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    IsUsed = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    IsTested = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    IsReserved = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    UsedHistorical = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CustomerId = table.Column<int>(type: "int", nullable: true),
                    ProductId = table.Column<int>(type: "int", nullable: false),
                    SupplierId = table.Column<int>(type: "int", nullable: false),
                    ReservedByUserId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PD_Quantities", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PD_Quantities_aspnetUsers_ReservedByUserId",
                        column: x => x.ReservedByUserId,
                        principalTable: "aspnetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_PD_Quantities_MN_Customers_CustomerId",
                        column: x => x.CustomerId,
                        principalTable: "MN_Customers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_PD_Quantities_MN_Partners_SupplierId",
                        column: x => x.SupplierId,
                        principalTable: "MN_Partners",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PD_Quantities_PD_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "PD_Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Tracking",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    ProductId = table.Column<int>(type: "int", nullable: false),
                    CostPrice = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    SoldPrice = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    Sn = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    NfNumber = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CustomerId = table.Column<int>(type: "int", nullable: true),
                    UserId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tracking", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Tracking_aspnetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "aspnetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Tracking_MN_Customers_CustomerId",
                        column: x => x.CustomerId,
                        principalTable: "MN_Customers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Tracking_PD_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "PD_Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "BS_BudgetsServices",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    CompanyId = table.Column<int>(type: "int", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    CustomerId = table.Column<int>(type: "int", nullable: false),
                    ProblemAccordingCustomer = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    IsPresentVisuallyDescription = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    IsRemote = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    DataDescription = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    EntryDate = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    ServiceId = table.Column<int>(type: "int", nullable: true),
                    CollectsDeliversCostsId = table.Column<int>(type: "int", nullable: true),
                    StatusService = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BS_BudgetsServices", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BS_BudgetsServices_aspnetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "aspnetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_BS_BudgetsServices_BS_CollectsDeliversCosts_CollectsDelivers~",
                        column: x => x.CollectsDeliversCostsId,
                        principalTable: "BS_CollectsDeliversCosts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_BS_BudgetsServices_BS_Services_ServiceId",
                        column: x => x.ServiceId,
                        principalTable: "BS_Services",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_BS_BudgetsServices_MN_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "MN_Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_BS_BudgetsServices_MN_Customers_CustomerId",
                        column: x => x.CustomerId,
                        principalTable: "MN_Customers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "BS_Prices",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    ServiceName = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    PriceService = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    ServiceId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BS_Prices", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BS_Prices_BS_Services_ServiceId",
                        column: x => x.ServiceId,
                        principalTable: "BS_Services",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "OS_CollectsDelivers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    CompanyId = table.Column<int>(type: "int", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    TransporterId = table.Column<int>(type: "int", nullable: true),
                    SubjectReason = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ContactName = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Start = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    Price = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    Collect = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    Deliver = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    Other = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    BillingFromId = table.Column<int>(type: "int", nullable: true),
                    TaskOverView = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OS_CollectsDelivers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OS_CollectsDelivers_aspnetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "aspnetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OS_CollectsDelivers_MN_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "MN_Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OS_CollectsDelivers_MN_Partners_TransporterId",
                        column: x => x.TransporterId,
                        principalTable: "MN_Partners",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_OS_CollectsDelivers_OS_BillingsFroms_BillingFromId",
                        column: x => x.BillingFromId,
                        principalTable: "OS_BillingsFroms",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "OS_Destinies",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    CustomerId = table.Column<int>(type: "int", nullable: true),
                    PartnerId = table.Column<int>(type: "int", nullable: true),
                    NoRegisterName = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    NoRegisterAddress = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Description = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CollectDeliverId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OS_Destinies", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OS_Destinies_MN_Customers_CustomerId",
                        column: x => x.CustomerId,
                        principalTable: "MN_Customers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_OS_Destinies_MN_Partners_PartnerId",
                        column: x => x.PartnerId,
                        principalTable: "MN_Partners",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_OS_Destinies_OS_CollectsDelivers_CollectDeliverId",
                        column: x => x.CollectDeliverId,
                        principalTable: "OS_CollectsDelivers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_aspnetUserRoles_RoleId",
                table: "aspnetUserRoles",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "IX_aspnetUsers_AddressId",
                table: "aspnetUsers",
                column: "AddressId");

            migrationBuilder.CreateIndex(
                name: "IX_aspnetUsers_CompanyId",
                table: "aspnetUsers",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_aspnetUsers_ContactId",
                table: "aspnetUsers",
                column: "ContactId");

            migrationBuilder.CreateIndex(
                name: "IX_aspnetUsers_ProfileId",
                table: "aspnetUsers",
                column: "ProfileId");

            migrationBuilder.CreateIndex(
                name: "IX_BS_BudgetsServices_CollectsDeliversCostsId",
                table: "BS_BudgetsServices",
                column: "CollectsDeliversCostsId");

            migrationBuilder.CreateIndex(
                name: "IX_BS_BudgetsServices_CompanyId",
                table: "BS_BudgetsServices",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_BS_BudgetsServices_CustomerId",
                table: "BS_BudgetsServices",
                column: "CustomerId");

            migrationBuilder.CreateIndex(
                name: "IX_BS_BudgetsServices_ServiceId",
                table: "BS_BudgetsServices",
                column: "ServiceId");

            migrationBuilder.CreateIndex(
                name: "IX_BS_BudgetsServices_UserId",
                table: "BS_BudgetsServices",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_BS_Prices_ServiceId",
                table: "BS_Prices",
                column: "ServiceId");

            migrationBuilder.CreateIndex(
                name: "IX_BS_Services_UserId",
                table: "BS_Services",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_BS_TableProvidedServicesPrices_CompanyId",
                table: "BS_TableProvidedServicesPrices",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_FN_BankAccount_CompanyId",
                table: "FN_BankAccount",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_FN_BillToPayList_CompanyId",
                table: "FN_BillToPayList",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_FN_Cards_BankAccountId",
                table: "FN_Cards",
                column: "BankAccountId");

            migrationBuilder.CreateIndex(
                name: "IX_FN_EssentialCycle_BankAccountId",
                table: "FN_EssentialCycle",
                column: "BankAccountId");

            migrationBuilder.CreateIndex(
                name: "IX_FN_EssentialCycle_BillToPayListId",
                table: "FN_EssentialCycle",
                column: "BillToPayListId");

            migrationBuilder.CreateIndex(
                name: "IX_FN_EssentialCycle_UserId",
                table: "FN_EssentialCycle",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_FN_NotPredictable_BankAccountId",
                table: "FN_NotPredictable",
                column: "BankAccountId");

            migrationBuilder.CreateIndex(
                name: "IX_FN_NotPredictable_BillToPayListId",
                table: "FN_NotPredictable",
                column: "BillToPayListId");

            migrationBuilder.CreateIndex(
                name: "IX_FN_NotPredictable_UserId",
                table: "FN_NotPredictable",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_MN_Companies_AddressId",
                table: "MN_Companies",
                column: "AddressId");

            migrationBuilder.CreateIndex(
                name: "IX_MN_Companies_ContactId",
                table: "MN_Companies",
                column: "ContactId");

            migrationBuilder.CreateIndex(
                name: "IX_MN_Customers_AddressId",
                table: "MN_Customers",
                column: "AddressId");

            migrationBuilder.CreateIndex(
                name: "IX_MN_Customers_CompanyId",
                table: "MN_Customers",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_MN_Customers_ContactId",
                table: "MN_Customers",
                column: "ContactId");

            migrationBuilder.CreateIndex(
                name: "IX_MN_Customers_PhysicallyMovingCostsId",
                table: "MN_Customers",
                column: "PhysicallyMovingCostsId");

            migrationBuilder.CreateIndex(
                name: "IX_MN_Partners_AddressId",
                table: "MN_Partners",
                column: "AddressId");

            migrationBuilder.CreateIndex(
                name: "IX_MN_Partners_CompanyId",
                table: "MN_Partners",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_MN_Partners_ContactId",
                table: "MN_Partners",
                column: "ContactId");

            migrationBuilder.CreateIndex(
                name: "IX_MN_Partners_PhysicallyMovingCostsId",
                table: "MN_Partners",
                column: "PhysicallyMovingCostsId");

            migrationBuilder.CreateIndex(
                name: "IX_OS_BillingsFroms_CustomerId",
                table: "OS_BillingsFroms",
                column: "CustomerId");

            migrationBuilder.CreateIndex(
                name: "IX_OS_BillingsFroms_PartnerId",
                table: "OS_BillingsFroms",
                column: "PartnerId");

            migrationBuilder.CreateIndex(
                name: "IX_OS_CollectsDelivers_BillingFromId",
                table: "OS_CollectsDelivers",
                column: "BillingFromId");

            migrationBuilder.CreateIndex(
                name: "IX_OS_CollectsDelivers_CompanyId",
                table: "OS_CollectsDelivers",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_OS_CollectsDelivers_TransporterId",
                table: "OS_CollectsDelivers",
                column: "TransporterId");

            migrationBuilder.CreateIndex(
                name: "IX_OS_CollectsDelivers_UserId",
                table: "OS_CollectsDelivers",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_OS_Destinies_CollectDeliverId",
                table: "OS_Destinies",
                column: "CollectDeliverId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_OS_Destinies_CustomerId",
                table: "OS_Destinies",
                column: "CustomerId");

            migrationBuilder.CreateIndex(
                name: "IX_OS_Destinies_PartnerId",
                table: "OS_Destinies",
                column: "PartnerId");

            migrationBuilder.CreateIndex(
                name: "IX_OS_ElectronicsRepairs_CompanyId",
                table: "OS_ElectronicsRepairs",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_OS_ElectronicsRepairs_CustomerId",
                table: "OS_ElectronicsRepairs",
                column: "CustomerId");

            migrationBuilder.CreateIndex(
                name: "IX_OS_ElectronicsRepairs_ServiceProviderId",
                table: "OS_ElectronicsRepairs",
                column: "ServiceProviderId");

            migrationBuilder.CreateIndex(
                name: "IX_OS_ElectronicsRepairs_UserId",
                table: "OS_ElectronicsRepairs",
                column: "UserId");

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
                name: "IX_PD_Equipaments_Model",
                table: "PD_Equipaments",
                column: "Model",
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
                name: "IX_PD_Products_CompanyId",
                table: "PD_Products",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_PD_Products_EquipamentId",
                table: "PD_Products",
                column: "EquipamentId");

            migrationBuilder.CreateIndex(
                name: "IX_PD_Quantities_CustomerId",
                table: "PD_Quantities",
                column: "CustomerId");

            migrationBuilder.CreateIndex(
                name: "IX_PD_Quantities_ProductId",
                table: "PD_Quantities",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_PD_Quantities_ReservedByUserId",
                table: "PD_Quantities",
                column: "ReservedByUserId");

            migrationBuilder.CreateIndex(
                name: "IX_PD_Quantities_Sn",
                table: "PD_Quantities",
                column: "Sn",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_PD_Quantities_SupplierId",
                table: "PD_Quantities",
                column: "SupplierId");

            migrationBuilder.CreateIndex(
                name: "IX_PD_Segment_Fillers_CompanyId",
                table: "PD_Segment_Fillers",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_PD_Segment_Fillers_Segment",
                table: "PD_Segment_Fillers",
                column: "Segment",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_SD_socialnetworks_ContactId",
                table: "SD_socialnetworks",
                column: "ContactId");

            migrationBuilder.CreateIndex(
                name: "IX_Tracking_CustomerId",
                table: "Tracking",
                column: "CustomerId");

            migrationBuilder.CreateIndex(
                name: "IX_Tracking_ProductId",
                table: "Tracking",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_Tracking_UserId",
                table: "Tracking",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "aspnetRoleClaims");

            migrationBuilder.DropTable(
                name: "aspnetUserClaims");

            migrationBuilder.DropTable(
                name: "aspnetUserLogins");

            migrationBuilder.DropTable(
                name: "aspnetUserRoles");

            migrationBuilder.DropTable(
                name: "AspNetUserTokens");

            migrationBuilder.DropTable(
                name: "BS_BudgetsServices");

            migrationBuilder.DropTable(
                name: "BS_Prices");

            migrationBuilder.DropTable(
                name: "BS_TableProvidedServicesPrices");

            migrationBuilder.DropTable(
                name: "FN_Cards");

            migrationBuilder.DropTable(
                name: "FN_EssentialCycle");

            migrationBuilder.DropTable(
                name: "FN_NotPredictable");

            migrationBuilder.DropTable(
                name: "OS_Destinies");

            migrationBuilder.DropTable(
                name: "OS_ElectronicsRepairs");

            migrationBuilder.DropTable(
                name: "PD_Equipament_Fillers");

            migrationBuilder.DropTable(
                name: "PD_Manufacturer_Fillers");

            migrationBuilder.DropTable(
                name: "PD_Quantities");

            migrationBuilder.DropTable(
                name: "PD_Segment_Fillers");

            migrationBuilder.DropTable(
                name: "SD_socialnetworks");

            migrationBuilder.DropTable(
                name: "Tracking");

            migrationBuilder.DropTable(
                name: "aspnetRoles");

            migrationBuilder.DropTable(
                name: "BS_CollectsDeliversCosts");

            migrationBuilder.DropTable(
                name: "BS_Services");

            migrationBuilder.DropTable(
                name: "FN_BankAccount");

            migrationBuilder.DropTable(
                name: "FN_BillToPayList");

            migrationBuilder.DropTable(
                name: "OS_CollectsDelivers");

            migrationBuilder.DropTable(
                name: "PD_Products");

            migrationBuilder.DropTable(
                name: "aspnetUsers");

            migrationBuilder.DropTable(
                name: "OS_BillingsFroms");

            migrationBuilder.DropTable(
                name: "PD_Equipaments");

            migrationBuilder.DropTable(
                name: "UserProfile");

            migrationBuilder.DropTable(
                name: "MN_Customers");

            migrationBuilder.DropTable(
                name: "MN_Partners");

            migrationBuilder.DropTable(
                name: "MN_Companies");

            migrationBuilder.DropTable(
                name: "MN_PhysicallyMovingCosts");

            migrationBuilder.DropTable(
                name: "SD_Addresses");

            migrationBuilder.DropTable(
                name: "SD_Contacts");
        }
    }
}
