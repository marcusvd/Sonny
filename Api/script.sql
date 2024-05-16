CREATE TABLE IF NOT EXISTS `__EFMigrationsHistory` (
    `MigrationId` varchar(150) CHARACTER SET utf8mb4 NOT NULL,
    `ProductVersion` varchar(32) CHARACTER SET utf8mb4 NOT NULL,
    CONSTRAINT `PK___EFMigrationsHistory` PRIMARY KEY (`MigrationId`)
) CHARACTER SET utf8mb4;

START TRANSACTION;

ALTER DATABASE CHARACTER SET utf8mb4;

CREATE TABLE `aspnetRoleClaims` (
    `Id` int NOT NULL AUTO_INCREMENT,
    `RoleId` int NOT NULL,
    `ClaimType` longtext CHARACTER SET utf8mb4 NULL,
    `ClaimValue` longtext CHARACTER SET utf8mb4 NULL,
    CONSTRAINT `PK_aspnetRoleClaims` PRIMARY KEY (`Id`)
) CHARACTER SET utf8mb4;

CREATE TABLE `aspnetRoles` (
    `Id` int NOT NULL AUTO_INCREMENT,
    `Name` longtext CHARACTER SET utf8mb4 NULL,
    `NormalizedName` longtext CHARACTER SET utf8mb4 NULL,
    `ConcurrencyStamp` longtext CHARACTER SET utf8mb4 NULL,
    `Discriminator` longtext CHARACTER SET utf8mb4 NOT NULL,
    CONSTRAINT `PK_aspnetRoles` PRIMARY KEY (`Id`)
) CHARACTER SET utf8mb4;

CREATE TABLE `aspnetUserClaims` (
    `Id` int NOT NULL AUTO_INCREMENT,
    `UserId` int NOT NULL,
    `ClaimType` longtext CHARACTER SET utf8mb4 NULL,
    `ClaimValue` longtext CHARACTER SET utf8mb4 NULL,
    CONSTRAINT `PK_aspnetUserClaims` PRIMARY KEY (`Id`)
) CHARACTER SET utf8mb4;

CREATE TABLE `aspnetUserLogins` (
    `UserId` int NOT NULL AUTO_INCREMENT,
    `LoginProvider` longtext CHARACTER SET utf8mb4 NULL,
    `ProviderKey` longtext CHARACTER SET utf8mb4 NULL,
    `ProviderDisplayName` longtext CHARACTER SET utf8mb4 NULL,
    CONSTRAINT `PK_aspnetUserLogins` PRIMARY KEY (`UserId`)
) CHARACTER SET utf8mb4;

CREATE TABLE `AspNetUserTokens` (
    `UserId` int NOT NULL,
    `LoginProvider` varchar(255) CHARACTER SET utf8mb4 NOT NULL,
    `Name` varchar(255) CHARACTER SET utf8mb4 NOT NULL,
    `Value` longtext CHARACTER SET utf8mb4 NULL,
    CONSTRAINT `PK_AspNetUserTokens` PRIMARY KEY (`UserId`, `LoginProvider`, `Name`)
) CHARACTER SET utf8mb4;

CREATE TABLE `BS_CollectsDeliversCosts` (
    `Id` int NOT NULL AUTO_INCREMENT,
    `RoundTrip` tinyint(1) NOT NULL,
    `CostFrom` int NOT NULL,
    `Price` decimal(65,30) NOT NULL,
    CONSTRAINT `PK_BS_CollectsDeliversCosts` PRIMARY KEY (`Id`)
) CHARACTER SET utf8mb4;

CREATE TABLE `MN_AdditionalCosts` (
    `Id` int NOT NULL AUTO_INCREMENT,
    `FixedPhysicallyMovingCosts` decimal(65,30) NOT NULL,
    CONSTRAINT `PK_MN_AdditionalCosts` PRIMARY KEY (`Id`)
) CHARACTER SET utf8mb4;

CREATE TABLE `MN_PhysicallyMovingCosts` (
    `Id` int NOT NULL AUTO_INCREMENT,
    `Fuel` decimal(65,30) NOT NULL,
    `Apps` decimal(65,30) NOT NULL,
    `PublicTransport` decimal(65,30) NOT NULL,
    `MotoBoy` decimal(65,30) NOT NULL,
    CONSTRAINT `PK_MN_PhysicallyMovingCosts` PRIMARY KEY (`Id`)
) CHARACTER SET utf8mb4;

CREATE TABLE `PD_Equipaments` (
    `Id` int NOT NULL AUTO_INCREMENT,
    `Name` longtext CHARACTER SET utf8mb4 NULL,
    `Manufacturer` longtext CHARACTER SET utf8mb4 NULL,
    `Segment` longtext CHARACTER SET utf8mb4 NULL,
    `Model` varchar(255) CHARACTER SET utf8mb4 NOT NULL,
    `Description` longtext CHARACTER SET utf8mb4 NULL,
    CONSTRAINT `PK_PD_Equipaments` PRIMARY KEY (`Id`)
) CHARACTER SET utf8mb4;

CREATE TABLE `SD_Addresses` (
    `Id` int NOT NULL AUTO_INCREMENT,
    `ZipCode` longtext CHARACTER SET utf8mb4 NULL,
    `Street` longtext CHARACTER SET utf8mb4 NULL,
    `Number` longtext CHARACTER SET utf8mb4 NULL,
    `District` longtext CHARACTER SET utf8mb4 NULL,
    `City` longtext CHARACTER SET utf8mb4 NULL,
    `State` longtext CHARACTER SET utf8mb4 NULL,
    `Complement` longtext CHARACTER SET utf8mb4 NULL,
    CONSTRAINT `PK_SD_Addresses` PRIMARY KEY (`Id`)
) CHARACTER SET utf8mb4;

CREATE TABLE `SD_Contacts` (
    `Id` int NOT NULL AUTO_INCREMENT,
    `Email` longtext CHARACTER SET utf8mb4 NULL,
    `Site` longtext CHARACTER SET utf8mb4 NULL,
    `Cel` longtext CHARACTER SET utf8mb4 NULL,
    `Zap` longtext CHARACTER SET utf8mb4 NULL,
    `Landline` longtext CHARACTER SET utf8mb4 NULL,
    CONSTRAINT `PK_SD_Contacts` PRIMARY KEY (`Id`)
) CHARACTER SET utf8mb4;

CREATE TABLE `UserProfile` (
    `Id` int NOT NULL AUTO_INCREMENT,
    `UserProfileImage` longtext CHARACTER SET utf8mb4 NULL,
    CONSTRAINT `PK_UserProfile` PRIMARY KEY (`Id`)
) CHARACTER SET utf8mb4;

CREATE TABLE `MN_Companies` (
    `Id` int NOT NULL AUTO_INCREMENT,
    `Name` longtext CHARACTER SET utf8mb4 NULL,
    `AddressId` int NULL,
    `ContactId` int NULL,
    CONSTRAINT `PK_MN_Companies` PRIMARY KEY (`Id`),
    CONSTRAINT `FK_MN_Companies_SD_Addresses_AddressId` FOREIGN KEY (`AddressId`) REFERENCES `SD_Addresses` (`Id`) ON DELETE RESTRICT,
    CONSTRAINT `FK_MN_Companies_SD_Contacts_ContactId` FOREIGN KEY (`ContactId`) REFERENCES `SD_Contacts` (`Id`) ON DELETE RESTRICT
) CHARACTER SET utf8mb4;

CREATE TABLE `SD_socialnetworks` (
    `Id` int NOT NULL AUTO_INCREMENT,
    `Name` longtext CHARACTER SET utf8mb4 NULL,
    `Url` longtext CHARACTER SET utf8mb4 NULL,
    `ContactId` int NOT NULL,
    CONSTRAINT `PK_SD_socialnetworks` PRIMARY KEY (`Id`),
    CONSTRAINT `FK_SD_socialnetworks_SD_Contacts_ContactId` FOREIGN KEY (`ContactId`) REFERENCES `SD_Contacts` (`Id`) ON DELETE CASCADE
) CHARACTER SET utf8mb4;

CREATE TABLE `aspnetUsers` (
    `Id` int NOT NULL AUTO_INCREMENT,
    `UserName` longtext CHARACTER SET utf8mb4 NULL,
    `NormalizedUserName` longtext CHARACTER SET utf8mb4 NULL,
    `Email` longtext CHARACTER SET utf8mb4 NULL,
    `NormalizedEmail` longtext CHARACTER SET utf8mb4 NULL,
    `EmailConfirmed` tinyint(1) NOT NULL,
    `PasswordHash` longtext CHARACTER SET utf8mb4 NULL,
    `SecurityStamp` longtext CHARACTER SET utf8mb4 NULL,
    `ConcurrencyStamp` longtext CHARACTER SET utf8mb4 NULL,
    `PhoneNumber` longtext CHARACTER SET utf8mb4 NULL,
    `PhoneNumberConfirmed` tinyint(1) NOT NULL,
    `TwoFactorEnabled` tinyint(1) NOT NULL,
    `LockoutEnd` datetime(6) NULL,
    `LockoutEnabled` tinyint(1) NOT NULL,
    `AccessFailedCount` int NOT NULL,
    `Discriminator` longtext CHARACTER SET utf8mb4 NOT NULL,
    `CompanyId` int NULL,
    `ProfileId` int NULL,
    `AddressId` int NULL,
    `ContactId` int NULL,
    `Group` longtext CHARACTER SET utf8mb4 NULL,
    CONSTRAINT `PK_aspnetUsers` PRIMARY KEY (`Id`),
    CONSTRAINT `FK_aspnetUsers_MN_Companies_CompanyId` FOREIGN KEY (`CompanyId`) REFERENCES `MN_Companies` (`Id`) ON DELETE CASCADE,
    CONSTRAINT `FK_aspnetUsers_SD_Addresses_AddressId` FOREIGN KEY (`AddressId`) REFERENCES `SD_Addresses` (`Id`) ON DELETE RESTRICT,
    CONSTRAINT `FK_aspnetUsers_SD_Contacts_ContactId` FOREIGN KEY (`ContactId`) REFERENCES `SD_Contacts` (`Id`) ON DELETE RESTRICT,
    CONSTRAINT `FK_aspnetUsers_UserProfile_ProfileId` FOREIGN KEY (`ProfileId`) REFERENCES `UserProfile` (`Id`) ON DELETE RESTRICT
) CHARACTER SET utf8mb4;

