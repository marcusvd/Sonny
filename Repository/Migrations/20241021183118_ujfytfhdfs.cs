﻿using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Repository.Migrations
{
    public partial class ujfytfhdfs : Migration
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
                name: "MN_AdditionalCosts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    FixedPhysicallyMovingCosts = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    Deleted = table.Column<bool>(type: "tinyint(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MN_AdditionalCosts", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "MN_PaymentsData",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Money = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    Deleted = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    Others = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MN_PaymentsData", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "MN_PhysicallyMovingCosts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Fuel = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    Apps = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    PublicTransport = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    MotoBoy = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    Deleted = table.Column<bool>(type: "tinyint(1)", nullable: false)
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
                    Deleted = table.Column<bool>(type: "tinyint(1)", nullable: false),
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
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Deleted = table.Column<bool>(type: "tinyint(1)", nullable: false)
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
                name: "MN_PartnerPaymentBankAccounts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Holder = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Institution = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Account = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Agency = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Deleted = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    Type = table.Column<int>(type: "int", nullable: false),
                    PaymentDataId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MN_PartnerPaymentBankAccounts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MN_PartnerPaymentBankAccounts_MN_PaymentsData_PaymentDataId",
                        column: x => x.PaymentDataId,
                        principalTable: "MN_PaymentsData",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "MN_PartnerPaymentPixes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Key = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Value = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Holder = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Deleted = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    PaymentDataId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MN_PartnerPaymentPixes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MN_PartnerPaymentPixes_MN_PaymentsData_PaymentDataId",
                        column: x => x.PaymentDataId,
                        principalTable: "MN_PaymentsData",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
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
                    ContactId = table.Column<int>(type: "int", nullable: true),
                    Deleted = table.Column<bool>(type: "tinyint(1)", nullable: false)
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
                    Deleted = table.Column<bool>(type: "tinyint(1)", nullable: false),
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
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Deleted = table.Column<bool>(type: "tinyint(1)", nullable: true),
                    Registered = table.Column<DateTime>(type: "datetime(6)", nullable: true)
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
                    ServiceName = table.Column<string>(type: "varchar(255)", nullable: false)
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
                name: "FN_CategoriesExpenses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CompanyId = table.Column<int>(type: "int", nullable: false),
                    Deleted = table.Column<bool>(type: "tinyint(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FN_CategoriesExpenses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FN_CategoriesExpenses_MN_Companies_CompanyId",
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
                    Payment = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    Expiration = table.Column<int>(type: "int", nullable: false),
                    Discount = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    AdditionalCostsId = table.Column<int>(type: "int", nullable: true),
                    CompanyId = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Responsible = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CNPJ = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    EntityType = table.Column<int>(type: "int", nullable: false),
                    Registered = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    Description = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    BusinessLine = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Deleted = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    AddressId = table.Column<int>(type: "int", nullable: true),
                    ContactId = table.Column<int>(type: "int", nullable: true),
                    PhysicallyMovingCostsId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MN_Customers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MN_Customers_MN_AdditionalCosts_AdditionalCostsId",
                        column: x => x.AdditionalCostsId,
                        principalTable: "MN_AdditionalCosts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
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
                    PaymentsDataId = table.Column<int>(type: "int", nullable: true),
                    PartnerBusiness = table.Column<int>(type: "int", nullable: false),
                    CompanyId = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Responsible = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CNPJ = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    EntityType = table.Column<int>(type: "int", nullable: false),
                    Registered = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    Description = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    BusinessLine = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Deleted = table.Column<bool>(type: "tinyint(1)", nullable: false),
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
                        name: "FK_MN_Partners_MN_PaymentsData_PaymentsDataId",
                        column: x => x.PaymentsDataId,
                        principalTable: "MN_PaymentsData",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
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
                name: "PD_Items_Fillers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    CompanyId = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Deleted = table.Column<bool>(type: "tinyint(1)", nullable: false)
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
                name: "PD_Products",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    CompanyId = table.Column<int>(type: "int", nullable: false),
                    EquipamentId = table.Column<int>(type: "int", nullable: true),
                    Deleted = table.Column<bool>(type: "tinyint(1)", nullable: false)
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
                    Comments = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    IsAuthorized = table.Column<DateTime>(type: "datetime(6)", nullable: false),
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
                name: "FN_BankAccount",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    UserId = table.Column<int>(type: "int", nullable: false),
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
                    Balance = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    Deleted = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    Registered = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    Description = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Type = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FN_BankAccount", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FN_BankAccount_aspnetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "aspnetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FN_BankAccount_MN_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "MN_Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "FN_SubcategoriesExpenses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CategoryExpenseId = table.Column<int>(type: "int", nullable: false),
                    PayCycle = table.Column<int>(type: "int", nullable: false),
                    Deleted = table.Column<bool>(type: "tinyint(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FN_SubcategoriesExpenses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FN_SubcategoriesExpenses_FN_CategoriesExpenses_CategoryExpen~",
                        column: x => x.CategoryExpenseId,
                        principalTable: "FN_CategoriesExpenses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
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
                    Base = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    Deleted = table.Column<bool>(type: "tinyint(1)", nullable: false)
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
                name: "PD_Manufacturers_Fillers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    ItemId = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PD_Manufacturers_Fillers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PD_Manufacturers_Fillers_PD_Items_Fillers_ItemId",
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
                    Name = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Description = table.Column<string>(type: "longtext", nullable: true)
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
                    Name = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false)
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
                    ReservedOrSoldByUserId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PD_Quantities", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PD_Quantities_aspnetUsers_ReservedOrSoldByUserId",
                        column: x => x.ReservedOrSoldByUserId,
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
                    ExecutionMode = table.Column<int>(type: "int", nullable: false),
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
                name: "BS_Repairs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    ServiceName = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    PriceService = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    ServiceId = table.Column<int>(type: "int", nullable: false),
                    Added = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    ExecutedServicesComments = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    RepairStatus = table.Column<int>(type: "int", nullable: false),
                    ExecutionMode = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BS_Repairs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BS_Repairs_BS_Services_ServiceId",
                        column: x => x.ServiceId,
                        principalTable: "BS_Services",
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
                    UserId = table.Column<int>(type: "int", nullable: false),
                    CompanyId = table.Column<int>(type: "int", nullable: false),
                    Holder = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Flag = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CreditLimit = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    Type = table.Column<int>(type: "int", nullable: false),
                    Number = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CVC = table.Column<int>(type: "int", nullable: false),
                    Description = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Validate = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    ClosingDate = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    ExpiresDate = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    Deleted = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    Registered = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    BankAccountId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FN_Cards", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FN_Cards_aspnetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "aspnetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FN_Cards_FN_BankAccount_BankAccountId",
                        column: x => x.BankAccountId,
                        principalTable: "FN_BankAccount",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_FN_Cards_MN_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "MN_Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "FN_Pixes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Key = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Value = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Deleted = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    BankAccountId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FN_Pixes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FN_Pixes_FN_BankAccount_BankAccountId",
                        column: x => x.BankAccountId,
                        principalTable: "FN_BankAccount",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "FN_FinancingsAndLoansExpenses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    CompanyId = table.Column<int>(type: "int", nullable: false),
                    CategoryExpenseId = table.Column<int>(type: "int", nullable: false),
                    SubcategoryExpenseId = table.Column<int>(type: "int", nullable: false),
                    Start = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    End = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    TotalPriceToBePaid = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    TotalPriceFinancingOrLoan = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    TotalPriceInterest = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    TotalPercentageInterest = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    InstallmentsQuantity = table.Column<int>(type: "int", nullable: false),
                    InstallmentPrice = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    WasPaid = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    PaidOff = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    Deleted = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    Registered = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    Description = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    LinkCopyBill = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    USERLinkCopyBill = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    PASSLinkCopyBill = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FN_FinancingsAndLoansExpenses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FN_FinancingsAndLoansExpenses_aspnetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "aspnetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FN_FinancingsAndLoansExpenses_FN_CategoriesExpenses_Category~",
                        column: x => x.CategoryExpenseId,
                        principalTable: "FN_CategoriesExpenses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FN_FinancingsAndLoansExpenses_FN_SubcategoriesExpenses_Subca~",
                        column: x => x.SubcategoryExpenseId,
                        principalTable: "FN_SubcategoriesExpenses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FN_FinancingsAndLoansExpenses_MN_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "MN_Companies",
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
                    Deleted = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    SubjectReason = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ContactName = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Start = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    Price = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    Collect = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    Deliver = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    Other = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    KindTransport = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
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
                name: "PD_Trackings",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    CostPrice = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    SoldPrice = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    Sn = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    NfNumber = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ServiceId = table.Column<int>(type: "int", nullable: true),
                    ProductId = table.Column<int>(type: "int", nullable: false),
                    CustomerId = table.Column<int>(type: "int", nullable: true),
                    UserId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PD_Trackings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PD_Trackings_aspnetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "aspnetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PD_Trackings_BS_BudgetsServices_ServiceId",
                        column: x => x.ServiceId,
                        principalTable: "BS_BudgetsServices",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PD_Trackings_MN_Customers_CustomerId",
                        column: x => x.CustomerId,
                        principalTable: "MN_Customers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PD_Trackings_PD_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "PD_Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "FN_CreditCardExpensesInvoices",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    CompanyId = table.Column<int>(type: "int", nullable: false),
                    CardId = table.Column<int>(type: "int", nullable: true),
                    PaidFromBankAccountId = table.Column<int>(type: "int", nullable: true),
                    Price = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    Interest = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    Expires = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    ClosingDate = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    WasPaid = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    OthersPaymentMethods = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Document = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Description = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Registered = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    Deleted = table.Column<bool>(type: "tinyint(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FN_CreditCardExpensesInvoices", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FN_CreditCardExpensesInvoices_aspnetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "aspnetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FN_CreditCardExpensesInvoices_FN_BankAccount_PaidFromBankAcc~",
                        column: x => x.PaidFromBankAccountId,
                        principalTable: "FN_BankAccount",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_FN_CreditCardExpensesInvoices_FN_Cards_CardId",
                        column: x => x.CardId,
                        principalTable: "FN_Cards",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_FN_CreditCardExpensesInvoices_MN_Companies_UserId",
                        column: x => x.UserId,
                        principalTable: "MN_Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "FN_CreditCardLimitOperations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    CardId = table.Column<int>(type: "int", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    CompanyId = table.Column<int>(type: "int", nullable: false),
                    LimitCreditUsed = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    PriceOfLastPayment = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    Registered = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    LastPayment = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FN_CreditCardLimitOperations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FN_CreditCardLimitOperations_aspnetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "aspnetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FN_CreditCardLimitOperations_FN_Cards_CardId",
                        column: x => x.CardId,
                        principalTable: "FN_Cards",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FN_CreditCardLimitOperations_MN_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "MN_Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "FN_MonthlyFixedExpenses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    UserId = table.Column<int>(type: "int", nullable: true),
                    CompanyId = table.Column<int>(type: "int", nullable: false),
                    CategoryExpenseId = table.Column<int>(type: "int", nullable: false),
                    SubcategoryExpenseId = table.Column<int>(type: "int", nullable: false),
                    BankAccountId = table.Column<int>(type: "int", nullable: true),
                    Deleted = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    CardId = table.Column<int>(type: "int", nullable: true),
                    PixId = table.Column<int>(type: "int", nullable: true),
                    Price = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    Interest = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    Expires = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    Registered = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    WasPaid = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    OthersPaymentMethods = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Document = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Description = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    LinkCopyBill = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    USERLinkCopyBill = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    PASSLinkCopyBill = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FN_MonthlyFixedExpenses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FN_MonthlyFixedExpenses_aspnetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "aspnetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_FN_MonthlyFixedExpenses_FN_BankAccount_BankAccountId",
                        column: x => x.BankAccountId,
                        principalTable: "FN_BankAccount",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_FN_MonthlyFixedExpenses_FN_Cards_CardId",
                        column: x => x.CardId,
                        principalTable: "FN_Cards",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_FN_MonthlyFixedExpenses_FN_CategoriesExpenses_CategoryExpens~",
                        column: x => x.CategoryExpenseId,
                        principalTable: "FN_CategoriesExpenses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FN_MonthlyFixedExpenses_FN_Pixes_PixId",
                        column: x => x.PixId,
                        principalTable: "FN_Pixes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_FN_MonthlyFixedExpenses_FN_SubcategoriesExpenses_Subcategory~",
                        column: x => x.SubcategoryExpenseId,
                        principalTable: "FN_SubcategoriesExpenses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FN_MonthlyFixedExpenses_MN_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "MN_Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "FN_PixExpenses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    CompanyId = table.Column<int>(type: "int", nullable: false),
                    PixOutId = table.Column<int>(type: "int", nullable: false),
                    BenefitedName = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    BenefitedKey = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Price = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    ExpenseDay = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    Deleted = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    Registered = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    MonthlyFixedExpenseId = table.Column<int>(type: "int", nullable: true),
                    YearlyFixedExpenseId = table.Column<int>(type: "int", nullable: true),
                    VariableExpenseId = table.Column<int>(type: "int", nullable: true),
                    FinancingAndLoanExpenseId = table.Column<int>(type: "int", nullable: true),
                    Description = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FN_PixExpenses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FN_PixExpenses_aspnetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "aspnetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FN_PixExpenses_FN_Pixes_PixOutId",
                        column: x => x.PixOutId,
                        principalTable: "FN_Pixes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FN_PixExpenses_MN_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "MN_Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "FN_VariablesExpenses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Place = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Name = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    UserId = table.Column<int>(type: "int", nullable: true),
                    CompanyId = table.Column<int>(type: "int", nullable: false),
                    CategoryExpenseId = table.Column<int>(type: "int", nullable: false),
                    SubcategoryExpenseId = table.Column<int>(type: "int", nullable: false),
                    BankAccountId = table.Column<int>(type: "int", nullable: true),
                    Deleted = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    CardId = table.Column<int>(type: "int", nullable: true),
                    PixId = table.Column<int>(type: "int", nullable: true),
                    Price = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    Interest = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    Expires = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    Registered = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    WasPaid = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    OthersPaymentMethods = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Document = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Description = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FN_VariablesExpenses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FN_VariablesExpenses_aspnetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "aspnetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_FN_VariablesExpenses_FN_BankAccount_BankAccountId",
                        column: x => x.BankAccountId,
                        principalTable: "FN_BankAccount",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_FN_VariablesExpenses_FN_Cards_CardId",
                        column: x => x.CardId,
                        principalTable: "FN_Cards",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_FN_VariablesExpenses_FN_CategoriesExpenses_CategoryExpenseId",
                        column: x => x.CategoryExpenseId,
                        principalTable: "FN_CategoriesExpenses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FN_VariablesExpenses_FN_Pixes_PixId",
                        column: x => x.PixId,
                        principalTable: "FN_Pixes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_FN_VariablesExpenses_FN_SubcategoriesExpenses_SubcategoryExp~",
                        column: x => x.SubcategoryExpenseId,
                        principalTable: "FN_SubcategoriesExpenses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FN_VariablesExpenses_MN_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "MN_Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "FN_YearlyFixedExpenses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Start = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    AutoRenew = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    Name = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    UserId = table.Column<int>(type: "int", nullable: true),
                    CompanyId = table.Column<int>(type: "int", nullable: false),
                    CategoryExpenseId = table.Column<int>(type: "int", nullable: false),
                    SubcategoryExpenseId = table.Column<int>(type: "int", nullable: false),
                    BankAccountId = table.Column<int>(type: "int", nullable: true),
                    Deleted = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    CardId = table.Column<int>(type: "int", nullable: true),
                    PixId = table.Column<int>(type: "int", nullable: true),
                    Price = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    Interest = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    Expires = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    Registered = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    WasPaid = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    OthersPaymentMethods = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Document = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Description = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    LinkCopyBill = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    USERLinkCopyBill = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    PASSLinkCopyBill = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FN_YearlyFixedExpenses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FN_YearlyFixedExpenses_aspnetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "aspnetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_FN_YearlyFixedExpenses_FN_BankAccount_BankAccountId",
                        column: x => x.BankAccountId,
                        principalTable: "FN_BankAccount",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_FN_YearlyFixedExpenses_FN_Cards_CardId",
                        column: x => x.CardId,
                        principalTable: "FN_Cards",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_FN_YearlyFixedExpenses_FN_CategoriesExpenses_CategoryExpense~",
                        column: x => x.CategoryExpenseId,
                        principalTable: "FN_CategoriesExpenses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FN_YearlyFixedExpenses_FN_Pixes_PixId",
                        column: x => x.PixId,
                        principalTable: "FN_Pixes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_FN_YearlyFixedExpenses_FN_SubcategoriesExpenses_SubcategoryE~",
                        column: x => x.SubcategoryExpenseId,
                        principalTable: "FN_SubcategoriesExpenses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FN_YearlyFixedExpenses_MN_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "MN_Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "FN_FinancingsAndLoansExpensesInstallments",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    CompanyId = table.Column<int>(type: "int", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: true),
                    BankAccountId = table.Column<int>(type: "int", nullable: true),
                    Deleted = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    CardId = table.Column<int>(type: "int", nullable: true),
                    PixId = table.Column<int>(type: "int", nullable: true),
                    Interest = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    Expires = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    Registered = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    WasPaid = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    OthersPaymentMethods = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Document = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    PriceWasPaidInstallment = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    CurrentInstallment = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    FinancingAndLoanExpenseId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FN_FinancingsAndLoansExpensesInstallments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FN_FinancingsAndLoansExpensesInstallments_aspnetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "aspnetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_FN_FinancingsAndLoansExpensesInstallments_FN_BankAccount_Ban~",
                        column: x => x.BankAccountId,
                        principalTable: "FN_BankAccount",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_FN_FinancingsAndLoansExpensesInstallments_FN_Cards_CardId",
                        column: x => x.CardId,
                        principalTable: "FN_Cards",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_FN_FinancingsAndLoansExpensesInstallments_FN_FinancingsAndLo~",
                        column: x => x.FinancingAndLoanExpenseId,
                        principalTable: "FN_FinancingsAndLoansExpenses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_FN_FinancingsAndLoansExpensesInstallments_FN_Pixes_PixId",
                        column: x => x.PixId,
                        principalTable: "FN_Pixes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_FN_FinancingsAndLoansExpensesInstallments_MN_Companies_Compa~",
                        column: x => x.CompanyId,
                        principalTable: "MN_Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
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

            migrationBuilder.CreateTable(
                name: "FN_CreditCardExpenses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    CompanyId = table.Column<int>(type: "int", nullable: false),
                    CategoryExpenseId = table.Column<int>(type: "int", nullable: false),
                    SubcategoryExpenseId = table.Column<int>(type: "int", nullable: false),
                    Deleted = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    CardId = table.Column<int>(type: "int", nullable: false),
                    Price = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    Expires = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    Registered = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    WasPaid = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    OthersPaymentMethods = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Document = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Description = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    InstallmentsQuantity = table.Column<int>(type: "int", nullable: false),
                    InstallmentPrice = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    TotalPriceInterest = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    TotalPercentageInterest = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    PaymentAtSight = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    CurrentInstallment = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ExpenseDay = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    CreditCardExpenseInvoiceId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FN_CreditCardExpenses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FN_CreditCardExpenses_aspnetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "aspnetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FN_CreditCardExpenses_FN_Cards_CardId",
                        column: x => x.CardId,
                        principalTable: "FN_Cards",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FN_CreditCardExpenses_FN_CategoriesExpenses_CategoryExpenseId",
                        column: x => x.CategoryExpenseId,
                        principalTable: "FN_CategoriesExpenses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FN_CreditCardExpenses_FN_CreditCardExpensesInvoices_CreditCa~",
                        column: x => x.CreditCardExpenseInvoiceId,
                        principalTable: "FN_CreditCardExpensesInvoices",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FN_CreditCardExpenses_FN_SubcategoriesExpenses_SubcategoryEx~",
                        column: x => x.SubcategoryExpenseId,
                        principalTable: "FN_SubcategoriesExpenses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FN_CreditCardExpenses_MN_Companies_UserId",
                        column: x => x.UserId,
                        principalTable: "MN_Companies",
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
                name: "IX_BS_Repairs_ServiceId",
                table: "BS_Repairs",
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
                name: "IX_BS_TableProvidedServicesPrices_ServiceName",
                table: "BS_TableProvidedServicesPrices",
                column: "ServiceName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_FN_BankAccount_CompanyId",
                table: "FN_BankAccount",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_FN_BankAccount_UserId",
                table: "FN_BankAccount",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_FN_Cards_BankAccountId",
                table: "FN_Cards",
                column: "BankAccountId");

            migrationBuilder.CreateIndex(
                name: "IX_FN_Cards_CompanyId",
                table: "FN_Cards",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_FN_Cards_UserId",
                table: "FN_Cards",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_FN_CategoriesExpenses_CompanyId",
                table: "FN_CategoriesExpenses",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_FN_CreditCardExpenses_CardId",
                table: "FN_CreditCardExpenses",
                column: "CardId");

            migrationBuilder.CreateIndex(
                name: "IX_FN_CreditCardExpenses_CategoryExpenseId",
                table: "FN_CreditCardExpenses",
                column: "CategoryExpenseId");

            migrationBuilder.CreateIndex(
                name: "IX_FN_CreditCardExpenses_CreditCardExpenseInvoiceId",
                table: "FN_CreditCardExpenses",
                column: "CreditCardExpenseInvoiceId");

            migrationBuilder.CreateIndex(
                name: "IX_FN_CreditCardExpenses_SubcategoryExpenseId",
                table: "FN_CreditCardExpenses",
                column: "SubcategoryExpenseId");

            migrationBuilder.CreateIndex(
                name: "IX_FN_CreditCardExpenses_UserId",
                table: "FN_CreditCardExpenses",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_FN_CreditCardExpensesInvoices_CardId",
                table: "FN_CreditCardExpensesInvoices",
                column: "CardId");

            migrationBuilder.CreateIndex(
                name: "IX_FN_CreditCardExpensesInvoices_PaidFromBankAccountId",
                table: "FN_CreditCardExpensesInvoices",
                column: "PaidFromBankAccountId");

            migrationBuilder.CreateIndex(
                name: "IX_FN_CreditCardExpensesInvoices_UserId",
                table: "FN_CreditCardExpensesInvoices",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_FN_CreditCardLimitOperations_CardId",
                table: "FN_CreditCardLimitOperations",
                column: "CardId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_FN_CreditCardLimitOperations_CompanyId",
                table: "FN_CreditCardLimitOperations",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_FN_CreditCardLimitOperations_UserId",
                table: "FN_CreditCardLimitOperations",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_FN_FinancingsAndLoansExpenses_CategoryExpenseId",
                table: "FN_FinancingsAndLoansExpenses",
                column: "CategoryExpenseId");

            migrationBuilder.CreateIndex(
                name: "IX_FN_FinancingsAndLoansExpenses_CompanyId",
                table: "FN_FinancingsAndLoansExpenses",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_FN_FinancingsAndLoansExpenses_SubcategoryExpenseId",
                table: "FN_FinancingsAndLoansExpenses",
                column: "SubcategoryExpenseId");

            migrationBuilder.CreateIndex(
                name: "IX_FN_FinancingsAndLoansExpenses_UserId",
                table: "FN_FinancingsAndLoansExpenses",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_FN_FinancingsAndLoansExpensesInstallments_BankAccountId",
                table: "FN_FinancingsAndLoansExpensesInstallments",
                column: "BankAccountId");

            migrationBuilder.CreateIndex(
                name: "IX_FN_FinancingsAndLoansExpensesInstallments_CardId",
                table: "FN_FinancingsAndLoansExpensesInstallments",
                column: "CardId");

            migrationBuilder.CreateIndex(
                name: "IX_FN_FinancingsAndLoansExpensesInstallments_CompanyId",
                table: "FN_FinancingsAndLoansExpensesInstallments",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_FN_FinancingsAndLoansExpensesInstallments_FinancingAndLoanEx~",
                table: "FN_FinancingsAndLoansExpensesInstallments",
                column: "FinancingAndLoanExpenseId");

            migrationBuilder.CreateIndex(
                name: "IX_FN_FinancingsAndLoansExpensesInstallments_PixId",
                table: "FN_FinancingsAndLoansExpensesInstallments",
                column: "PixId");

            migrationBuilder.CreateIndex(
                name: "IX_FN_FinancingsAndLoansExpensesInstallments_UserId",
                table: "FN_FinancingsAndLoansExpensesInstallments",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_FN_MonthlyFixedExpenses_BankAccountId",
                table: "FN_MonthlyFixedExpenses",
                column: "BankAccountId");

            migrationBuilder.CreateIndex(
                name: "IX_FN_MonthlyFixedExpenses_CardId",
                table: "FN_MonthlyFixedExpenses",
                column: "CardId");

            migrationBuilder.CreateIndex(
                name: "IX_FN_MonthlyFixedExpenses_CategoryExpenseId",
                table: "FN_MonthlyFixedExpenses",
                column: "CategoryExpenseId");

            migrationBuilder.CreateIndex(
                name: "IX_FN_MonthlyFixedExpenses_CompanyId",
                table: "FN_MonthlyFixedExpenses",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_FN_MonthlyFixedExpenses_PixId",
                table: "FN_MonthlyFixedExpenses",
                column: "PixId");

            migrationBuilder.CreateIndex(
                name: "IX_FN_MonthlyFixedExpenses_SubcategoryExpenseId",
                table: "FN_MonthlyFixedExpenses",
                column: "SubcategoryExpenseId");

            migrationBuilder.CreateIndex(
                name: "IX_FN_MonthlyFixedExpenses_UserId",
                table: "FN_MonthlyFixedExpenses",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_FN_Pixes_BankAccountId",
                table: "FN_Pixes",
                column: "BankAccountId");

            migrationBuilder.CreateIndex(
                name: "IX_FN_PixExpenses_CompanyId",
                table: "FN_PixExpenses",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_FN_PixExpenses_PixOutId",
                table: "FN_PixExpenses",
                column: "PixOutId");

            migrationBuilder.CreateIndex(
                name: "IX_FN_PixExpenses_UserId",
                table: "FN_PixExpenses",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_FN_SubcategoriesExpenses_CategoryExpenseId",
                table: "FN_SubcategoriesExpenses",
                column: "CategoryExpenseId");

            migrationBuilder.CreateIndex(
                name: "IX_FN_VariablesExpenses_BankAccountId",
                table: "FN_VariablesExpenses",
                column: "BankAccountId");

            migrationBuilder.CreateIndex(
                name: "IX_FN_VariablesExpenses_CardId",
                table: "FN_VariablesExpenses",
                column: "CardId");

            migrationBuilder.CreateIndex(
                name: "IX_FN_VariablesExpenses_CategoryExpenseId",
                table: "FN_VariablesExpenses",
                column: "CategoryExpenseId");

            migrationBuilder.CreateIndex(
                name: "IX_FN_VariablesExpenses_CompanyId",
                table: "FN_VariablesExpenses",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_FN_VariablesExpenses_PixId",
                table: "FN_VariablesExpenses",
                column: "PixId");

            migrationBuilder.CreateIndex(
                name: "IX_FN_VariablesExpenses_SubcategoryExpenseId",
                table: "FN_VariablesExpenses",
                column: "SubcategoryExpenseId");

            migrationBuilder.CreateIndex(
                name: "IX_FN_VariablesExpenses_UserId",
                table: "FN_VariablesExpenses",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_FN_YearlyFixedExpenses_BankAccountId",
                table: "FN_YearlyFixedExpenses",
                column: "BankAccountId");

            migrationBuilder.CreateIndex(
                name: "IX_FN_YearlyFixedExpenses_CardId",
                table: "FN_YearlyFixedExpenses",
                column: "CardId");

            migrationBuilder.CreateIndex(
                name: "IX_FN_YearlyFixedExpenses_CategoryExpenseId",
                table: "FN_YearlyFixedExpenses",
                column: "CategoryExpenseId");

            migrationBuilder.CreateIndex(
                name: "IX_FN_YearlyFixedExpenses_CompanyId",
                table: "FN_YearlyFixedExpenses",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_FN_YearlyFixedExpenses_PixId",
                table: "FN_YearlyFixedExpenses",
                column: "PixId");

            migrationBuilder.CreateIndex(
                name: "IX_FN_YearlyFixedExpenses_SubcategoryExpenseId",
                table: "FN_YearlyFixedExpenses",
                column: "SubcategoryExpenseId");

            migrationBuilder.CreateIndex(
                name: "IX_FN_YearlyFixedExpenses_UserId",
                table: "FN_YearlyFixedExpenses",
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
                name: "IX_MN_Customers_AdditionalCostsId",
                table: "MN_Customers",
                column: "AdditionalCostsId");

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
                name: "IX_MN_PartnerPaymentBankAccounts_PaymentDataId",
                table: "MN_PartnerPaymentBankAccounts",
                column: "PaymentDataId");

            migrationBuilder.CreateIndex(
                name: "IX_MN_PartnerPaymentPixes_PaymentDataId",
                table: "MN_PartnerPaymentPixes",
                column: "PaymentDataId");

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
                name: "IX_MN_Partners_PaymentsDataId",
                table: "MN_Partners",
                column: "PaymentsDataId");

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
                name: "IX_PD_Equipaments_Model",
                table: "PD_Equipaments",
                column: "Model",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_PD_Items_Fillers_CompanyId",
                table: "PD_Items_Fillers",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_PD_Items_Fillers_Name",
                table: "PD_Items_Fillers",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_PD_Manufacturers_Fillers_ItemId",
                table: "PD_Manufacturers_Fillers",
                column: "ItemId");

            migrationBuilder.CreateIndex(
                name: "IX_PD_Models_Fillers_ItemId",
                table: "PD_Models_Fillers",
                column: "ItemId");

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
                name: "IX_PD_Quantities_ReservedOrSoldByUserId",
                table: "PD_Quantities",
                column: "ReservedOrSoldByUserId");

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
                name: "IX_PD_Segments_Fillers_ItemId",
                table: "PD_Segments_Fillers",
                column: "ItemId");

            migrationBuilder.CreateIndex(
                name: "IX_PD_Trackings_CustomerId",
                table: "PD_Trackings",
                column: "CustomerId");

            migrationBuilder.CreateIndex(
                name: "IX_PD_Trackings_ProductId",
                table: "PD_Trackings",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_PD_Trackings_ServiceId",
                table: "PD_Trackings",
                column: "ServiceId");

            migrationBuilder.CreateIndex(
                name: "IX_PD_Trackings_UserId",
                table: "PD_Trackings",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_SD_socialnetworks_ContactId",
                table: "SD_socialnetworks",
                column: "ContactId");
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
                name: "BS_Repairs");

            migrationBuilder.DropTable(
                name: "BS_TableProvidedServicesPrices");

            migrationBuilder.DropTable(
                name: "FN_CreditCardExpenses");

            migrationBuilder.DropTable(
                name: "FN_CreditCardLimitOperations");

            migrationBuilder.DropTable(
                name: "FN_FinancingsAndLoansExpensesInstallments");

            migrationBuilder.DropTable(
                name: "FN_MonthlyFixedExpenses");

            migrationBuilder.DropTable(
                name: "FN_PixExpenses");

            migrationBuilder.DropTable(
                name: "FN_VariablesExpenses");

            migrationBuilder.DropTable(
                name: "FN_YearlyFixedExpenses");

            migrationBuilder.DropTable(
                name: "MN_PartnerPaymentBankAccounts");

            migrationBuilder.DropTable(
                name: "MN_PartnerPaymentPixes");

            migrationBuilder.DropTable(
                name: "OS_Destinies");

            migrationBuilder.DropTable(
                name: "OS_ElectronicsRepairs");

            migrationBuilder.DropTable(
                name: "PD_Manufacturers_Fillers");

            migrationBuilder.DropTable(
                name: "PD_Models_Fillers");

            migrationBuilder.DropTable(
                name: "PD_Quantities");

            migrationBuilder.DropTable(
                name: "PD_Segments_Fillers");

            migrationBuilder.DropTable(
                name: "PD_Trackings");

            migrationBuilder.DropTable(
                name: "SD_socialnetworks");

            migrationBuilder.DropTable(
                name: "aspnetRoles");

            migrationBuilder.DropTable(
                name: "FN_CreditCardExpensesInvoices");

            migrationBuilder.DropTable(
                name: "FN_FinancingsAndLoansExpenses");

            migrationBuilder.DropTable(
                name: "FN_Pixes");

            migrationBuilder.DropTable(
                name: "OS_CollectsDelivers");

            migrationBuilder.DropTable(
                name: "PD_Items_Fillers");

            migrationBuilder.DropTable(
                name: "BS_BudgetsServices");

            migrationBuilder.DropTable(
                name: "PD_Products");

            migrationBuilder.DropTable(
                name: "FN_Cards");

            migrationBuilder.DropTable(
                name: "FN_SubcategoriesExpenses");

            migrationBuilder.DropTable(
                name: "OS_BillingsFroms");

            migrationBuilder.DropTable(
                name: "BS_CollectsDeliversCosts");

            migrationBuilder.DropTable(
                name: "BS_Services");

            migrationBuilder.DropTable(
                name: "PD_Equipaments");

            migrationBuilder.DropTable(
                name: "FN_BankAccount");

            migrationBuilder.DropTable(
                name: "FN_CategoriesExpenses");

            migrationBuilder.DropTable(
                name: "MN_Customers");

            migrationBuilder.DropTable(
                name: "MN_Partners");

            migrationBuilder.DropTable(
                name: "aspnetUsers");

            migrationBuilder.DropTable(
                name: "MN_AdditionalCosts");

            migrationBuilder.DropTable(
                name: "MN_PaymentsData");

            migrationBuilder.DropTable(
                name: "MN_PhysicallyMovingCosts");

            migrationBuilder.DropTable(
                name: "MN_Companies");

            migrationBuilder.DropTable(
                name: "UserProfile");

            migrationBuilder.DropTable(
                name: "SD_Addresses");

            migrationBuilder.DropTable(
                name: "SD_Contacts");
        }
    }
}