CREATE TABLE `BS_TableProvidedServicesPrices` (
    `Id` int NOT NULL AUTO_INCREMENT,
    `ServiceName` varchar(255) CHARACTER SET utf8mb4 NOT NULL,
    `PriceService` decimal(65,30) NOT NULL,
    `CompanyId` int NOT NULL,
    CONSTRAINT `PK_BS_TableProvidedServicesPrices` PRIMARY KEY (`Id`),
    CONSTRAINT `FK_BS_TableProvidedServicesPrices_MN_Companies_CompanyId` FOREIGN KEY (`CompanyId`) REFERENCES `MN_Companies` (`Id`) ON DELETE CASCADE
) CHARACTER SET utf8mb4;

CREATE TABLE `FN_BankAccount` (
    `Id` int NOT NULL AUTO_INCREMENT,
    `CompanyId` int NOT NULL,
    `Holder` longtext CHARACTER SET utf8mb4 NULL,
    `Institution` longtext CHARACTER SET utf8mb4 NULL,
    `Account` longtext CHARACTER SET utf8mb4 NULL,
    `Agency` longtext CHARACTER SET utf8mb4 NULL,
    `ManagerName` longtext CHARACTER SET utf8mb4 NULL,
    `ManagerContact` longtext CHARACTER SET utf8mb4 NULL,
    `Pix` longtext CHARACTER SET utf8mb4 NULL,
    `Balance` decimal(65,30) NOT NULL,
    `Type` int NOT NULL,
    `Description` longtext CHARACTER SET utf8mb4 NULL,
    CONSTRAINT `PK_FN_BankAccount` PRIMARY KEY (`Id`),
    CONSTRAINT `FK_FN_BankAccount_MN_Companies_CompanyId` FOREIGN KEY (`CompanyId`) REFERENCES `MN_Companies` (`Id`) ON DELETE CASCADE
) CHARACTER SET utf8mb4;

CREATE TABLE `FN_Expenses` (
    `Id` int NOT NULL AUTO_INCREMENT,
    `CompanyId` int NOT NULL,
    `Name` longtext CHARACTER SET utf8mb4 NULL,
    `NameIdentification` longtext CHARACTER SET utf8mb4 NULL,
    `Expiration` datetime(6) NOT NULL,
    `NumberInstallment` int NOT NULL,
    `CyclePayment` int NOT NULL,
    `LinkCopyBill` longtext CHARACTER SET utf8mb4 NULL,
    `USERLinkCopyBill` longtext CHARACTER SET utf8mb4 NULL,
    `PASSLinkCopyBill` longtext CHARACTER SET utf8mb4 NULL,
    CONSTRAINT `PK_FN_Expenses` PRIMARY KEY (`Id`),
    CONSTRAINT `FK_FN_Expenses_MN_Companies_CompanyId` FOREIGN KEY (`CompanyId`) REFERENCES `MN_Companies` (`Id`) ON DELETE CASCADE
) CHARACTER SET utf8mb4;

CREATE TABLE `MN_Customers` (
    `Id` int NOT NULL AUTO_INCREMENT,
    `Assured` tinyint(1) NOT NULL,
    `Payment` decimal(65,30) NOT NULL,
    `Expiration` int NOT NULL,
    `Disabled` tinyint(1) NOT NULL,
    `Discount` decimal(65,30) NOT NULL,
    `AdditionalCostsId` int NULL,
    `CustomerType` int NOT NULL,
    `CompanyId` int NOT NULL,
    `Name` longtext CHARACTER SET utf8mb4 NULL,
    `Responsible` longtext CHARACTER SET utf8mb4 NULL,
    `CNPJ` longtext CHARACTER SET utf8mb4 NULL,
    `Registered` datetime(6) NOT NULL,
    `Description` longtext CHARACTER SET utf8mb4 NULL,
    `BusinessLine` longtext CHARACTER SET utf8mb4 NULL,
    `AddressId` int NULL,
    `ContactId` int NULL,
    `PhysicallyMovingCostsId` int NULL,
    CONSTRAINT `PK_MN_Customers` PRIMARY KEY (`Id`),
    CONSTRAINT `FK_MN_Customers_MN_AdditionalCosts_AdditionalCostsId` FOREIGN KEY (`AdditionalCostsId`) REFERENCES `MN_AdditionalCosts` (`Id`) ON DELETE RESTRICT,
    CONSTRAINT `FK_MN_Customers_MN_Companies_CompanyId` FOREIGN KEY (`CompanyId`) REFERENCES `MN_Companies` (`Id`) ON DELETE CASCADE,
    CONSTRAINT `FK_MN_Customers_MN_PhysicallyMovingCosts_PhysicallyMovingCostsId` FOREIGN KEY (`PhysicallyMovingCostsId`) REFERENCES `MN_PhysicallyMovingCosts` (`Id`) ON DELETE RESTRICT,
    CONSTRAINT `FK_MN_Customers_SD_Addresses_AddressId` FOREIGN KEY (`AddressId`) REFERENCES `SD_Addresses` (`Id`) ON DELETE RESTRICT,
    CONSTRAINT `FK_MN_Customers_SD_Contacts_ContactId` FOREIGN KEY (`ContactId`) REFERENCES `SD_Contacts` (`Id`) ON DELETE RESTRICT
) CHARACTER SET utf8mb4;

CREATE TABLE `MN_Partners` (
    `Id` int NOT NULL AUTO_INCREMENT,
    `PartnerType` int NOT NULL,
    `CompanyId` int NOT NULL,
    `Name` longtext CHARACTER SET utf8mb4 NULL,
    `Responsible` longtext CHARACTER SET utf8mb4 NULL,
    `CNPJ` longtext CHARACTER SET utf8mb4 NULL,
    `Registered` datetime(6) NOT NULL,
    `Description` longtext CHARACTER SET utf8mb4 NULL,
    `BusinessLine` longtext CHARACTER SET utf8mb4 NULL,
    `AddressId` int NULL,
    `ContactId` int NULL,
    `PhysicallyMovingCostsId` int NULL,
    CONSTRAINT `PK_MN_Partners` PRIMARY KEY (`Id`),
    CONSTRAINT `FK_MN_Partners_MN_Companies_CompanyId` FOREIGN KEY (`CompanyId`) REFERENCES `MN_Companies` (`Id`) ON DELETE CASCADE,
    CONSTRAINT `FK_MN_Partners_MN_PhysicallyMovingCosts_PhysicallyMovingCostsId` FOREIGN KEY (`PhysicallyMovingCostsId`) REFERENCES `MN_PhysicallyMovingCosts` (`Id`) ON DELETE RESTRICT,
    CONSTRAINT `FK_MN_Partners_SD_Addresses_AddressId` FOREIGN KEY (`AddressId`) REFERENCES `SD_Addresses` (`Id`) ON DELETE RESTRICT,
    CONSTRAINT `FK_MN_Partners_SD_Contacts_ContactId` FOREIGN KEY (`ContactId`) REFERENCES `SD_Contacts` (`Id`) ON DELETE RESTRICT
) CHARACTER SET utf8mb4;

CREATE TABLE `PD_Equipament_Fillers` (
    `Id` int NOT NULL AUTO_INCREMENT,
    `Equipament` varchar(255) CHARACTER SET utf8mb4 NOT NULL,
    `CompanyId` int NOT NULL,
    CONSTRAINT `PK_PD_Equipament_Fillers` PRIMARY KEY (`Id`),
    CONSTRAINT `FK_PD_Equipament_Fillers_MN_Companies_CompanyId` FOREIGN KEY (`CompanyId`) REFERENCES `MN_Companies` (`Id`) ON DELETE CASCADE
) CHARACTER SET utf8mb4;

CREATE TABLE `PD_Manufacturer_Fillers` (
    `Id` int NOT NULL AUTO_INCREMENT,
    `Manufacturer` varchar(255) CHARACTER SET utf8mb4 NOT NULL,
    `CompanyId` int NOT NULL,
    CONSTRAINT `PK_PD_Manufacturer_Fillers` PRIMARY KEY (`Id`),
    CONSTRAINT `FK_PD_Manufacturer_Fillers_MN_Companies_CompanyId` FOREIGN KEY (`CompanyId`) REFERENCES `MN_Companies` (`Id`) ON DELETE CASCADE
) CHARACTER SET utf8mb4;

CREATE TABLE `PD_Products` (
    `Id` int NOT NULL AUTO_INCREMENT,
    `CompanyId` int NOT NULL,
    `EquipamentId` int NULL,
    CONSTRAINT `PK_PD_Products` PRIMARY KEY (`Id`),
    CONSTRAINT `FK_PD_Products_MN_Companies_CompanyId` FOREIGN KEY (`CompanyId`) REFERENCES `MN_Companies` (`Id`) ON DELETE CASCADE,
    CONSTRAINT `FK_PD_Products_PD_Equipaments_EquipamentId` FOREIGN KEY (`EquipamentId`) REFERENCES `PD_Equipaments` (`Id`) ON DELETE RESTRICT
) CHARACTER SET utf8mb4;

CREATE TABLE `PD_Segment_Fillers` (
    `Id` int NOT NULL AUTO_INCREMENT,
    `Segment` varchar(255) CHARACTER SET utf8mb4 NOT NULL,
    `CompanyId` int NOT NULL,
    CONSTRAINT `PK_PD_Segment_Fillers` PRIMARY KEY (`Id`),
    CONSTRAINT `FK_PD_Segment_Fillers_MN_Companies_CompanyId` FOREIGN KEY (`CompanyId`) REFERENCES `MN_Companies` (`Id`) ON DELETE CASCADE
) CHARACTER SET utf8mb4;

CREATE TABLE `aspnetUserRoles` (
    `UserId` int NOT NULL,
    `RoleId` int NOT NULL,
    CONSTRAINT `PK_aspnetUserRoles` PRIMARY KEY (`UserId`, `RoleId`),
    CONSTRAINT `FK_aspnetUserRoles_aspnetRoles_RoleId` FOREIGN KEY (`RoleId`) REFERENCES `aspnetRoles` (`Id`) ON DELETE CASCADE,
    CONSTRAINT `FK_aspnetUserRoles_aspnetUsers_UserId` FOREIGN KEY (`UserId`) REFERENCES `aspnetUsers` (`Id`) ON DELETE CASCADE
) CHARACTER SET utf8mb4;

CREATE TABLE `BS_Services` (
    `Id` int NOT NULL AUTO_INCREMENT,
    `UserId` int NOT NULL,
    `Comments` longtext CHARACTER SET utf8mb4 NULL,
    `IsAuthorized` datetime(6) NOT NULL,
    `Finished` datetime(6) NOT NULL,
    CONSTRAINT `PK_BS_Services` PRIMARY KEY (`Id`),
    CONSTRAINT `FK_BS_Services_aspnetUsers_UserId` FOREIGN KEY (`UserId`) REFERENCES `aspnetUsers` (`Id`) ON DELETE CASCADE
) CHARACTER SET utf8mb4;

CREATE TABLE `FN_Cards` (
    `Id` int NOT NULL AUTO_INCREMENT,
    `Holder` longtext CHARACTER SET utf8mb4 NULL,
    `Flag` longtext CHARACTER SET utf8mb4 NULL,
    `Limit` decimal(65,30) NOT NULL,
    `Type` int NOT NULL,
    `Number` longtext CHARACTER SET utf8mb4 NULL,
    `CheckCode` int NOT NULL,
    `Description` longtext CHARACTER SET utf8mb4 NULL,
    `Validate` datetime(6) NOT NULL,
    `BankAccountId` int NOT NULL,
    CONSTRAINT `PK_FN_Cards` PRIMARY KEY (`Id`),
    CONSTRAINT `FK_FN_Cards_FN_BankAccount_BankAccountId` FOREIGN KEY (`BankAccountId`) REFERENCES `FN_BankAccount` (`Id`) ON DELETE CASCADE
) CHARACTER SET utf8mb4;

CREATE TABLE `MN_PaymentsData` (
    `Id` int NOT NULL AUTO_INCREMENT,
    `PaymentName` longtext CHARACTER SET utf8mb4 NULL,
    `Payment` longtext CHARACTER SET utf8mb4 NULL,
    `PartnerId` int NOT NULL,
    CONSTRAINT `PK_MN_PaymentsData` PRIMARY KEY (`Id`),
    CONSTRAINT `FK_MN_PaymentsData_MN_Partners_PartnerId` FOREIGN KEY (`PartnerId`) REFERENCES `MN_Partners` (`Id`) ON DELETE RESTRICT
) CHARACTER SET utf8mb4;

CREATE TABLE `OS_BillingsFroms` (
    `Id` int NOT NULL AUTO_INCREMENT,
    `PartnerId` int NULL,
    `CustomerId` int NULL,
    `Base` tinyint(1) NOT NULL,
    CONSTRAINT `PK_OS_BillingsFroms` PRIMARY KEY (`Id`),
    CONSTRAINT `FK_OS_BillingsFroms_MN_Customers_CustomerId` FOREIGN KEY (`CustomerId`) REFERENCES `MN_Customers` (`Id`) ON DELETE RESTRICT,
    CONSTRAINT `FK_OS_BillingsFroms_MN_Partners_PartnerId` FOREIGN KEY (`PartnerId`) REFERENCES `MN_Partners` (`Id`) ON DELETE RESTRICT
) CHARACTER SET utf8mb4;

CREATE TABLE `OS_ElectronicsRepairs` (
    `Id` int NOT NULL AUTO_INCREMENT,
    `CompanyId` int NOT NULL,
    `UserId` int NOT NULL,
    `Item` longtext CHARACTER SET utf8mb4 NULL,
    `EntryDate` datetime(6) NOT NULL,
    `Description` longtext CHARACTER SET utf8mb4 NULL,
    `Problem` longtext CHARACTER SET utf8mb4 NULL,
    `UserEquipament` longtext CHARACTER SET utf8mb4 NULL,
    `PasswordEquipament` longtext CHARACTER SET utf8mb4 NULL,
    `Price` decimal(65,30) NOT NULL,
    `ServiceProviderId` int NOT NULL,
    `CustomerId` int NOT NULL,
    `SolutionApplied` longtext CHARACTER SET utf8mb4 NULL,
    `Status` int NOT NULL,
    CONSTRAINT `PK_OS_ElectronicsRepairs` PRIMARY KEY (`Id`),
    CONSTRAINT `FK_OS_ElectronicsRepairs_aspnetUsers_UserId` FOREIGN KEY (`UserId`) REFERENCES `aspnetUsers` (`Id`) ON DELETE CASCADE,
    CONSTRAINT `FK_OS_ElectronicsRepairs_MN_Companies_CompanyId` FOREIGN KEY (`CompanyId`) REFERENCES `MN_Companies` (`Id`) ON DELETE CASCADE,
    CONSTRAINT `FK_OS_ElectronicsRepairs_MN_Customers_CustomerId` FOREIGN KEY (`CustomerId`) REFERENCES `MN_Customers` (`Id`) ON DELETE CASCADE,
    CONSTRAINT `FK_OS_ElectronicsRepairs_MN_Partners_ServiceProviderId` FOREIGN KEY (`ServiceProviderId`) REFERENCES `MN_Partners` (`Id`) ON DELETE CASCADE
) CHARACTER SET utf8mb4;

CREATE TABLE `PD_Quantities` (
    `Id` int NOT NULL AUTO_INCREMENT,
    `Sn` varchar(255) CHARACTER SET utf8mb4 NOT NULL,
    `NfNumber` longtext CHARACTER SET utf8mb4 NULL,
    `CostPrice` decimal(65,30) NOT NULL,
    `SoldPrice` decimal(65,30) NOT NULL,
    `EntryDate` datetime(6) NOT NULL,
    `SoldDate` datetime(6) NOT NULL,
    `WarrantyEnd` datetime(6) NOT NULL,
    `WarrantyEndLocal` datetime(6) NOT NULL,
    `IsUsed` tinyint(1) NOT NULL,
    `IsTested` tinyint(1) NOT NULL,
    `IsReserved` datetime(6) NOT NULL,
    `UsedHistorical` longtext CHARACTER SET utf8mb4 NULL,
    `CustomerId` int NULL,
    `ProductId` int NOT NULL,
    `SupplierId` int NOT NULL,
    `ReservedOrSoldByUserId` int NULL,
    CONSTRAINT `PK_PD_Quantities` PRIMARY KEY (`Id`),
    CONSTRAINT `FK_PD_Quantities_aspnetUsers_ReservedOrSoldByUserId` FOREIGN KEY (`ReservedOrSoldByUserId`) REFERENCES `aspnetUsers` (`Id`) ON DELETE SET NULL,
    CONSTRAINT `FK_PD_Quantities_MN_Customers_CustomerId` FOREIGN KEY (`CustomerId`) REFERENCES `MN_Customers` (`Id`) ON DELETE SET NULL,
    CONSTRAINT `FK_PD_Quantities_MN_Partners_SupplierId` FOREIGN KEY (`SupplierId`) REFERENCES `MN_Partners` (`Id`) ON DELETE RESTRICT,
    CONSTRAINT `FK_PD_Quantities_PD_Products_ProductId` FOREIGN KEY (`ProductId`) REFERENCES `PD_Products` (`Id`) ON DELETE CASCADE
) CHARACTER SET utf8mb4;

CREATE TABLE `BS_BudgetsServices` (
    `Id` int NOT NULL AUTO_INCREMENT,
    `CompanyId` int NOT NULL,
    `UserId` int NOT NULL,
    `CustomerId` int NOT NULL,
    `ProblemAccordingCustomer` longtext CHARACTER SET utf8mb4 NULL,
    `IsPresentVisuallyDescription` longtext CHARACTER SET utf8mb4 NULL,
    `ExecutionMode` int NOT NULL,
    `DataDescription` longtext CHARACTER SET utf8mb4 NULL,
    `EntryDate` datetime(6) NOT NULL,
    `ServiceId` int NULL,
    `CollectsDeliversCostsId` int NULL,
    `StatusService` int NOT NULL,
    CONSTRAINT `PK_BS_BudgetsServices` PRIMARY KEY (`Id`),
    CONSTRAINT `FK_BS_BudgetsServices_aspnetUsers_UserId` FOREIGN KEY (`UserId`) REFERENCES `aspnetUsers` (`Id`) ON DELETE CASCADE,
    CONSTRAINT `FK_BS_BudgetsServices_BS_CollectsDeliversCosts_CollectsDelivers~` FOREIGN KEY (`CollectsDeliversCostsId`) REFERENCES `BS_CollectsDeliversCosts` (`Id`) ON DELETE RESTRICT,
    CONSTRAINT `FK_BS_BudgetsServices_BS_Services_ServiceId` FOREIGN KEY (`ServiceId`) REFERENCES `BS_Services` (`Id`) ON DELETE RESTRICT,
    CONSTRAINT `FK_BS_BudgetsServices_MN_Companies_CompanyId` FOREIGN KEY (`CompanyId`) REFERENCES `MN_Companies` (`Id`) ON DELETE CASCADE,
    CONSTRAINT `FK_BS_BudgetsServices_MN_Customers_CustomerId` FOREIGN KEY (`CustomerId`) REFERENCES `MN_Customers` (`Id`) ON DELETE CASCADE
) CHARACTER SET utf8mb4;

CREATE TABLE `BS_Repairs` (
    `Id` int NOT NULL AUTO_INCREMENT,
    `ServiceName` longtext CHARACTER SET utf8mb4 NULL,
    `PriceService` decimal(65,30) NOT NULL,
    `ServiceId` int NOT NULL,
    `Added` datetime(6) NOT NULL,
    `ExecutedServicesComments` longtext CHARACTER SET utf8mb4 NULL,
    `RepairStatus` int NOT NULL,
    `ExecutionMode` int NOT NULL,
    CONSTRAINT `PK_BS_Repairs` PRIMARY KEY (`Id`),
    CONSTRAINT `FK_BS_Repairs_BS_Services_ServiceId` FOREIGN KEY (`ServiceId`) REFERENCES `BS_Services` (`Id`) ON DELETE CASCADE
) CHARACTER SET utf8mb4;

CREATE TABLE `FN_EssentialExpenses` (
    `Id` int NOT NULL AUTO_INCREMENT,
    `UserId` int NOT NULL,
    `ExpensesId` int NOT NULL,
    `BankAccountId` int NOT NULL,
    `PaidBy` int NOT NULL,
    `CardId` int NULL,
    `WasPaid` datetime(6) NOT NULL,
    `EntryRegister` datetime(6) NOT NULL,
    `Price` decimal(65,30) NOT NULL,
    `Interest` decimal(65,30) NOT NULL,
    CONSTRAINT `PK_FN_EssentialExpenses` PRIMARY KEY (`Id`),
    CONSTRAINT `FK_FN_EssentialExpenses_aspnetUsers_UserId` FOREIGN KEY (`UserId`) REFERENCES `aspnetUsers` (`Id`) ON DELETE CASCADE,
    CONSTRAINT `FK_FN_EssentialExpenses_FN_BankAccount_BankAccountId` FOREIGN KEY (`BankAccountId`) REFERENCES `FN_BankAccount` (`Id`) ON DELETE CASCADE,
    CONSTRAINT `FK_FN_EssentialExpenses_FN_Cards_CardId` FOREIGN KEY (`CardId`) REFERENCES `FN_Cards` (`Id`) ON DELETE RESTRICT,
    CONSTRAINT `FK_FN_EssentialExpenses_FN_Expenses_ExpensesId` FOREIGN KEY (`ExpensesId`) REFERENCES `FN_Expenses` (`Id`) ON DELETE CASCADE
) CHARACTER SET utf8mb4;

CREATE TABLE `FN_ExpensesNotPredictable` (
    `Id` int NOT NULL AUTO_INCREMENT,
    `UserId` int NOT NULL,
    `BankAccountId` int NOT NULL,
    `CustomerId` int NULL,
    `CardId` int NULL,
    `PaidBy` int NOT NULL,
    `ItemOrPlaceName` longtext CHARACTER SET utf8mb4 NULL,
    `DaySpent` datetime(6) NOT NULL,
    `EntryRegister` datetime(6) NOT NULL,
    `Price` decimal(65,30) NOT NULL,
    `Description` longtext CHARACTER SET utf8mb4 NULL,
    CONSTRAINT `PK_FN_ExpensesNotPredictable` PRIMARY KEY (`Id`),
    CONSTRAINT `FK_FN_ExpensesNotPredictable_aspnetUsers_UserId` FOREIGN KEY (`UserId`) REFERENCES `aspnetUsers` (`Id`) ON DELETE CASCADE,
    CONSTRAINT `FK_FN_ExpensesNotPredictable_FN_BankAccount_BankAccountId` FOREIGN KEY (`BankAccountId`) REFERENCES `FN_BankAccount` (`Id`) ON DELETE CASCADE,
    CONSTRAINT `FK_FN_ExpensesNotPredictable_FN_Cards_CardId` FOREIGN KEY (`CardId`) REFERENCES `FN_Cards` (`Id`) ON DELETE RESTRICT,
    CONSTRAINT `FK_FN_ExpensesNotPredictable_MN_Customers_CustomerId` FOREIGN KEY (`CustomerId`) REFERENCES `MN_Customers` (`Id`) ON DELETE SET NULL
) CHARACTER SET utf8mb4;

CREATE TABLE `OS_CollectsDelivers` (
    `Id` int NOT NULL AUTO_INCREMENT,
    `CompanyId` int NOT NULL,
    `UserId` int NOT NULL,
    `TransporterId` int NULL,
    `SubjectReason` longtext CHARACTER SET utf8mb4 NULL,
    `ContactName` longtext CHARACTER SET utf8mb4 NULL,
    `Start` datetime(6) NOT NULL,
    `Price` decimal(65,30) NOT NULL,
    `Collect` tinyint(1) NOT NULL,
    `Deliver` tinyint(1) NOT NULL,
    `Other` tinyint(1) NOT NULL,
    `BillingFromId` int NULL,
    `TaskOverView` longtext CHARACTER SET utf8mb4 NULL,
    CONSTRAINT `PK_OS_CollectsDelivers` PRIMARY KEY (`Id`),
    CONSTRAINT `FK_OS_CollectsDelivers_aspnetUsers_UserId` FOREIGN KEY (`UserId`) REFERENCES `aspnetUsers` (`Id`) ON DELETE CASCADE,
    CONSTRAINT `FK_OS_CollectsDelivers_MN_Companies_CompanyId` FOREIGN KEY (`CompanyId`) REFERENCES `MN_Companies` (`Id`) ON DELETE CASCADE,
    CONSTRAINT `FK_OS_CollectsDelivers_MN_Partners_TransporterId` FOREIGN KEY (`TransporterId`) REFERENCES `MN_Partners` (`Id`) ON DELETE RESTRICT,
    CONSTRAINT `FK_OS_CollectsDelivers_OS_BillingsFroms_BillingFromId` FOREIGN KEY (`BillingFromId`) REFERENCES `OS_BillingsFroms` (`Id`) ON DELETE RESTRICT
) CHARACTER SET utf8mb4;

CREATE TABLE `PD_Trackings` (
    `Id` int NOT NULL AUTO_INCREMENT,
    `CostPrice` decimal(65,30) NOT NULL,
    `SoldPrice` decimal(65,30) NOT NULL,
    `Sn` longtext CHARACTER SET utf8mb4 NULL,
    `NfNumber` longtext CHARACTER SET utf8mb4 NULL,
    `ServiceId` int NULL,
    `ProductId` int NOT NULL,
    `CustomerId` int NULL,
    `UserId` int NOT NULL,
    CONSTRAINT `PK_PD_Trackings` PRIMARY KEY (`Id`),
    CONSTRAINT `FK_PD_Trackings_aspnetUsers_UserId` FOREIGN KEY (`UserId`) REFERENCES `aspnetUsers` (`Id`) ON DELETE CASCADE,
    CONSTRAINT `FK_PD_Trackings_BS_BudgetsServices_ServiceId` FOREIGN KEY (`ServiceId`) REFERENCES `BS_BudgetsServices` (`Id`) ON DELETE RESTRICT,
    CONSTRAINT `FK_PD_Trackings_MN_Customers_CustomerId` FOREIGN KEY (`CustomerId`) REFERENCES `MN_Customers` (`Id`) ON DELETE RESTRICT,
    CONSTRAINT `FK_PD_Trackings_PD_Products_ProductId` FOREIGN KEY (`ProductId`) REFERENCES `PD_Products` (`Id`) ON DELETE CASCADE
) CHARACTER SET utf8mb4;

CREATE TABLE `OS_Destinies` (
    `Id` int NOT NULL AUTO_INCREMENT,
    `CustomerId` int NULL,
    `PartnerId` int NULL,
    `NoRegisterName` longtext CHARACTER SET utf8mb4 NULL,
    `NoRegisterAddress` longtext CHARACTER SET utf8mb4 NULL,
    `Description` longtext CHARACTER SET utf8mb4 NULL,
    `CollectDeliverId` int NOT NULL,
    CONSTRAINT `PK_OS_Destinies` PRIMARY KEY (`Id`),
    CONSTRAINT `FK_OS_Destinies_MN_Customers_CustomerId` FOREIGN KEY (`CustomerId`) REFERENCES `MN_Customers` (`Id`) ON DELETE RESTRICT,
    CONSTRAINT `FK_OS_Destinies_MN_Partners_PartnerId` FOREIGN KEY (`PartnerId`) REFERENCES `MN_Partners` (`Id`) ON DELETE RESTRICT,
    CONSTRAINT `FK_OS_Destinies_OS_CollectsDelivers_CollectDeliverId` FOREIGN KEY (`CollectDeliverId`) REFERENCES `OS_CollectsDelivers` (`Id`) ON DELETE CASCADE
) CHARACTER SET utf8mb4;

CREATE INDEX `IX_aspnetUserRoles_RoleId` ON `aspnetUserRoles` (`RoleId`);

CREATE INDEX `IX_aspnetUsers_AddressId` ON `aspnetUsers` (`AddressId`);

CREATE INDEX `IX_aspnetUsers_CompanyId` ON `aspnetUsers` (`CompanyId`);

CREATE INDEX `IX_aspnetUsers_ContactId` ON `aspnetUsers` (`ContactId`);

CREATE INDEX `IX_aspnetUsers_ProfileId` ON `aspnetUsers` (`ProfileId`);

CREATE INDEX `IX_BS_BudgetsServices_CollectsDeliversCostsId` ON `BS_BudgetsServices` (`CollectsDeliversCostsId`);

CREATE INDEX `IX_BS_BudgetsServices_CompanyId` ON `BS_BudgetsServices` (`CompanyId`);

CREATE INDEX `IX_BS_BudgetsServices_CustomerId` ON `BS_BudgetsServices` (`CustomerId`);

CREATE INDEX `IX_BS_BudgetsServices_ServiceId` ON `BS_BudgetsServices` (`ServiceId`);

CREATE INDEX `IX_BS_BudgetsServices_UserId` ON `BS_BudgetsServices` (`UserId`);

CREATE INDEX `IX_BS_Repairs_ServiceId` ON `BS_Repairs` (`ServiceId`);

CREATE INDEX `IX_BS_Services_UserId` ON `BS_Services` (`UserId`);

CREATE INDEX `IX_BS_TableProvidedServicesPrices_CompanyId` ON `BS_TableProvidedServicesPrices` (`CompanyId`);

CREATE UNIQUE INDEX `IX_BS_TableProvidedServicesPrices_ServiceName` ON `BS_TableProvidedServicesPrices` (`ServiceName`);

CREATE INDEX `IX_FN_BankAccount_CompanyId` ON `FN_BankAccount` (`CompanyId`);

CREATE INDEX `IX_FN_Cards_BankAccountId` ON `FN_Cards` (`BankAccountId`);

CREATE INDEX `IX_FN_EssentialExpenses_BankAccountId` ON `FN_EssentialExpenses` (`BankAccountId`);

CREATE INDEX `IX_FN_EssentialExpenses_CardId` ON `FN_EssentialExpenses` (`CardId`);

CREATE INDEX `IX_FN_EssentialExpenses_ExpensesId` ON `FN_EssentialExpenses` (`ExpensesId`);

CREATE INDEX `IX_FN_EssentialExpenses_UserId` ON `FN_EssentialExpenses` (`UserId`);

CREATE INDEX `IX_FN_Expenses_CompanyId` ON `FN_Expenses` (`CompanyId`);

CREATE INDEX `IX_FN_ExpensesNotPredictable_BankAccountId` ON `FN_ExpensesNotPredictable` (`BankAccountId`);

CREATE INDEX `IX_FN_ExpensesNotPredictable_CardId` ON `FN_ExpensesNotPredictable` (`CardId`);

CREATE INDEX `IX_FN_ExpensesNotPredictable_CustomerId` ON `FN_ExpensesNotPredictable` (`CustomerId`);

CREATE INDEX `IX_FN_ExpensesNotPredictable_UserId` ON `FN_ExpensesNotPredictable` (`UserId`);

CREATE INDEX `IX_MN_Companies_AddressId` ON `MN_Companies` (`AddressId`);

CREATE INDEX `IX_MN_Companies_ContactId` ON `MN_Companies` (`ContactId`);

CREATE INDEX `IX_MN_Customers_AdditionalCostsId` ON `MN_Customers` (`AdditionalCostsId`);

CREATE INDEX `IX_MN_Customers_AddressId` ON `MN_Customers` (`AddressId`);

CREATE INDEX `IX_MN_Customers_CompanyId` ON `MN_Customers` (`CompanyId`);

CREATE INDEX `IX_MN_Customers_ContactId` ON `MN_Customers` (`ContactId`);

CREATE INDEX `IX_MN_Customers_PhysicallyMovingCostsId` ON `MN_Customers` (`PhysicallyMovingCostsId`);

CREATE INDEX `IX_MN_Partners_AddressId` ON `MN_Partners` (`AddressId`);

CREATE INDEX `IX_MN_Partners_CompanyId` ON `MN_Partners` (`CompanyId`);

CREATE INDEX `IX_MN_Partners_ContactId` ON `MN_Partners` (`ContactId`);

CREATE INDEX `IX_MN_Partners_PhysicallyMovingCostsId` ON `MN_Partners` (`PhysicallyMovingCostsId`);

CREATE INDEX `IX_MN_PaymentsData_PartnerId` ON `MN_PaymentsData` (`PartnerId`);

CREATE INDEX `IX_OS_BillingsFroms_CustomerId` ON `OS_BillingsFroms` (`CustomerId`);

CREATE INDEX `IX_OS_BillingsFroms_PartnerId` ON `OS_BillingsFroms` (`PartnerId`);

CREATE INDEX `IX_OS_CollectsDelivers_BillingFromId` ON `OS_CollectsDelivers` (`BillingFromId`);

CREATE INDEX `IX_OS_CollectsDelivers_CompanyId` ON `OS_CollectsDelivers` (`CompanyId`);

CREATE INDEX `IX_OS_CollectsDelivers_TransporterId` ON `OS_CollectsDelivers` (`TransporterId`);

CREATE INDEX `IX_OS_CollectsDelivers_UserId` ON `OS_CollectsDelivers` (`UserId`);

CREATE UNIQUE INDEX `IX_OS_Destinies_CollectDeliverId` ON `OS_Destinies` (`CollectDeliverId`);

CREATE INDEX `IX_OS_Destinies_CustomerId` ON `OS_Destinies` (`CustomerId`);

CREATE INDEX `IX_OS_Destinies_PartnerId` ON `OS_Destinies` (`PartnerId`);

CREATE INDEX `IX_OS_ElectronicsRepairs_CompanyId` ON `OS_ElectronicsRepairs` (`CompanyId`);

CREATE INDEX `IX_OS_ElectronicsRepairs_CustomerId` ON `OS_ElectronicsRepairs` (`CustomerId`);

CREATE INDEX `IX_OS_ElectronicsRepairs_ServiceProviderId` ON `OS_ElectronicsRepairs` (`ServiceProviderId`);

CREATE INDEX `IX_OS_ElectronicsRepairs_UserId` ON `OS_ElectronicsRepairs` (`UserId`);

CREATE INDEX `IX_PD_Equipament_Fillers_CompanyId` ON `PD_Equipament_Fillers` (`CompanyId`);

CREATE UNIQUE INDEX `IX_PD_Equipament_Fillers_Equipament` ON `PD_Equipament_Fillers` (`Equipament`);

CREATE UNIQUE INDEX `IX_PD_Equipaments_Model` ON `PD_Equipaments` (`Model`);

CREATE INDEX `IX_PD_Manufacturer_Fillers_CompanyId` ON `PD_Manufacturer_Fillers` (`CompanyId`);

CREATE UNIQUE INDEX `IX_PD_Manufacturer_Fillers_Manufacturer` ON `PD_Manufacturer_Fillers` (`Manufacturer`);

CREATE INDEX `IX_PD_Products_CompanyId` ON `PD_Products` (`CompanyId`);

CREATE INDEX `IX_PD_Products_EquipamentId` ON `PD_Products` (`EquipamentId`);

CREATE INDEX `IX_PD_Quantities_CustomerId` ON `PD_Quantities` (`CustomerId`);

CREATE INDEX `IX_PD_Quantities_ProductId` ON `PD_Quantities` (`ProductId`);

CREATE INDEX `IX_PD_Quantities_ReservedOrSoldByUserId` ON `PD_Quantities` (`ReservedOrSoldByUserId`);

CREATE UNIQUE INDEX `IX_PD_Quantities_Sn` ON `PD_Quantities` (`Sn`);

CREATE INDEX `IX_PD_Quantities_SupplierId` ON `PD_Quantities` (`SupplierId`);

CREATE INDEX `IX_PD_Segment_Fillers_CompanyId` ON `PD_Segment_Fillers` (`CompanyId`);

CREATE UNIQUE INDEX `IX_PD_Segment_Fillers_Segment` ON `PD_Segment_Fillers` (`Segment`);

CREATE INDEX `IX_PD_Trackings_CustomerId` ON `PD_Trackings` (`CustomerId`);

CREATE INDEX `IX_PD_Trackings_ProductId` ON `PD_Trackings` (`ProductId`);

CREATE INDEX `IX_PD_Trackings_ServiceId` ON `PD_Trackings` (`ServiceId`);

CREATE INDEX `IX_PD_Trackings_UserId` ON `PD_Trackings` (`UserId`);

CREATE INDEX `IX_SD_socialnetworks_ContactId` ON `SD_socialnetworks` (`ContactId`);

INSERT INTO `__EFMigrationsHistory` (`MigrationId`, `ProductVersion`)
VALUES ('20231227200838_Add', '5.0.13');

COMMIT;

START TRANSACTION;

ALTER TABLE `MN_PaymentsData` DROP FOREIGN KEY `FK_MN_PaymentsData_MN_Partners_PartnerId`;

ALTER TABLE `MN_PaymentsData` DROP INDEX `IX_MN_PaymentsData_PartnerId`;

ALTER TABLE `MN_PaymentsData` DROP COLUMN `PartnerId`;

ALTER TABLE `MN_PaymentsData` RENAME COLUMN `PaymentName` TO `Pix`;

ALTER TABLE `MN_PaymentsData` RENAME COLUMN `Payment` TO `Others`;

ALTER TABLE `MN_PaymentsData` ADD `BankAccount` longtext CHARACTER SET utf8mb4 NULL;

ALTER TABLE `MN_PaymentsData` ADD `Money` tinyint(1) NOT NULL DEFAULT FALSE;

ALTER TABLE `MN_Partners` ADD `PaymentsDataId` int NULL;

CREATE INDEX `IX_MN_Partners_PaymentsDataId` ON `MN_Partners` (`PaymentsDataId`);

ALTER TABLE `MN_Partners` ADD CONSTRAINT `FK_MN_Partners_MN_PaymentsData_PaymentsDataId` FOREIGN KEY (`PaymentsDataId`) REFERENCES `MN_PaymentsData` (`Id`) ON DELETE RESTRICT;

INSERT INTO `__EFMigrationsHistory` (`MigrationId`, `ProductVersion`)
VALUES ('20231228181452_Add1', '5.0.13');

COMMIT;

START TRANSACTION;

ALTER TABLE `MN_Partners` RENAME COLUMN `PartnerType` TO `PartnerBusiness`;

ALTER TABLE `MN_Customers` RENAME COLUMN `CustomerType` TO `EntityType`;

ALTER TABLE `MN_Partners` ADD `EntityType` int NOT NULL DEFAULT 0;

INSERT INTO `__EFMigrationsHistory` (`MigrationId`, `ProductVersion`)
VALUES ('20240110173116_NayLindeza', '5.0.13');

COMMIT;

START TRANSACTION;

ALTER TABLE `FN_Cards` RENAME COLUMN `CheckCode` TO `CVC`;

INSERT INTO `__EFMigrationsHistory` (`MigrationId`, `ProductVersion`)
VALUES ('20240126193158_card-entity-change-check-code_field-CVC', '5.0.13');

COMMIT;

START TRANSACTION;

DROP TABLE `PD_Equipament_Fillers`;

DROP TABLE `PD_Manufacturer_Fillers`;

DROP TABLE `PD_Segment_Fillers`;

CREATE TABLE `PD_Items_Fillers` (
    `Id` int NOT NULL AUTO_INCREMENT,
    `CompanyId` int NOT NULL,
    `Name` longtext CHARACTER SET utf8mb4 NULL,
    `Description` longtext CHARACTER SET utf8mb4 NULL,
    CONSTRAINT `PK_PD_Items_Fillers` PRIMARY KEY (`Id`),
    CONSTRAINT `FK_PD_Items_Fillers_MN_Companies_CompanyId` FOREIGN KEY (`CompanyId`) REFERENCES `MN_Companies` (`Id`) ON DELETE CASCADE
) CHARACTER SET utf8mb4;

CREATE TABLE `Manufacturers_Fillers` (
    `Id` int NOT NULL AUTO_INCREMENT,
    `ItemId` int NOT NULL,
    `Name` longtext CHARACTER SET utf8mb4 NULL,
    CONSTRAINT `PK_Manufacturers_Fillers` PRIMARY KEY (`Id`),
    CONSTRAINT `FK_Manufacturers_Fillers_PD_Items_Fillers_ItemId` FOREIGN KEY (`ItemId`) REFERENCES `PD_Items_Fillers` (`Id`) ON DELETE CASCADE
) CHARACTER SET utf8mb4;

CREATE TABLE `PD_Models_Fillers` (
    `Id` int NOT NULL AUTO_INCREMENT,
    `ItemId` int NOT NULL,
    `Name` longtext CHARACTER SET utf8mb4 NULL,
    CONSTRAINT `PK_PD_Models_Fillers` PRIMARY KEY (`Id`),
    CONSTRAINT `FK_PD_Models_Fillers_PD_Items_Fillers_ItemId` FOREIGN KEY (`ItemId`) REFERENCES `PD_Items_Fillers` (`Id`) ON DELETE CASCADE
) CHARACTER SET utf8mb4;

CREATE TABLE `PD_Segments_Fillers` (
    `Id` int NOT NULL AUTO_INCREMENT,
    `ItemId` int NOT NULL,
    `Name` longtext CHARACTER SET utf8mb4 NULL,
    CONSTRAINT `PK_PD_Segments_Fillers` PRIMARY KEY (`Id`),
    CONSTRAINT `FK_PD_Segments_Fillers_PD_Items_Fillers_ItemId` FOREIGN KEY (`ItemId`) REFERENCES `PD_Items_Fillers` (`Id`) ON DELETE CASCADE
) CHARACTER SET utf8mb4;

CREATE INDEX `IX_Manufacturers_Fillers_ItemId` ON `Manufacturers_Fillers` (`ItemId`);

CREATE INDEX `IX_PD_Items_Fillers_CompanyId` ON `PD_Items_Fillers` (`CompanyId`);

CREATE INDEX `IX_PD_Models_Fillers_ItemId` ON `PD_Models_Fillers` (`ItemId`);

CREATE INDEX `IX_PD_Segments_Fillers_ItemId` ON `PD_Segments_Fillers` (`ItemId`);

INSERT INTO `__EFMigrationsHistory` (`MigrationId`, `ProductVersion`)
VALUES ('20240206140436_item-product8', '5.0.13');

COMMIT;

START TRANSACTION;

ALTER TABLE `PD_Items_Fillers` DROP COLUMN `Description`;

ALTER TABLE `PD_Models_Fillers` ADD `Description` longtext CHARACTER SET utf8mb4 NULL;

INSERT INTO `__EFMigrationsHistory` (`MigrationId`, `ProductVersion`)
VALUES ('20240206193911_item-product9', '5.0.13');

COMMIT;

START TRANSACTION;

DROP PROCEDURE IF EXISTS `POMELO_BEFORE_DROP_PRIMARY_KEY`;
DELIMITER //
CREATE PROCEDURE `POMELO_BEFORE_DROP_PRIMARY_KEY`(IN `SCHEMA_NAME_ARGUMENT` VARCHAR(255), IN `TABLE_NAME_ARGUMENT` VARCHAR(255))
BEGIN
	DECLARE HAS_AUTO_INCREMENT_ID TINYINT(1);
	DECLARE PRIMARY_KEY_COLUMN_NAME VARCHAR(255);
	DECLARE PRIMARY_KEY_TYPE VARCHAR(255);
	DECLARE SQL_EXP VARCHAR(1000);
	SELECT COUNT(*)
		INTO HAS_AUTO_INCREMENT_ID
		FROM `information_schema`.`COLUMNS`
		WHERE `TABLE_SCHEMA` = (SELECT IFNULL(SCHEMA_NAME_ARGUMENT, SCHEMA()))
			AND `TABLE_NAME` = TABLE_NAME_ARGUMENT
			AND `Extra` = 'auto_increment'
			AND `COLUMN_KEY` = 'PRI'
			LIMIT 1;
	IF HAS_AUTO_INCREMENT_ID THEN
		SELECT `COLUMN_TYPE`
			INTO PRIMARY_KEY_TYPE
			FROM `information_schema`.`COLUMNS`
			WHERE `TABLE_SCHEMA` = (SELECT IFNULL(SCHEMA_NAME_ARGUMENT, SCHEMA()))
				AND `TABLE_NAME` = TABLE_NAME_ARGUMENT
				AND `COLUMN_KEY` = 'PRI'
			LIMIT 1;
		SELECT `COLUMN_NAME`
			INTO PRIMARY_KEY_COLUMN_NAME
			FROM `information_schema`.`COLUMNS`
			WHERE `TABLE_SCHEMA` = (SELECT IFNULL(SCHEMA_NAME_ARGUMENT, SCHEMA()))
				AND `TABLE_NAME` = TABLE_NAME_ARGUMENT
				AND `COLUMN_KEY` = 'PRI'
			LIMIT 1;
		SET SQL_EXP = CONCAT('ALTER TABLE `', (SELECT IFNULL(SCHEMA_NAME_ARGUMENT, SCHEMA())), '`.`', TABLE_NAME_ARGUMENT, '` MODIFY COLUMN `', PRIMARY_KEY_COLUMN_NAME, '` ', PRIMARY_KEY_TYPE, ' NOT NULL;');
		SET @SQL_EXP = SQL_EXP;
		PREPARE SQL_EXP_EXECUTE FROM @SQL_EXP;
		EXECUTE SQL_EXP_EXECUTE;
		DEALLOCATE PREPARE SQL_EXP_EXECUTE;
	END IF;
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS `POMELO_AFTER_ADD_PRIMARY_KEY`;
DELIMITER //
CREATE PROCEDURE `POMELO_AFTER_ADD_PRIMARY_KEY`(IN `SCHEMA_NAME_ARGUMENT` VARCHAR(255), IN `TABLE_NAME_ARGUMENT` VARCHAR(255), IN `COLUMN_NAME_ARGUMENT` VARCHAR(255))
BEGIN
	DECLARE HAS_AUTO_INCREMENT_ID INT(11);
	DECLARE PRIMARY_KEY_COLUMN_NAME VARCHAR(255);
	DECLARE PRIMARY_KEY_TYPE VARCHAR(255);
	DECLARE SQL_EXP VARCHAR(1000);
	SELECT COUNT(*)
		INTO HAS_AUTO_INCREMENT_ID
		FROM `information_schema`.`COLUMNS`
		WHERE `TABLE_SCHEMA` = (SELECT IFNULL(SCHEMA_NAME_ARGUMENT, SCHEMA()))
			AND `TABLE_NAME` = TABLE_NAME_ARGUMENT
			AND `COLUMN_NAME` = COLUMN_NAME_ARGUMENT
			AND `COLUMN_TYPE` LIKE '%int%'
			AND `COLUMN_KEY` = 'PRI';
	IF HAS_AUTO_INCREMENT_ID THEN
		SELECT `COLUMN_TYPE`
			INTO PRIMARY_KEY_TYPE
			FROM `information_schema`.`COLUMNS`
			WHERE `TABLE_SCHEMA` = (SELECT IFNULL(SCHEMA_NAME_ARGUMENT, SCHEMA()))
				AND `TABLE_NAME` = TABLE_NAME_ARGUMENT
				AND `COLUMN_NAME` = COLUMN_NAME_ARGUMENT
				AND `COLUMN_TYPE` LIKE '%int%'
				AND `COLUMN_KEY` = 'PRI';
		SELECT `COLUMN_NAME`
			INTO PRIMARY_KEY_COLUMN_NAME
			FROM `information_schema`.`COLUMNS`
			WHERE `TABLE_SCHEMA` = (SELECT IFNULL(SCHEMA_NAME_ARGUMENT, SCHEMA()))
				AND `TABLE_NAME` = TABLE_NAME_ARGUMENT
				AND `COLUMN_NAME` = COLUMN_NAME_ARGUMENT
				AND `COLUMN_TYPE` LIKE '%int%'
				AND `COLUMN_KEY` = 'PRI';
		SET SQL_EXP = CONCAT('ALTER TABLE `', (SELECT IFNULL(SCHEMA_NAME_ARGUMENT, SCHEMA())), '`.`', TABLE_NAME_ARGUMENT, '` MODIFY COLUMN `', PRIMARY_KEY_COLUMN_NAME, '` ', PRIMARY_KEY_TYPE, ' NOT NULL AUTO_INCREMENT;');
		SET @SQL_EXP = SQL_EXP;
		PREPARE SQL_EXP_EXECUTE FROM @SQL_EXP;
		EXECUTE SQL_EXP_EXECUTE;
		DEALLOCATE PREPARE SQL_EXP_EXECUTE;
	END IF;
END //
DELIMITER ;

ALTER TABLE `Manufacturers_Fillers` DROP FOREIGN KEY `FK_Manufacturers_Fillers_PD_Items_Fillers_ItemId`;

CALL POMELO_BEFORE_DROP_PRIMARY_KEY(NULL, 'Manufacturers_Fillers');
ALTER TABLE `Manufacturers_Fillers` DROP PRIMARY KEY;

ALTER TABLE `Manufacturers_Fillers` RENAME `PD_Manufacturers_Fillers`;

ALTER TABLE `PD_Manufacturers_Fillers` RENAME INDEX `IX_Manufacturers_Fillers_ItemId` TO `IX_PD_Manufacturers_Fillers_ItemId`;

ALTER TABLE `PD_Manufacturers_Fillers` ADD CONSTRAINT `PK_PD_Manufacturers_Fillers` PRIMARY KEY (`Id`);
CALL POMELO_AFTER_ADD_PRIMARY_KEY(NULL, 'PD_Manufacturers_Fillers', 'Id');

ALTER TABLE `PD_Manufacturers_Fillers` ADD CONSTRAINT `FK_PD_Manufacturers_Fillers_PD_Items_Fillers_ItemId` FOREIGN KEY (`ItemId`) REFERENCES `PD_Items_Fillers` (`Id`) ON DELETE CASCADE;

INSERT INTO `__EFMigrationsHistory` (`MigrationId`, `ProductVersion`)
VALUES ('20240206200316_item-product10', '5.0.13');

DROP PROCEDURE `POMELO_BEFORE_DROP_PRIMARY_KEY`;

DROP PROCEDURE `POMELO_AFTER_ADD_PRIMARY_KEY`;

COMMIT;

START TRANSACTION;

INSERT INTO `__EFMigrationsHistory` (`MigrationId`, `ProductVersion`)
VALUES ('20240207170057_item-product11', '5.0.13');

COMMIT;

START TRANSACTION;

ALTER TABLE `PD_Segments_Fillers` MODIFY COLUMN `Name` varchar(255) CHARACTER SET utf8mb4 NOT NULL DEFAULT '';

ALTER TABLE `PD_Models_Fillers` MODIFY COLUMN `Name` varchar(255) CHARACTER SET utf8mb4 NOT NULL DEFAULT '';

ALTER TABLE `PD_Manufacturers_Fillers` MODIFY COLUMN `Name` varchar(255) CHARACTER SET utf8mb4 NOT NULL DEFAULT '';

CREATE UNIQUE INDEX `IX_PD_Segments_Fillers_Name` ON `PD_Segments_Fillers` (`Name`);

CREATE UNIQUE INDEX `IX_PD_Models_Fillers_Name` ON `PD_Models_Fillers` (`Name`);

CREATE UNIQUE INDEX `IX_PD_Manufacturers_Fillers_Name` ON `PD_Manufacturers_Fillers` (`Name`);

INSERT INTO `__EFMigrationsHistory` (`MigrationId`, `ProductVersion`)
VALUES ('20240207171711_item-product12', '5.0.13');

COMMIT;

START TRANSACTION;

ALTER TABLE `PD_Segments_Fillers` DROP INDEX `IX_PD_Segments_Fillers_Name`;

ALTER TABLE `PD_Manufacturers_Fillers` DROP INDEX `IX_PD_Manufacturers_Fillers_Name`;

ALTER TABLE `PD_Segments_Fillers` MODIFY COLUMN `Name` longtext CHARACTER SET utf8mb4 NOT NULL;

ALTER TABLE `PD_Manufacturers_Fillers` MODIFY COLUMN `Name` longtext CHARACTER SET utf8mb4 NOT NULL;

ALTER TABLE `PD_Items_Fillers` MODIFY COLUMN `Name` varchar(255) CHARACTER SET utf8mb4 NOT NULL DEFAULT '';

CREATE UNIQUE INDEX `IX_PD_Items_Fillers_Name` ON `PD_Items_Fillers` (`Name`);

INSERT INTO `__EFMigrationsHistory` (`MigrationId`, `ProductVersion`)
VALUES ('20240207225111_item-product13', '5.0.13');

COMMIT;

START TRANSACTION;

ALTER TABLE `PD_Models_Fillers` DROP INDEX `IX_PD_Models_Fillers_Name`;

ALTER TABLE `PD_Models_Fillers` MODIFY COLUMN `Name` longtext CHARACTER SET utf8mb4 NOT NULL;

INSERT INTO `__EFMigrationsHistory` (`MigrationId`, `ProductVersion`)
VALUES ('20240208164552_item-product14', '5.0.13');

COMMIT;

START TRANSACTION;

INSERT INTO `__EFMigrationsHistory` (`MigrationId`, `ProductVersion`)
VALUES ('20240219134223_item-product143', '5.0.13');

COMMIT;

START TRANSACTION;

ALTER TABLE `PD_Items_Fillers` MODIFY COLUMN `Name` varchar(100) CHARACTER SET utf8mb4 NOT NULL;

INSERT INTO `__EFMigrationsHistory` (`MigrationId`, `ProductVersion`)
VALUES ('20240219180414_item-product154673', '5.0.13');

COMMIT;

START TRANSACTION;

ALTER TABLE `PD_Segments_Fillers` MODIFY COLUMN `Name` varchar(100) CHARACTER SET utf8mb4 NOT NULL;

ALTER TABLE `PD_Manufacturers_Fillers` MODIFY COLUMN `Name` varchar(100) CHARACTER SET utf8mb4 NOT NULL;

ALTER TABLE `OS_CollectsDelivers` ADD `Deleted` tinyint(1) NOT NULL DEFAULT FALSE;

INSERT INTO `__EFMigrationsHistory` (`MigrationId`, `ProductVersion`)
VALUES ('20240419205806_add-deleted-filed-collect-deliver', '5.0.13');

COMMIT;

START TRANSACTION;

ALTER TABLE `MN_Customers` RENAME COLUMN `Disabled` TO `Deleted`;

ALTER TABLE `MN_Partners` ADD `Deleted` tinyint(1) NOT NULL DEFAULT FALSE;

INSERT INTO `__EFMigrationsHistory` (`MigrationId`, `ProductVersion`)
VALUES ('20240422141003_add-deleted-filed-main-entity', '5.0.13');

COMMIT;

START TRANSACTION;

ALTER TABLE `OS_CollectsDelivers` ADD `KindTransport` longtext CHARACTER SET utf8mb4 NULL;

INSERT INTO `__EFMigrationsHistory` (`MigrationId`, `ProductVersion`)
VALUES ('20240423212508_add-collect-deliver-filed-kindTransport', '5.0.13');

COMMIT;

START TRANSACTION;

ALTER TABLE `MN_PaymentsData` DROP COLUMN `BankAccount`;

ALTER TABLE `MN_PaymentsData` DROP COLUMN `Pix`;

ALTER TABLE `FN_BankAccount` DROP COLUMN `Pix`;

CREATE TABLE `FN_Pix` (
    `Id` int NOT NULL AUTO_INCREMENT,
    `Key` longtext CHARACTER SET utf8mb4 NULL,
    `Value` longtext CHARACTER SET utf8mb4 NULL,
    `BankAccountId` int NOT NULL,
    CONSTRAINT `PK_FN_Pix` PRIMARY KEY (`Id`),
    CONSTRAINT `FK_FN_Pix_FN_BankAccount_BankAccountId` FOREIGN KEY (`BankAccountId`) REFERENCES `FN_BankAccount` (`Id`) ON DELETE CASCADE
) CHARACTER SET utf8mb4;

CREATE TABLE `PartnerPaymentBankAccount` (
    `Id` int NOT NULL AUTO_INCREMENT,
    `Institution` longtext CHARACTER SET utf8mb4 NULL,
    `Account` longtext CHARACTER SET utf8mb4 NULL,
    `Agency` longtext CHARACTER SET utf8mb4 NULL,
    `Type` int NOT NULL,
    `PaymentDataId` int NOT NULL,
    `Description` longtext CHARACTER SET utf8mb4 NULL,
    CONSTRAINT `PK_PartnerPaymentBankAccount` PRIMARY KEY (`Id`),
    CONSTRAINT `FK_PartnerPaymentBankAccount_MN_PaymentsData_PaymentDataId` FOREIGN KEY (`PaymentDataId`) REFERENCES `MN_PaymentsData` (`Id`) ON DELETE RESTRICT
) CHARACTER SET utf8mb4;

CREATE TABLE `PartnerPaymentPix` (
    `Id` int NOT NULL AUTO_INCREMENT,
    `Key` longtext CHARACTER SET utf8mb4 NULL,
    `Value` longtext CHARACTER SET utf8mb4 NULL,
    `PaymentDataId` int NOT NULL,
    CONSTRAINT `PK_PartnerPaymentPix` PRIMARY KEY (`Id`),
    CONSTRAINT `FK_PartnerPaymentPix_MN_PaymentsData_PaymentDataId` FOREIGN KEY (`PaymentDataId`) REFERENCES `MN_PaymentsData` (`Id`) ON DELETE RESTRICT
) CHARACTER SET utf8mb4;

CREATE INDEX `IX_FN_Pix_BankAccountId` ON `FN_Pix` (`BankAccountId`);

CREATE INDEX `IX_PartnerPaymentBankAccount_PaymentDataId` ON `PartnerPaymentBankAccount` (`PaymentDataId`);

CREATE INDEX `IX_PartnerPaymentPix_PaymentDataId` ON `PartnerPaymentPix` (`PaymentDataId`);

INSERT INTO `__EFMigrationsHistory` (`MigrationId`, `ProductVersion`)
VALUES ('20240512134026_pix-payment-partner-pix-finances', '5.0.13');

COMMIT;

START TRANSACTION;

DROP PROCEDURE IF EXISTS `POMELO_BEFORE_DROP_PRIMARY_KEY`;
DELIMITER //
CREATE PROCEDURE `POMELO_BEFORE_DROP_PRIMARY_KEY`(IN `SCHEMA_NAME_ARGUMENT` VARCHAR(255), IN `TABLE_NAME_ARGUMENT` VARCHAR(255))
BEGIN
	DECLARE HAS_AUTO_INCREMENT_ID TINYINT(1);
	DECLARE PRIMARY_KEY_COLUMN_NAME VARCHAR(255);
	DECLARE PRIMARY_KEY_TYPE VARCHAR(255);
	DECLARE SQL_EXP VARCHAR(1000);
	SELECT COUNT(*)
		INTO HAS_AUTO_INCREMENT_ID
		FROM `information_schema`.`COLUMNS`
		WHERE `TABLE_SCHEMA` = (SELECT IFNULL(SCHEMA_NAME_ARGUMENT, SCHEMA()))
			AND `TABLE_NAME` = TABLE_NAME_ARGUMENT
			AND `Extra` = 'auto_increment'
			AND `COLUMN_KEY` = 'PRI'
			LIMIT 1;
	IF HAS_AUTO_INCREMENT_ID THEN
		SELECT `COLUMN_TYPE`
			INTO PRIMARY_KEY_TYPE
			FROM `information_schema`.`COLUMNS`
			WHERE `TABLE_SCHEMA` = (SELECT IFNULL(SCHEMA_NAME_ARGUMENT, SCHEMA()))
				AND `TABLE_NAME` = TABLE_NAME_ARGUMENT
				AND `COLUMN_KEY` = 'PRI'
			LIMIT 1;
		SELECT `COLUMN_NAME`
			INTO PRIMARY_KEY_COLUMN_NAME
			FROM `information_schema`.`COLUMNS`
			WHERE `TABLE_SCHEMA` = (SELECT IFNULL(SCHEMA_NAME_ARGUMENT, SCHEMA()))
				AND `TABLE_NAME` = TABLE_NAME_ARGUMENT
				AND `COLUMN_KEY` = 'PRI'
			LIMIT 1;
		SET SQL_EXP = CONCAT('ALTER TABLE `', (SELECT IFNULL(SCHEMA_NAME_ARGUMENT, SCHEMA())), '`.`', TABLE_NAME_ARGUMENT, '` MODIFY COLUMN `', PRIMARY_KEY_COLUMN_NAME, '` ', PRIMARY_KEY_TYPE, ' NOT NULL;');
		SET @SQL_EXP = SQL_EXP;
		PREPARE SQL_EXP_EXECUTE FROM @SQL_EXP;
		EXECUTE SQL_EXP_EXECUTE;
		DEALLOCATE PREPARE SQL_EXP_EXECUTE;
	END IF;
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS `POMELO_AFTER_ADD_PRIMARY_KEY`;
DELIMITER //
CREATE PROCEDURE `POMELO_AFTER_ADD_PRIMARY_KEY`(IN `SCHEMA_NAME_ARGUMENT` VARCHAR(255), IN `TABLE_NAME_ARGUMENT` VARCHAR(255), IN `COLUMN_NAME_ARGUMENT` VARCHAR(255))
BEGIN
	DECLARE HAS_AUTO_INCREMENT_ID INT(11);
	DECLARE PRIMARY_KEY_COLUMN_NAME VARCHAR(255);
	DECLARE PRIMARY_KEY_TYPE VARCHAR(255);
	DECLARE SQL_EXP VARCHAR(1000);
	SELECT COUNT(*)
		INTO HAS_AUTO_INCREMENT_ID
		FROM `information_schema`.`COLUMNS`
		WHERE `TABLE_SCHEMA` = (SELECT IFNULL(SCHEMA_NAME_ARGUMENT, SCHEMA()))
			AND `TABLE_NAME` = TABLE_NAME_ARGUMENT
			AND `COLUMN_NAME` = COLUMN_NAME_ARGUMENT
			AND `COLUMN_TYPE` LIKE '%int%'
			AND `COLUMN_KEY` = 'PRI';
	IF HAS_AUTO_INCREMENT_ID THEN
		SELECT `COLUMN_TYPE`
			INTO PRIMARY_KEY_TYPE
			FROM `information_schema`.`COLUMNS`
			WHERE `TABLE_SCHEMA` = (SELECT IFNULL(SCHEMA_NAME_ARGUMENT, SCHEMA()))
				AND `TABLE_NAME` = TABLE_NAME_ARGUMENT
				AND `COLUMN_NAME` = COLUMN_NAME_ARGUMENT
				AND `COLUMN_TYPE` LIKE '%int%'
				AND `COLUMN_KEY` = 'PRI';
		SELECT `COLUMN_NAME`
			INTO PRIMARY_KEY_COLUMN_NAME
			FROM `information_schema`.`COLUMNS`
			WHERE `TABLE_SCHEMA` = (SELECT IFNULL(SCHEMA_NAME_ARGUMENT, SCHEMA()))
				AND `TABLE_NAME` = TABLE_NAME_ARGUMENT
				AND `COLUMN_NAME` = COLUMN_NAME_ARGUMENT
				AND `COLUMN_TYPE` LIKE '%int%'
				AND `COLUMN_KEY` = 'PRI';
		SET SQL_EXP = CONCAT('ALTER TABLE `', (SELECT IFNULL(SCHEMA_NAME_ARGUMENT, SCHEMA())), '`.`', TABLE_NAME_ARGUMENT, '` MODIFY COLUMN `', PRIMARY_KEY_COLUMN_NAME, '` ', PRIMARY_KEY_TYPE, ' NOT NULL AUTO_INCREMENT;');
		SET @SQL_EXP = SQL_EXP;
		PREPARE SQL_EXP_EXECUTE FROM @SQL_EXP;
		EXECUTE SQL_EXP_EXECUTE;
		DEALLOCATE PREPARE SQL_EXP_EXECUTE;
	END IF;
END //
DELIMITER ;

ALTER TABLE `FN_Pix` DROP FOREIGN KEY `FK_FN_Pix_FN_BankAccount_BankAccountId`;

ALTER TABLE `PartnerPaymentBankAccount` DROP FOREIGN KEY `FK_PartnerPaymentBankAccount_MN_PaymentsData_PaymentDataId`;

ALTER TABLE `PartnerPaymentPix` DROP FOREIGN KEY `FK_PartnerPaymentPix_MN_PaymentsData_PaymentDataId`;

CALL POMELO_BEFORE_DROP_PRIMARY_KEY(NULL, 'PartnerPaymentPix');
ALTER TABLE `PartnerPaymentPix` DROP PRIMARY KEY;

CALL POMELO_BEFORE_DROP_PRIMARY_KEY(NULL, 'PartnerPaymentBankAccount');
ALTER TABLE `PartnerPaymentBankAccount` DROP PRIMARY KEY;

CALL POMELO_BEFORE_DROP_PRIMARY_KEY(NULL, 'FN_Pix');
ALTER TABLE `FN_Pix` DROP PRIMARY KEY;

ALTER TABLE `PartnerPaymentPix` RENAME `MN_PartnerPaymentPixes`;

ALTER TABLE `PartnerPaymentBankAccount` RENAME `MN_PartnerPaymentBankAccounts`;

ALTER TABLE `FN_Pix` RENAME `FN_Pixes`;

ALTER TABLE `MN_PartnerPaymentPixes` RENAME INDEX `IX_PartnerPaymentPix_PaymentDataId` TO `IX_MN_PartnerPaymentPixes_PaymentDataId`;

ALTER TABLE `MN_PartnerPaymentBankAccounts` RENAME INDEX `IX_PartnerPaymentBankAccount_PaymentDataId` TO `IX_MN_PartnerPaymentBankAccounts_PaymentDataId`;

ALTER TABLE `FN_Pixes` RENAME INDEX `IX_FN_Pix_BankAccountId` TO `IX_FN_Pixes_BankAccountId`;

ALTER TABLE `MN_PartnerPaymentPixes` ADD CONSTRAINT `PK_MN_PartnerPaymentPixes` PRIMARY KEY (`Id`);
CALL POMELO_AFTER_ADD_PRIMARY_KEY(NULL, 'MN_PartnerPaymentPixes', 'Id');

ALTER TABLE `MN_PartnerPaymentBankAccounts` ADD CONSTRAINT `PK_MN_PartnerPaymentBankAccounts` PRIMARY KEY (`Id`);
CALL POMELO_AFTER_ADD_PRIMARY_KEY(NULL, 'MN_PartnerPaymentBankAccounts', 'Id');

ALTER TABLE `FN_Pixes` ADD CONSTRAINT `PK_FN_Pixes` PRIMARY KEY (`Id`);
CALL POMELO_AFTER_ADD_PRIMARY_KEY(NULL, 'FN_Pixes', 'Id');

ALTER TABLE `FN_Pixes` ADD CONSTRAINT `FK_FN_Pixes_FN_BankAccount_BankAccountId` FOREIGN KEY (`BankAccountId`) REFERENCES `FN_BankAccount` (`Id`) ON DELETE CASCADE;

ALTER TABLE `MN_PartnerPaymentBankAccounts` ADD CONSTRAINT `FK_MN_PartnerPaymentBankAccounts_MN_PaymentsData_PaymentDataId` FOREIGN KEY (`PaymentDataId`) REFERENCES `MN_PaymentsData` (`Id`) ON DELETE RESTRICT;

ALTER TABLE `MN_PartnerPaymentPixes` ADD CONSTRAINT `FK_MN_PartnerPaymentPixes_MN_PaymentsData_PaymentDataId` FOREIGN KEY (`PaymentDataId`) REFERENCES `MN_PaymentsData` (`Id`) ON DELETE RESTRICT;

INSERT INTO `__EFMigrationsHistory` (`MigrationId`, `ProductVersion`)
VALUES ('20240512134744_pix-payment-partner-pix-finances-2', '5.0.13');

DROP PROCEDURE `POMELO_BEFORE_DROP_PRIMARY_KEY`;

DROP PROCEDURE `POMELO_AFTER_ADD_PRIMARY_KEY`;

COMMIT;

START TRANSACTION;

INSERT INTO `__EFMigrationsHistory` (`MigrationId`, `ProductVersion`)
VALUES ('20240512231622_add-collect', '5.0.13');

COMMIT;

START TRANSACTION;

INSERT INTO `__EFMigrationsHistory` (`MigrationId`, `ProductVersion`)
VALUES ('20240513005355_add-collec-eeee', '5.0.13');

COMMIT;

START TRANSACTION;

INSERT INTO `__EFMigrationsHistory` (`MigrationId`, `ProductVersion`)
VALUES ('20240514215844_remove-filed-description-payment-partner-bank-account', '5.0.13');

COMMIT;

START TRANSACTION;

ALTER TABLE `MN_PartnerPaymentBankAccounts` DROP COLUMN `Description`;

INSERT INTO `__EFMigrationsHistory` (`MigrationId`, `ProductVersion`)
VALUES ('20240514221842_remove-filed', '5.0.13');

COMMIT;

START TRANSACTION;

ALTER TABLE `MN_PartnerPaymentPixes` ADD `Holder` longtext CHARACTER SET utf8mb4 NULL;

INSERT INTO `__EFMigrationsHistory` (`MigrationId`, `ProductVersion`)
VALUES ('20240515142450_add-filed-partner-payment-pix-dto', '5.0.13');

COMMIT;

START TRANSACTION;

ALTER TABLE `MN_PartnerPaymentBankAccounts` ADD `Holder` longtext CHARACTER SET utf8mb4 NULL;

INSERT INTO `__EFMigrationsHistory` (`MigrationId`, `ProductVersion`)
VALUES ('20240515173631_add-field-holder-partner-paymentdata-banckaccount', '5.0.13');

COMMIT;

