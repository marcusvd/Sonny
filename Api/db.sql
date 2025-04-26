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

CREATE TABLE `SD_Addresses` (
    `Id` int NOT NULL AUTO_INCREMENT,
    `ZipCode` longtext CHARACTER SET utf8mb4 NULL,
    `Street` longtext CHARACTER SET utf8mb4 NULL,
    `Number` longtext CHARACTER SET utf8mb4 NULL,
    `District` longtext CHARACTER SET utf8mb4 NULL,
    `City` longtext CHARACTER SET utf8mb4 NULL,
    `State` longtext CHARACTER SET utf8mb4 NULL,
    `Complement` longtext CHARACTER SET utf8mb4 NULL,
    `Deleted` datetime(6) NOT NULL,
    `Registered` datetime(6) NOT NULL,
    CONSTRAINT `PK_SD_Addresses` PRIMARY KEY (`Id`)
) CHARACTER SET utf8mb4;

CREATE TABLE `SD_Contacts` (
    `Id` int NOT NULL AUTO_INCREMENT,
    `Email` longtext CHARACTER SET utf8mb4 NULL,
    `Site` longtext CHARACTER SET utf8mb4 NULL,
    `Cel` longtext CHARACTER SET utf8mb4 NULL,
    `Zap` longtext CHARACTER SET utf8mb4 NULL,
    `Landline` longtext CHARACTER SET utf8mb4 NULL,
    `Deleted` datetime(6) NOT NULL,
    `Registered` datetime(6) NOT NULL,
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
    `Deleted` tinyint(1) NOT NULL,
    CONSTRAINT `PK_MN_Companies` PRIMARY KEY (`Id`),
    CONSTRAINT `FK_MN_Companies_SD_Addresses_AddressId` FOREIGN KEY (`AddressId`) REFERENCES `SD_Addresses` (`Id`) ON DELETE RESTRICT,
    CONSTRAINT `FK_MN_Companies_SD_Contacts_ContactId` FOREIGN KEY (`ContactId`) REFERENCES `SD_Contacts` (`Id`) ON DELETE RESTRICT
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
    `Deleted` tinyint(1) NULL,
    `Registered` datetime(6) NULL,
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

CREATE TABLE `MN_AdditionalCosts` (
    `Id` int NOT NULL AUTO_INCREMENT,
    `FixedPhysicallyMovingCosts` decimal(65,30) NOT NULL,
    `CompanyId` int NOT NULL,
    `Deleted` datetime(6) NOT NULL,
    `Registered` datetime(6) NOT NULL,
    CONSTRAINT `PK_MN_AdditionalCosts` PRIMARY KEY (`Id`),
    CONSTRAINT `FK_MN_AdditionalCosts_MN_Companies_CompanyId` FOREIGN KEY (`CompanyId`) REFERENCES `MN_Companies` (`Id`) ON DELETE CASCADE
) CHARACTER SET utf8mb4;

CREATE TABLE `MN_PaymentsData` (
    `Id` int NOT NULL AUTO_INCREMENT,
    `Money` tinyint(1) NOT NULL,
    `Others` longtext CHARACTER SET utf8mb4 NULL,
    `CompanyId` int NOT NULL,
    `Deleted` datetime(6) NOT NULL,
    `Registered` datetime(6) NOT NULL,
    CONSTRAINT `PK_MN_PaymentsData` PRIMARY KEY (`Id`),
    CONSTRAINT `FK_MN_PaymentsData_MN_Companies_CompanyId` FOREIGN KEY (`CompanyId`) REFERENCES `MN_Companies` (`Id`) ON DELETE CASCADE
) CHARACTER SET utf8mb4;

CREATE TABLE `MN_PhysicallyMovingCosts` (
    `Id` int NOT NULL AUTO_INCREMENT,
    `Fuel` decimal(65,30) NOT NULL,
    `Apps` decimal(65,30) NOT NULL,
    `PublicTransport` decimal(65,30) NOT NULL,
    `MotoBoy` decimal(65,30) NOT NULL,
    `CompanyId` int NOT NULL,
    `Deleted` datetime(6) NOT NULL,
    `Registered` datetime(6) NOT NULL,
    CONSTRAINT `PK_MN_PhysicallyMovingCosts` PRIMARY KEY (`Id`),
    CONSTRAINT `FK_MN_PhysicallyMovingCosts_MN_Companies_CompanyId` FOREIGN KEY (`CompanyId`) REFERENCES `MN_Companies` (`Id`) ON DELETE CASCADE
) CHARACTER SET utf8mb4;

CREATE TABLE `SD_socialnetworks` (
    `Id` int NOT NULL AUTO_INCREMENT,
    `Name` longtext CHARACTER SET utf8mb4 NULL,
    `Url` longtext CHARACTER SET utf8mb4 NULL,
    `ContactId` int NOT NULL,
    `CompanyId` int NOT NULL,
    `Deleted` datetime(6) NOT NULL,
    `Registered` datetime(6) NOT NULL,
    CONSTRAINT `PK_SD_socialnetworks` PRIMARY KEY (`Id`),
    CONSTRAINT `FK_SD_socialnetworks_MN_Companies_CompanyId` FOREIGN KEY (`CompanyId`) REFERENCES `MN_Companies` (`Id`) ON DELETE CASCADE,
    CONSTRAINT `FK_SD_socialnetworks_SD_Contacts_ContactId` FOREIGN KEY (`ContactId`) REFERENCES `SD_Contacts` (`Id`) ON DELETE CASCADE
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

CREATE TABLE `FN_BankAccount` (
    `Id` int NOT NULL AUTO_INCREMENT,
    `Holder` longtext CHARACTER SET utf8mb4 NULL,
    `Institution` longtext CHARACTER SET utf8mb4 NULL,
    `Account` longtext CHARACTER SET utf8mb4 NULL,
    `Agency` longtext CHARACTER SET utf8mb4 NULL,
    `ManagerName` longtext CHARACTER SET utf8mb4 NULL,
    `ManagerContact` longtext CHARACTER SET utf8mb4 NULL,
    `Balance` decimal(65,30) NOT NULL,
    `Description` longtext CHARACTER SET utf8mb4 NULL,
    `Type` int NOT NULL,
    `UserId` int NOT NULL,
    `CompanyId` int NOT NULL,
    `Deleted` datetime(6) NOT NULL,
    `Registered` datetime(6) NOT NULL,
    CONSTRAINT `PK_FN_BankAccount` PRIMARY KEY (`Id`),
    CONSTRAINT `FK_FN_BankAccount_aspnetUsers_UserId` FOREIGN KEY (`UserId`) REFERENCES `aspnetUsers` (`Id`) ON DELETE CASCADE,
    CONSTRAINT `FK_FN_BankAccount_MN_Companies_CompanyId` FOREIGN KEY (`CompanyId`) REFERENCES `MN_Companies` (`Id`) ON DELETE CASCADE
) CHARACTER SET utf8mb4;

CREATE TABLE `FN_CategoriesExpenses` (
    `Id` int NOT NULL AUTO_INCREMENT,
    `Name` longtext CHARACTER SET utf8mb4 NULL,
    `UserId` int NOT NULL,
    `CompanyId` int NOT NULL,
    `Deleted` datetime(6) NOT NULL,
    `Registered` datetime(6) NOT NULL,
    CONSTRAINT `PK_FN_CategoriesExpenses` PRIMARY KEY (`Id`),
    CONSTRAINT `FK_FN_CategoriesExpenses_aspnetUsers_UserId` FOREIGN KEY (`UserId`) REFERENCES `aspnetUsers` (`Id`) ON DELETE CASCADE,
    CONSTRAINT `FK_FN_CategoriesExpenses_MN_Companies_CompanyId` FOREIGN KEY (`CompanyId`) REFERENCES `MN_Companies` (`Id`) ON DELETE CASCADE
) CHARACTER SET utf8mb4;

CREATE TABLE `PD_ProductTypes` (
    `Id` int NOT NULL AUTO_INCREMENT,
    `Name` varchar(100) CHARACTER SET utf8mb4 NOT NULL,
    `UserId` int NOT NULL,
    `CompanyId` int NOT NULL,
    `Deleted` datetime(6) NOT NULL,
    `Registered` datetime(6) NOT NULL,
    CONSTRAINT `PK_PD_ProductTypes` PRIMARY KEY (`Id`),
    CONSTRAINT `FK_PD_ProductTypes_aspnetUsers_UserId` FOREIGN KEY (`UserId`) REFERENCES `aspnetUsers` (`Id`) ON DELETE CASCADE,
    CONSTRAINT `FK_PD_ProductTypes_MN_Companies_CompanyId` FOREIGN KEY (`CompanyId`) REFERENCES `MN_Companies` (`Id`) ON DELETE CASCADE
) CHARACTER SET utf8mb4;

CREATE TABLE `MN_PartnerPaymentBankAccounts` (
    `Id` int NOT NULL AUTO_INCREMENT,
    `Holder` longtext CHARACTER SET utf8mb4 NULL,
    `Institution` longtext CHARACTER SET utf8mb4 NULL,
    `Account` longtext CHARACTER SET utf8mb4 NULL,
    `Agency` longtext CHARACTER SET utf8mb4 NULL,
    `Type` int NOT NULL,
    `PaymentDataId` int NOT NULL,
    `CompanyId` int NOT NULL,
    `Deleted` datetime(6) NOT NULL,
    `Registered` datetime(6) NOT NULL,
    CONSTRAINT `PK_MN_PartnerPaymentBankAccounts` PRIMARY KEY (`Id`),
    CONSTRAINT `FK_MN_PartnerPaymentBankAccounts_MN_Companies_CompanyId` FOREIGN KEY (`CompanyId`) REFERENCES `MN_Companies` (`Id`) ON DELETE CASCADE,
    CONSTRAINT `FK_MN_PartnerPaymentBankAccounts_MN_PaymentsData_PaymentDataId` FOREIGN KEY (`PaymentDataId`) REFERENCES `MN_PaymentsData` (`Id`) ON DELETE RESTRICT
) CHARACTER SET utf8mb4;

CREATE TABLE `MN_PartnerPaymentPixes` (
    `Id` int NOT NULL AUTO_INCREMENT,
    `Key` longtext CHARACTER SET utf8mb4 NULL,
    `Value` longtext CHARACTER SET utf8mb4 NULL,
    `Holder` longtext CHARACTER SET utf8mb4 NULL,
    `PaymentDataId` int NOT NULL,
    `CompanyId` int NOT NULL,
    `Deleted` datetime(6) NOT NULL,
    `Registered` datetime(6) NOT NULL,
    CONSTRAINT `PK_MN_PartnerPaymentPixes` PRIMARY KEY (`Id`),
    CONSTRAINT `FK_MN_PartnerPaymentPixes_MN_Companies_CompanyId` FOREIGN KEY (`CompanyId`) REFERENCES `MN_Companies` (`Id`) ON DELETE CASCADE,
    CONSTRAINT `FK_MN_PartnerPaymentPixes_MN_PaymentsData_PaymentDataId` FOREIGN KEY (`PaymentDataId`) REFERENCES `MN_PaymentsData` (`Id`) ON DELETE RESTRICT
) CHARACTER SET utf8mb4;

CREATE TABLE `MN_Customers` (
    `Id` int NOT NULL AUTO_INCREMENT,
    `Assured` datetime(6) NOT NULL,
    `Payment` decimal(65,30) NOT NULL,
    `Expires` datetime(6) NOT NULL,
    `Discount` decimal(65,30) NOT NULL,
    `AdditionalCostsId` int NULL,
    `UserId` int NOT NULL,
    `CompanyId` int NOT NULL,
    `Deleted` datetime(6) NOT NULL,
    `Registered` datetime(6) NOT NULL,
    `Name` longtext CHARACTER SET utf8mb4 NULL,
    `Responsible` longtext CHARACTER SET utf8mb4 NULL,
    `CNPJ` longtext CHARACTER SET utf8mb4 NULL,
    `EntityType` int NOT NULL,
    `Description` longtext CHARACTER SET utf8mb4 NULL,
    `BusinessLine` longtext CHARACTER SET utf8mb4 NULL,
    `AddressId` int NULL,
    `ContactId` int NULL,
    `PhysicallyMovingCostsId` int NULL,
    CONSTRAINT `PK_MN_Customers` PRIMARY KEY (`Id`),
    CONSTRAINT `FK_MN_Customers_aspnetUsers_UserId` FOREIGN KEY (`UserId`) REFERENCES `aspnetUsers` (`Id`) ON DELETE CASCADE,
    CONSTRAINT `FK_MN_Customers_MN_AdditionalCosts_AdditionalCostsId` FOREIGN KEY (`AdditionalCostsId`) REFERENCES `MN_AdditionalCosts` (`Id`) ON DELETE RESTRICT,
    CONSTRAINT `FK_MN_Customers_MN_Companies_CompanyId` FOREIGN KEY (`CompanyId`) REFERENCES `MN_Companies` (`Id`) ON DELETE CASCADE,
    CONSTRAINT `FK_MN_Customers_MN_PhysicallyMovingCosts_PhysicallyMovingCostsId` FOREIGN KEY (`PhysicallyMovingCostsId`) REFERENCES `MN_PhysicallyMovingCosts` (`Id`) ON DELETE RESTRICT,
    CONSTRAINT `FK_MN_Customers_SD_Addresses_AddressId` FOREIGN KEY (`AddressId`) REFERENCES `SD_Addresses` (`Id`) ON DELETE RESTRICT,
    CONSTRAINT `FK_MN_Customers_SD_Contacts_ContactId` FOREIGN KEY (`ContactId`) REFERENCES `SD_Contacts` (`Id`) ON DELETE RESTRICT
) CHARACTER SET utf8mb4;

CREATE TABLE `MN_Partners` (
    `Id` int NOT NULL AUTO_INCREMENT,
    `PaymentsDataId` int NULL,
    `PartnerBusiness` int NOT NULL,
    `UserId` int NOT NULL,
    `CompanyId` int NOT NULL,
    `Deleted` datetime(6) NOT NULL,
    `Registered` datetime(6) NOT NULL,
    `Name` longtext CHARACTER SET utf8mb4 NULL,
    `Responsible` longtext CHARACTER SET utf8mb4 NULL,
    `CNPJ` longtext CHARACTER SET utf8mb4 NULL,
    `EntityType` int NOT NULL,
    `Description` longtext CHARACTER SET utf8mb4 NULL,
    `BusinessLine` longtext CHARACTER SET utf8mb4 NULL,
    `AddressId` int NULL,
    `ContactId` int NULL,
    `PhysicallyMovingCostsId` int NULL,
    CONSTRAINT `PK_MN_Partners` PRIMARY KEY (`Id`),
    CONSTRAINT `FK_MN_Partners_aspnetUsers_UserId` FOREIGN KEY (`UserId`) REFERENCES `aspnetUsers` (`Id`) ON DELETE CASCADE,
    CONSTRAINT `FK_MN_Partners_MN_Companies_CompanyId` FOREIGN KEY (`CompanyId`) REFERENCES `MN_Companies` (`Id`) ON DELETE CASCADE,
    CONSTRAINT `FK_MN_Partners_MN_PaymentsData_PaymentsDataId` FOREIGN KEY (`PaymentsDataId`) REFERENCES `MN_PaymentsData` (`Id`) ON DELETE RESTRICT,
    CONSTRAINT `FK_MN_Partners_MN_PhysicallyMovingCosts_PhysicallyMovingCostsId` FOREIGN KEY (`PhysicallyMovingCostsId`) REFERENCES `MN_PhysicallyMovingCosts` (`Id`) ON DELETE RESTRICT,
    CONSTRAINT `FK_MN_Partners_SD_Addresses_AddressId` FOREIGN KEY (`AddressId`) REFERENCES `SD_Addresses` (`Id`) ON DELETE RESTRICT,
    CONSTRAINT `FK_MN_Partners_SD_Contacts_ContactId` FOREIGN KEY (`ContactId`) REFERENCES `SD_Contacts` (`Id`) ON DELETE RESTRICT
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

CREATE TABLE `FN_Cards` (
    `Id` int NOT NULL AUTO_INCREMENT,
    `Holder` longtext CHARACTER SET utf8mb4 NULL,
    `Flag` longtext CHARACTER SET utf8mb4 NULL,
    `CreditLimit` decimal(65,30) NOT NULL,
    `Type` int NOT NULL,
    `Number` longtext CHARACTER SET utf8mb4 NULL,
    `CVC` int NOT NULL,
    `Description` longtext CHARACTER SET utf8mb4 NULL,
    `Validate` datetime(6) NOT NULL,
    `ClosingDate` datetime(6) NOT NULL,
    `ExpiresDate` datetime(6) NOT NULL,
    `BankAccountId` int NULL,
    `UserId` int NOT NULL,
    `CompanyId` int NOT NULL,
    `Deleted` datetime(6) NOT NULL,
    `Registered` datetime(6) NOT NULL,
    CONSTRAINT `PK_FN_Cards` PRIMARY KEY (`Id`),
    CONSTRAINT `FK_FN_Cards_aspnetUsers_UserId` FOREIGN KEY (`UserId`) REFERENCES `aspnetUsers` (`Id`) ON DELETE CASCADE,
    CONSTRAINT `FK_FN_Cards_FN_BankAccount_BankAccountId` FOREIGN KEY (`BankAccountId`) REFERENCES `FN_BankAccount` (`Id`) ON DELETE RESTRICT,
    CONSTRAINT `FK_FN_Cards_MN_Companies_CompanyId` FOREIGN KEY (`CompanyId`) REFERENCES `MN_Companies` (`Id`) ON DELETE CASCADE
) CHARACTER SET utf8mb4;

CREATE TABLE `FN_Pixes` (
    `Id` int NOT NULL AUTO_INCREMENT,
    `Key` longtext CHARACTER SET utf8mb4 NULL,
    `Value` longtext CHARACTER SET utf8mb4 NULL,
    `Deleted` datetime(6) NOT NULL,
    `BankAccountId` int NOT NULL,
    CONSTRAINT `PK_FN_Pixes` PRIMARY KEY (`Id`),
    CONSTRAINT `FK_FN_Pixes_FN_BankAccount_BankAccountId` FOREIGN KEY (`BankAccountId`) REFERENCES `FN_BankAccount` (`Id`) ON DELETE CASCADE
) CHARACTER SET utf8mb4;

CREATE TABLE `FN_SubcategoriesExpenses` (
    `Id` int NOT NULL AUTO_INCREMENT,
    `Name` longtext CHARACTER SET utf8mb4 NULL,
    `CategoryExpenseId` int NOT NULL,
    `PayCycle` int NOT NULL,
    `UserId` int NOT NULL,
    `CompanyId` int NOT NULL,
    `Deleted` datetime(6) NOT NULL,
    `Registered` datetime(6) NOT NULL,
    CONSTRAINT `PK_FN_SubcategoriesExpenses` PRIMARY KEY (`Id`),
    CONSTRAINT `FK_FN_SubcategoriesExpenses_FN_CategoriesExpenses_CategoryExpen~` FOREIGN KEY (`CategoryExpenseId`) REFERENCES `FN_CategoriesExpenses` (`Id`) ON DELETE CASCADE
) CHARACTER SET utf8mb4;

CREATE TABLE `PD_Segments` (
    `Id` int NOT NULL AUTO_INCREMENT,
    `Name` varchar(100) CHARACTER SET utf8mb4 NOT NULL,
    `ProductTypeId` int NOT NULL,
    `CompanyId` int NOT NULL,
    `Deleted` datetime(6) NOT NULL,
    `Registered` datetime(6) NOT NULL,
    CONSTRAINT `PK_PD_Segments` PRIMARY KEY (`Id`),
    CONSTRAINT `FK_PD_Segments_MN_Companies_CompanyId` FOREIGN KEY (`CompanyId`) REFERENCES `MN_Companies` (`Id`) ON DELETE CASCADE,
    CONSTRAINT `FK_PD_Segments_PD_ProductTypes_ProductTypeId` FOREIGN KEY (`ProductTypeId`) REFERENCES `PD_ProductTypes` (`Id`) ON DELETE CASCADE
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
    `IsAuthorized` datetime(6) NOT NULL,
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

CREATE TABLE `OS_BillingsFroms` (
    `Id` int NOT NULL AUTO_INCREMENT,
    `PartnerId` int NULL,
    `CustomerId` int NULL,
    `Base` tinyint(1) NOT NULL,
    `CompanyId` int NOT NULL,
    `Deleted` datetime(6) NOT NULL,
    `Registered` datetime(6) NOT NULL,
    CONSTRAINT `PK_OS_BillingsFroms` PRIMARY KEY (`Id`),
    CONSTRAINT `FK_OS_BillingsFroms_MN_Companies_CompanyId` FOREIGN KEY (`CompanyId`) REFERENCES `MN_Companies` (`Id`) ON DELETE CASCADE,
    CONSTRAINT `FK_OS_BillingsFroms_MN_Customers_CustomerId` FOREIGN KEY (`CustomerId`) REFERENCES `MN_Customers` (`Id`) ON DELETE RESTRICT,
    CONSTRAINT `FK_OS_BillingsFroms_MN_Partners_PartnerId` FOREIGN KEY (`PartnerId`) REFERENCES `MN_Partners` (`Id`) ON DELETE RESTRICT
) CHARACTER SET utf8mb4;

CREATE TABLE `OS_Destinies` (
    `Id` int NOT NULL AUTO_INCREMENT,
    `CustomerId` int NULL,
    `PartnerId` int NULL,
    `NoRegisterName` longtext CHARACTER SET utf8mb4 NULL,
    `NoRegisterAddress` longtext CHARACTER SET utf8mb4 NULL,
    `CompanyId` int NOT NULL,
    `Deleted` datetime(6) NOT NULL,
    `Registered` datetime(6) NOT NULL,
    CONSTRAINT `PK_OS_Destinies` PRIMARY KEY (`Id`),
    CONSTRAINT `FK_OS_Destinies_MN_Companies_CompanyId` FOREIGN KEY (`CompanyId`) REFERENCES `MN_Companies` (`Id`) ON DELETE CASCADE,
    CONSTRAINT `FK_OS_Destinies_MN_Customers_CustomerId` FOREIGN KEY (`CustomerId`) REFERENCES `MN_Customers` (`Id`) ON DELETE RESTRICT,
    CONSTRAINT `FK_OS_Destinies_MN_Partners_PartnerId` FOREIGN KEY (`PartnerId`) REFERENCES `MN_Partners` (`Id`) ON DELETE RESTRICT
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

CREATE TABLE `FN_CreditCardExpensesInvoices` (
    `Id` int NOT NULL AUTO_INCREMENT,
    `CardId` int NULL,
    `PaidFromBankAccountId` int NULL,
    `Price` decimal(65,30) NOT NULL,
    `Interest` decimal(65,30) NOT NULL,
    `Expires` datetime(6) NOT NULL,
    `ClosingDate` datetime(6) NOT NULL,
    `WasPaid` datetime(6) NOT NULL,
    `OthersPaymentMethods` longtext CHARACTER SET utf8mb4 NULL,
    `Document` longtext CHARACTER SET utf8mb4 NULL,
    `Description` longtext CHARACTER SET utf8mb4 NULL,
    `UserId` int NOT NULL,
    `CompanyId` int NOT NULL,
    `Deleted` datetime(6) NOT NULL,
    `Registered` datetime(6) NOT NULL,
    CONSTRAINT `PK_FN_CreditCardExpensesInvoices` PRIMARY KEY (`Id`),
    CONSTRAINT `FK_FN_CreditCardExpensesInvoices_aspnetUsers_UserId` FOREIGN KEY (`UserId`) REFERENCES `aspnetUsers` (`Id`) ON DELETE CASCADE,
    CONSTRAINT `FK_FN_CreditCardExpensesInvoices_FN_BankAccount_PaidFromBankAcc~` FOREIGN KEY (`PaidFromBankAccountId`) REFERENCES `FN_BankAccount` (`Id`) ON DELETE RESTRICT,
    CONSTRAINT `FK_FN_CreditCardExpensesInvoices_FN_Cards_CardId` FOREIGN KEY (`CardId`) REFERENCES `FN_Cards` (`Id`) ON DELETE RESTRICT,
    CONSTRAINT `FK_FN_CreditCardExpensesInvoices_MN_Companies_UserId` FOREIGN KEY (`UserId`) REFERENCES `MN_Companies` (`Id`) ON DELETE CASCADE
) CHARACTER SET utf8mb4;

CREATE TABLE `FN_CreditCardLimitOperations` (
    `Id` int NOT NULL AUTO_INCREMENT,
    `CardId` int NOT NULL,
    `LimitCreditUsed` decimal(65,30) NOT NULL,
    `PriceOfLastPayment` decimal(65,30) NOT NULL,
    `LastPayment` datetime(6) NOT NULL,
    `UserId` int NOT NULL,
    `CompanyId` int NOT NULL,
    `Deleted` datetime(6) NOT NULL,
    `Registered` datetime(6) NOT NULL,
    CONSTRAINT `PK_FN_CreditCardLimitOperations` PRIMARY KEY (`Id`),
    CONSTRAINT `FK_FN_CreditCardLimitOperations_aspnetUsers_UserId` FOREIGN KEY (`UserId`) REFERENCES `aspnetUsers` (`Id`) ON DELETE CASCADE,
    CONSTRAINT `FK_FN_CreditCardLimitOperations_FN_Cards_CardId` FOREIGN KEY (`CardId`) REFERENCES `FN_Cards` (`Id`) ON DELETE CASCADE,
    CONSTRAINT `FK_FN_CreditCardLimitOperations_MN_Companies_CompanyId` FOREIGN KEY (`CompanyId`) REFERENCES `MN_Companies` (`Id`) ON DELETE CASCADE
) CHARACTER SET utf8mb4;

CREATE TABLE `FN_FinancingsAndLoansExpenses` (
    `Id` int NOT NULL AUTO_INCREMENT,
    `Name` longtext CHARACTER SET utf8mb4 NULL,
    `CategoryExpenseId` int NOT NULL,
    `SubcategoryExpenseId` int NOT NULL,
    `Start` datetime(6) NOT NULL,
    `End` datetime(6) NOT NULL,
    `TotalPriceToBePaid` decimal(65,30) NOT NULL,
    `TotalPriceFinancingOrLoan` decimal(65,30) NOT NULL,
    `TotalPriceInterest` decimal(65,30) NOT NULL,
    `TotalPercentageInterest` decimal(65,30) NOT NULL,
    `InstallmentsQuantity` int NOT NULL,
    `InstallmentPrice` decimal(65,30) NOT NULL,
    `WasPaid` datetime(6) NOT NULL,
    `PaidOff` datetime(6) NOT NULL,
    `Description` longtext CHARACTER SET utf8mb4 NULL,
    `LinkCopyBill` longtext CHARACTER SET utf8mb4 NULL,
    `USERLinkCopyBill` longtext CHARACTER SET utf8mb4 NULL,
    `PASSLinkCopyBill` longtext CHARACTER SET utf8mb4 NULL,
    `UserId` int NOT NULL,
    `CompanyId` int NOT NULL,
    `Deleted` datetime(6) NOT NULL,
    `Registered` datetime(6) NOT NULL,
    CONSTRAINT `PK_FN_FinancingsAndLoansExpenses` PRIMARY KEY (`Id`),
    CONSTRAINT `FK_FN_FinancingsAndLoansExpenses_aspnetUsers_UserId` FOREIGN KEY (`UserId`) REFERENCES `aspnetUsers` (`Id`) ON DELETE CASCADE,
    CONSTRAINT `FK_FN_FinancingsAndLoansExpenses_FN_CategoriesExpenses_Category~` FOREIGN KEY (`CategoryExpenseId`) REFERENCES `FN_CategoriesExpenses` (`Id`) ON DELETE CASCADE,
    CONSTRAINT `FK_FN_FinancingsAndLoansExpenses_FN_SubcategoriesExpenses_Subca~` FOREIGN KEY (`SubcategoryExpenseId`) REFERENCES `FN_SubcategoriesExpenses` (`Id`) ON DELETE CASCADE,
    CONSTRAINT `FK_FN_FinancingsAndLoansExpenses_MN_Companies_CompanyId` FOREIGN KEY (`CompanyId`) REFERENCES `MN_Companies` (`Id`) ON DELETE CASCADE
) CHARACTER SET utf8mb4;

CREATE TABLE `FN_MonthlyFixedExpenses` (
    `Id` int NOT NULL AUTO_INCREMENT,
    `UserId` int NOT NULL,
    `CompanyId` int NOT NULL,
    `Deleted` datetime(6) NOT NULL,
    `Registered` datetime(6) NOT NULL,
    `Name` longtext CHARACTER SET utf8mb4 NULL,
    `CategoryExpenseId` int NOT NULL,
    `SubcategoryExpenseId` int NOT NULL,
    `BankAccountId` int NULL,
    `CardId` int NULL,
    `PixId` int NULL,
    `Price` decimal(65,30) NOT NULL,
    `Interest` decimal(65,30) NOT NULL,
    `Expires` datetime(6) NOT NULL,
    `WasPaid` datetime(6) NOT NULL,
    `OthersPaymentMethods` longtext CHARACTER SET utf8mb4 NULL,
    `Document` longtext CHARACTER SET utf8mb4 NULL,
    `Description` longtext CHARACTER SET utf8mb4 NULL,
    `LinkCopyBill` longtext CHARACTER SET utf8mb4 NULL,
    `USERLinkCopyBill` longtext CHARACTER SET utf8mb4 NULL,
    `PASSLinkCopyBill` longtext CHARACTER SET utf8mb4 NULL,
    CONSTRAINT `PK_FN_MonthlyFixedExpenses` PRIMARY KEY (`Id`),
    CONSTRAINT `FK_FN_MonthlyFixedExpenses_aspnetUsers_UserId` FOREIGN KEY (`UserId`) REFERENCES `aspnetUsers` (`Id`) ON DELETE CASCADE,
    CONSTRAINT `FK_FN_MonthlyFixedExpenses_FN_BankAccount_BankAccountId` FOREIGN KEY (`BankAccountId`) REFERENCES `FN_BankAccount` (`Id`) ON DELETE RESTRICT,
    CONSTRAINT `FK_FN_MonthlyFixedExpenses_FN_Cards_CardId` FOREIGN KEY (`CardId`) REFERENCES `FN_Cards` (`Id`) ON DELETE RESTRICT,
    CONSTRAINT `FK_FN_MonthlyFixedExpenses_FN_CategoriesExpenses_CategoryExpens~` FOREIGN KEY (`CategoryExpenseId`) REFERENCES `FN_CategoriesExpenses` (`Id`) ON DELETE CASCADE,
    CONSTRAINT `FK_FN_MonthlyFixedExpenses_FN_Pixes_PixId` FOREIGN KEY (`PixId`) REFERENCES `FN_Pixes` (`Id`) ON DELETE RESTRICT,
    CONSTRAINT `FK_FN_MonthlyFixedExpenses_FN_SubcategoriesExpenses_Subcategory~` FOREIGN KEY (`SubcategoryExpenseId`) REFERENCES `FN_SubcategoriesExpenses` (`Id`) ON DELETE CASCADE,
    CONSTRAINT `FK_FN_MonthlyFixedExpenses_MN_Companies_CompanyId` FOREIGN KEY (`CompanyId`) REFERENCES `MN_Companies` (`Id`) ON DELETE CASCADE
) CHARACTER SET utf8mb4;

CREATE TABLE `FN_VariablesExpenses` (
    `Id` int NOT NULL AUTO_INCREMENT,
    `Place` longtext CHARACTER SET utf8mb4 NULL,
    `UserId` int NOT NULL,
    `CompanyId` int NOT NULL,
    `Deleted` datetime(6) NOT NULL,
    `Registered` datetime(6) NOT NULL,
    `Name` longtext CHARACTER SET utf8mb4 NULL,
    `CategoryExpenseId` int NOT NULL,
    `SubcategoryExpenseId` int NOT NULL,
    `BankAccountId` int NULL,
    `CardId` int NULL,
    `PixId` int NULL,
    `Price` decimal(65,30) NOT NULL,
    `Interest` decimal(65,30) NOT NULL,
    `Expires` datetime(6) NOT NULL,
    `WasPaid` datetime(6) NOT NULL,
    `OthersPaymentMethods` longtext CHARACTER SET utf8mb4 NULL,
    `Document` longtext CHARACTER SET utf8mb4 NULL,
    `Description` longtext CHARACTER SET utf8mb4 NULL,
    CONSTRAINT `PK_FN_VariablesExpenses` PRIMARY KEY (`Id`),
    CONSTRAINT `FK_FN_VariablesExpenses_aspnetUsers_UserId` FOREIGN KEY (`UserId`) REFERENCES `aspnetUsers` (`Id`) ON DELETE CASCADE,
    CONSTRAINT `FK_FN_VariablesExpenses_FN_BankAccount_BankAccountId` FOREIGN KEY (`BankAccountId`) REFERENCES `FN_BankAccount` (`Id`) ON DELETE RESTRICT,
    CONSTRAINT `FK_FN_VariablesExpenses_FN_Cards_CardId` FOREIGN KEY (`CardId`) REFERENCES `FN_Cards` (`Id`) ON DELETE RESTRICT,
    CONSTRAINT `FK_FN_VariablesExpenses_FN_CategoriesExpenses_CategoryExpenseId` FOREIGN KEY (`CategoryExpenseId`) REFERENCES `FN_CategoriesExpenses` (`Id`) ON DELETE CASCADE,
    CONSTRAINT `FK_FN_VariablesExpenses_FN_Pixes_PixId` FOREIGN KEY (`PixId`) REFERENCES `FN_Pixes` (`Id`) ON DELETE RESTRICT,
    CONSTRAINT `FK_FN_VariablesExpenses_FN_SubcategoriesExpenses_SubcategoryExp~` FOREIGN KEY (`SubcategoryExpenseId`) REFERENCES `FN_SubcategoriesExpenses` (`Id`) ON DELETE CASCADE,
    CONSTRAINT `FK_FN_VariablesExpenses_MN_Companies_CompanyId` FOREIGN KEY (`CompanyId`) REFERENCES `MN_Companies` (`Id`) ON DELETE CASCADE
) CHARACTER SET utf8mb4;

CREATE TABLE `FN_YearlyFixedExpenses` (
    `Id` int NOT NULL AUTO_INCREMENT,
    `Start` datetime(6) NOT NULL,
    `AutoRenew` tinyint(1) NOT NULL,
    `UserId` int NOT NULL,
    `CompanyId` int NOT NULL,
    `Deleted` datetime(6) NOT NULL,
    `Registered` datetime(6) NOT NULL,
    `Name` longtext CHARACTER SET utf8mb4 NULL,
    `CategoryExpenseId` int NOT NULL,
    `SubcategoryExpenseId` int NOT NULL,
    `BankAccountId` int NULL,
    `CardId` int NULL,
    `PixId` int NULL,
    `Price` decimal(65,30) NOT NULL,
    `Interest` decimal(65,30) NOT NULL,
    `Expires` datetime(6) NOT NULL,
    `WasPaid` datetime(6) NOT NULL,
    `OthersPaymentMethods` longtext CHARACTER SET utf8mb4 NULL,
    `Document` longtext CHARACTER SET utf8mb4 NULL,
    `Description` longtext CHARACTER SET utf8mb4 NULL,
    `LinkCopyBill` longtext CHARACTER SET utf8mb4 NULL,
    `USERLinkCopyBill` longtext CHARACTER SET utf8mb4 NULL,
    `PASSLinkCopyBill` longtext CHARACTER SET utf8mb4 NULL,
    CONSTRAINT `PK_FN_YearlyFixedExpenses` PRIMARY KEY (`Id`),
    CONSTRAINT `FK_FN_YearlyFixedExpenses_aspnetUsers_UserId` FOREIGN KEY (`UserId`) REFERENCES `aspnetUsers` (`Id`) ON DELETE CASCADE,
    CONSTRAINT `FK_FN_YearlyFixedExpenses_FN_BankAccount_BankAccountId` FOREIGN KEY (`BankAccountId`) REFERENCES `FN_BankAccount` (`Id`) ON DELETE RESTRICT,
    CONSTRAINT `FK_FN_YearlyFixedExpenses_FN_Cards_CardId` FOREIGN KEY (`CardId`) REFERENCES `FN_Cards` (`Id`) ON DELETE RESTRICT,
    CONSTRAINT `FK_FN_YearlyFixedExpenses_FN_CategoriesExpenses_CategoryExpense~` FOREIGN KEY (`CategoryExpenseId`) REFERENCES `FN_CategoriesExpenses` (`Id`) ON DELETE CASCADE,
    CONSTRAINT `FK_FN_YearlyFixedExpenses_FN_Pixes_PixId` FOREIGN KEY (`PixId`) REFERENCES `FN_Pixes` (`Id`) ON DELETE RESTRICT,
    CONSTRAINT `FK_FN_YearlyFixedExpenses_FN_SubcategoriesExpenses_SubcategoryE~` FOREIGN KEY (`SubcategoryExpenseId`) REFERENCES `FN_SubcategoriesExpenses` (`Id`) ON DELETE CASCADE,
    CONSTRAINT `FK_FN_YearlyFixedExpenses_MN_Companies_CompanyId` FOREIGN KEY (`CompanyId`) REFERENCES `MN_Companies` (`Id`) ON DELETE CASCADE
) CHARACTER SET utf8mb4;

CREATE TABLE `PD_Manufacturers` (
    `Id` int NOT NULL AUTO_INCREMENT,
    `Name` varchar(100) CHARACTER SET utf8mb4 NOT NULL,
    `SegmentId` int NOT NULL,
    `CompanyId` int NOT NULL,
    `Deleted` datetime(6) NOT NULL,
    `Registered` datetime(6) NOT NULL,
    CONSTRAINT `PK_PD_Manufacturers` PRIMARY KEY (`Id`),
    CONSTRAINT `FK_PD_Manufacturers_MN_Companies_CompanyId` FOREIGN KEY (`CompanyId`) REFERENCES `MN_Companies` (`Id`) ON DELETE CASCADE,
    CONSTRAINT `FK_PD_Manufacturers_PD_Segments_SegmentId` FOREIGN KEY (`SegmentId`) REFERENCES `PD_Segments` (`Id`) ON DELETE CASCADE
) CHARACTER SET utf8mb4;

CREATE TABLE `OS_CollectsDelivers` (
    `Id` int NOT NULL AUTO_INCREMENT,
    `TransporterId` int NULL,
    `ContactName` longtext CHARACTER SET utf8mb4 NULL,
    `Start` datetime(6) NOT NULL,
    `Price` decimal(65,30) NOT NULL,
    `WasPaid` datetime(6) NOT NULL,
    `Collect` datetime(6) NOT NULL,
    `Deliver` datetime(6) NOT NULL,
    `Other` datetime(6) NOT NULL,
    `KindTransport` longtext CHARACTER SET utf8mb4 NULL,
    `BillingFromId` int NULL,
    `TaskOverView` longtext CHARACTER SET utf8mb4 NULL,
    `DestinyId` int NULL,
    `UserId` int NOT NULL,
    `CompanyId` int NOT NULL,
    `Deleted` datetime(6) NOT NULL,
    `Registered` datetime(6) NOT NULL,
    CONSTRAINT `PK_OS_CollectsDelivers` PRIMARY KEY (`Id`),
    CONSTRAINT `FK_OS_CollectsDelivers_aspnetUsers_UserId` FOREIGN KEY (`UserId`) REFERENCES `aspnetUsers` (`Id`) ON DELETE CASCADE,
    CONSTRAINT `FK_OS_CollectsDelivers_MN_Companies_CompanyId` FOREIGN KEY (`CompanyId`) REFERENCES `MN_Companies` (`Id`) ON DELETE CASCADE,
    CONSTRAINT `FK_OS_CollectsDelivers_MN_Partners_TransporterId` FOREIGN KEY (`TransporterId`) REFERENCES `MN_Partners` (`Id`) ON DELETE RESTRICT,
    CONSTRAINT `FK_OS_CollectsDelivers_OS_BillingsFroms_BillingFromId` FOREIGN KEY (`BillingFromId`) REFERENCES `OS_BillingsFroms` (`Id`) ON DELETE RESTRICT,
    CONSTRAINT `FK_OS_CollectsDelivers_OS_Destinies_DestinyId` FOREIGN KEY (`DestinyId`) REFERENCES `OS_Destinies` (`Id`) ON DELETE RESTRICT
) CHARACTER SET utf8mb4;

CREATE TABLE `FN_FinancingsAndLoansExpensesInstallments` (
    `Id` int NOT NULL AUTO_INCREMENT,
    `BankAccountId` int NULL,
    `CardId` int NULL,
    `PixId` int NULL,
    `Interest` decimal(65,30) NOT NULL,
    `Expires` datetime(6) NOT NULL,
    `WasPaid` datetime(6) NOT NULL,
    `OthersPaymentMethods` longtext CHARACTER SET utf8mb4 NULL,
    `Document` longtext CHARACTER SET utf8mb4 NULL,
    `PriceWasPaidInstallment` decimal(65,30) NOT NULL,
    `CurrentInstallment` longtext CHARACTER SET utf8mb4 NULL,
    `FinancingAndLoanExpenseId` int NOT NULL,
    `UserId` int NOT NULL,
    `CompanyId` int NOT NULL,
    `Deleted` datetime(6) NOT NULL,
    `Registered` datetime(6) NOT NULL,
    CONSTRAINT `PK_FN_FinancingsAndLoansExpensesInstallments` PRIMARY KEY (`Id`),
    CONSTRAINT `FK_FN_FinancingsAndLoansExpensesInstallments_aspnetUsers_UserId` FOREIGN KEY (`UserId`) REFERENCES `aspnetUsers` (`Id`) ON DELETE CASCADE,
    CONSTRAINT `FK_FN_FinancingsAndLoansExpensesInstallments_FN_BankAccount_Ban~` FOREIGN KEY (`BankAccountId`) REFERENCES `FN_BankAccount` (`Id`) ON DELETE RESTRICT,
    CONSTRAINT `FK_FN_FinancingsAndLoansExpensesInstallments_FN_Cards_CardId` FOREIGN KEY (`CardId`) REFERENCES `FN_Cards` (`Id`) ON DELETE RESTRICT,
    CONSTRAINT `FK_FN_FinancingsAndLoansExpensesInstallments_FN_FinancingsAndLo~` FOREIGN KEY (`FinancingAndLoanExpenseId`) REFERENCES `FN_FinancingsAndLoansExpenses` (`Id`) ON DELETE RESTRICT,
    CONSTRAINT `FK_FN_FinancingsAndLoansExpensesInstallments_FN_Pixes_PixId` FOREIGN KEY (`PixId`) REFERENCES `FN_Pixes` (`Id`) ON DELETE RESTRICT,
    CONSTRAINT `FK_FN_FinancingsAndLoansExpensesInstallments_MN_Companies_Compa~` FOREIGN KEY (`CompanyId`) REFERENCES `MN_Companies` (`Id`) ON DELETE CASCADE
) CHARACTER SET utf8mb4;

CREATE TABLE `FN_CreditCardExpenses` (
    `Id` int NOT NULL AUTO_INCREMENT,
    `Name` longtext CHARACTER SET utf8mb4 NULL,
    `CategoryExpenseId` int NOT NULL,
    `SubcategoryExpenseId` int NOT NULL,
    `CardId` int NOT NULL,
    `Price` decimal(65,30) NOT NULL,
    `Expires` datetime(6) NOT NULL,
    `WasPaid` datetime(6) NOT NULL,
    `OthersPaymentMethods` longtext CHARACTER SET utf8mb4 NULL,
    `Document` longtext CHARACTER SET utf8mb4 NULL,
    `Description` longtext CHARACTER SET utf8mb4 NULL,
    `InstallmentsQuantity` int NOT NULL,
    `InstallmentPrice` decimal(65,30) NOT NULL,
    `TotalPriceInterest` decimal(65,30) NOT NULL,
    `TotalPercentageInterest` decimal(65,30) NOT NULL,
    `PaymentAtSight` decimal(65,30) NOT NULL,
    `CurrentInstallment` longtext CHARACTER SET utf8mb4 NULL,
    `ExpenseDay` datetime(6) NOT NULL,
    `CreditCardExpenseInvoiceId` int NOT NULL,
    `MonthlyFixedExpenseId` int NULL,
    `YearlyFixedExpenseId` int NULL,
    `VariableExpenseId` int NULL,
    `FinancingAndLoanExpenseId` int NULL,
    `UserId` int NOT NULL,
    `CompanyId` int NOT NULL,
    `Deleted` datetime(6) NOT NULL,
    `Registered` datetime(6) NOT NULL,
    CONSTRAINT `PK_FN_CreditCardExpenses` PRIMARY KEY (`Id`),
    CONSTRAINT `FK_FN_CreditCardExpenses_aspnetUsers_UserId` FOREIGN KEY (`UserId`) REFERENCES `aspnetUsers` (`Id`) ON DELETE CASCADE,
    CONSTRAINT `FK_FN_CreditCardExpenses_FN_Cards_CardId` FOREIGN KEY (`CardId`) REFERENCES `FN_Cards` (`Id`) ON DELETE CASCADE,
    CONSTRAINT `FK_FN_CreditCardExpenses_FN_CategoriesExpenses_CategoryExpenseId` FOREIGN KEY (`CategoryExpenseId`) REFERENCES `FN_CategoriesExpenses` (`Id`) ON DELETE CASCADE,
    CONSTRAINT `FK_FN_CreditCardExpenses_FN_CreditCardExpensesInvoices_CreditCa~` FOREIGN KEY (`CreditCardExpenseInvoiceId`) REFERENCES `FN_CreditCardExpensesInvoices` (`Id`) ON DELETE CASCADE,
    CONSTRAINT `FK_FN_CreditCardExpenses_FN_FinancingsAndLoansExpenses_Financin~` FOREIGN KEY (`FinancingAndLoanExpenseId`) REFERENCES `FN_FinancingsAndLoansExpenses` (`Id`) ON DELETE RESTRICT,
    CONSTRAINT `FK_FN_CreditCardExpenses_FN_MonthlyFixedExpenses_MonthlyFixedEx~` FOREIGN KEY (`MonthlyFixedExpenseId`) REFERENCES `FN_MonthlyFixedExpenses` (`Id`) ON DELETE RESTRICT,
    CONSTRAINT `FK_FN_CreditCardExpenses_FN_SubcategoriesExpenses_SubcategoryEx~` FOREIGN KEY (`SubcategoryExpenseId`) REFERENCES `FN_SubcategoriesExpenses` (`Id`) ON DELETE CASCADE,
    CONSTRAINT `FK_FN_CreditCardExpenses_FN_VariablesExpenses_VariableExpenseId` FOREIGN KEY (`VariableExpenseId`) REFERENCES `FN_VariablesExpenses` (`Id`) ON DELETE RESTRICT,
    CONSTRAINT `FK_FN_CreditCardExpenses_FN_YearlyFixedExpenses_YearlyFixedExpe~` FOREIGN KEY (`YearlyFixedExpenseId`) REFERENCES `FN_YearlyFixedExpenses` (`Id`) ON DELETE RESTRICT,
    CONSTRAINT `FK_FN_CreditCardExpenses_MN_Companies_UserId` FOREIGN KEY (`UserId`) REFERENCES `MN_Companies` (`Id`) ON DELETE CASCADE
) CHARACTER SET utf8mb4;

CREATE TABLE `FN_PixExpenses` (
    `Id` int NOT NULL AUTO_INCREMENT,
    `PixOutId` int NOT NULL,
    `BenefitedName` longtext CHARACTER SET utf8mb4 NULL,
    `BenefitedKey` longtext CHARACTER SET utf8mb4 NULL,
    `Price` decimal(65,30) NOT NULL,
    `Interest` decimal(65,30) NOT NULL,
    `ExpenseDay` datetime(6) NOT NULL,
    `MonthlyFixedExpenseId` int NULL,
    `YearlyFixedExpenseId` int NULL,
    `VariableExpenseId` int NULL,
    `FinancingAndLoanExpenseId` int NULL,
    `Description` longtext CHARACTER SET utf8mb4 NULL,
    `UserId` int NOT NULL,
    `CompanyId` int NOT NULL,
    `Deleted` datetime(6) NOT NULL,
    `Registered` datetime(6) NOT NULL,
    CONSTRAINT `PK_FN_PixExpenses` PRIMARY KEY (`Id`),
    CONSTRAINT `FK_FN_PixExpenses_aspnetUsers_UserId` FOREIGN KEY (`UserId`) REFERENCES `aspnetUsers` (`Id`) ON DELETE CASCADE,
    CONSTRAINT `FK_FN_PixExpenses_FN_FinancingsAndLoansExpenses_FinancingAndLoa~` FOREIGN KEY (`FinancingAndLoanExpenseId`) REFERENCES `FN_FinancingsAndLoansExpenses` (`Id`) ON DELETE RESTRICT,
    CONSTRAINT `FK_FN_PixExpenses_FN_MonthlyFixedExpenses_MonthlyFixedExpenseId` FOREIGN KEY (`MonthlyFixedExpenseId`) REFERENCES `FN_MonthlyFixedExpenses` (`Id`) ON DELETE RESTRICT,
    CONSTRAINT `FK_FN_PixExpenses_FN_Pixes_PixOutId` FOREIGN KEY (`PixOutId`) REFERENCES `FN_Pixes` (`Id`) ON DELETE CASCADE,
    CONSTRAINT `FK_FN_PixExpenses_FN_VariablesExpenses_VariableExpenseId` FOREIGN KEY (`VariableExpenseId`) REFERENCES `FN_VariablesExpenses` (`Id`) ON DELETE RESTRICT,
    CONSTRAINT `FK_FN_PixExpenses_FN_YearlyFixedExpenses_YearlyFixedExpenseId` FOREIGN KEY (`YearlyFixedExpenseId`) REFERENCES `FN_YearlyFixedExpenses` (`Id`) ON DELETE RESTRICT,
    CONSTRAINT `FK_FN_PixExpenses_MN_Companies_CompanyId` FOREIGN KEY (`CompanyId`) REFERENCES `MN_Companies` (`Id`) ON DELETE CASCADE
) CHARACTER SET utf8mb4;

CREATE TABLE `PD_Models` (
    `Id` int NOT NULL AUTO_INCREMENT,
    `Name` varchar(255) CHARACTER SET utf8mb4 NOT NULL,
    `ManufacturerId` int NOT NULL,
    `CompanyId` int NOT NULL,
    `Deleted` datetime(6) NOT NULL,
    `Registered` datetime(6) NOT NULL,
    CONSTRAINT `PK_PD_Models` PRIMARY KEY (`Id`),
    CONSTRAINT `FK_PD_Models_MN_Companies_CompanyId` FOREIGN KEY (`CompanyId`) REFERENCES `MN_Companies` (`Id`) ON DELETE CASCADE,
    CONSTRAINT `FK_PD_Models_PD_Manufacturers_ManufacturerId` FOREIGN KEY (`ManufacturerId`) REFERENCES `PD_Manufacturers` (`Id`) ON DELETE CASCADE
) CHARACTER SET utf8mb4;

CREATE TABLE `PD_Specificities` (
    `Id` int NOT NULL AUTO_INCREMENT,
    `Capacity` longtext CHARACTER SET utf8mb4 NULL,
    `Speed` longtext CHARACTER SET utf8mb4 NULL,
    `Generation` longtext CHARACTER SET utf8mb4 NULL,
    `Version` longtext CHARACTER SET utf8mb4 NULL,
    `Description` longtext CHARACTER SET utf8mb4 NULL,
    `ModelId` int NOT NULL,
    `CompanyId` int NOT NULL,
    `Deleted` datetime(6) NOT NULL,
    `Registered` datetime(6) NOT NULL,
    CONSTRAINT `PK_PD_Specificities` PRIMARY KEY (`Id`),
    CONSTRAINT `FK_PD_Specificities_MN_Companies_CompanyId` FOREIGN KEY (`CompanyId`) REFERENCES `MN_Companies` (`Id`) ON DELETE CASCADE,
    CONSTRAINT `FK_PD_Specificities_PD_Models_ModelId` FOREIGN KEY (`ModelId`) REFERENCES `PD_Models` (`Id`) ON DELETE CASCADE
) CHARACTER SET utf8mb4;

CREATE TABLE `PD_Products` (
    `Id` int NOT NULL AUTO_INCREMENT,
    `ProductTypeId` int NOT NULL,
    `SegmentId` int NOT NULL,
    `ManufacturerId` int NOT NULL,
    `ModelId` int NOT NULL,
    `SpecificitiesId` int NOT NULL,
    `IsReservedByUserId` int NULL,
    `IsReserved` datetime(6) NOT NULL,
    `ReservedForCustomerId` int NULL,
    `SupplierId` int NULL,
    `UsedHistoricalOrSupplier` longtext CHARACTER SET utf8mb4 NULL,
    `PurchaseInvoiceNumber` longtext CHARACTER SET utf8mb4 NULL,
    `CostPrice` decimal(65,30) NOT NULL,
    `SoldPrice` decimal(65,30) NOT NULL,
    `EntryDate` datetime(6) NOT NULL,
    `SoldDate` datetime(6) NOT NULL,
    `WarrantyEnd` datetime(6) NOT NULL,
    `WarrantyEndLocal` datetime(6) NOT NULL,
    `IsUsed` tinyint(1) NOT NULL,
    `IsTested` datetime(6) NOT NULL,
    `Description` longtext CHARACTER SET utf8mb4 NULL,
    `UserId` int NOT NULL,
    `CompanyId` int NOT NULL,
    `Deleted` datetime(6) NOT NULL,
    `Registered` datetime(6) NOT NULL,
    CONSTRAINT `PK_PD_Products` PRIMARY KEY (`Id`),
    CONSTRAINT `FK_PD_Products_aspnetUsers_IsReservedByUserId` FOREIGN KEY (`IsReservedByUserId`) REFERENCES `aspnetUsers` (`Id`) ON DELETE RESTRICT,
    CONSTRAINT `FK_PD_Products_aspnetUsers_UserId` FOREIGN KEY (`UserId`) REFERENCES `aspnetUsers` (`Id`) ON DELETE CASCADE,
    CONSTRAINT `FK_PD_Products_MN_Companies_CompanyId` FOREIGN KEY (`CompanyId`) REFERENCES `MN_Companies` (`Id`) ON DELETE CASCADE,
    CONSTRAINT `FK_PD_Products_MN_Customers_ReservedForCustomerId` FOREIGN KEY (`ReservedForCustomerId`) REFERENCES `MN_Customers` (`Id`) ON DELETE RESTRICT,
    CONSTRAINT `FK_PD_Products_MN_Partners_SupplierId` FOREIGN KEY (`SupplierId`) REFERENCES `MN_Partners` (`Id`) ON DELETE RESTRICT,
    CONSTRAINT `FK_PD_Products_PD_Manufacturers_ManufacturerId` FOREIGN KEY (`ManufacturerId`) REFERENCES `PD_Manufacturers` (`Id`) ON DELETE CASCADE,
    CONSTRAINT `FK_PD_Products_PD_Models_ModelId` FOREIGN KEY (`ModelId`) REFERENCES `PD_Models` (`Id`) ON DELETE CASCADE,
    CONSTRAINT `FK_PD_Products_PD_ProductTypes_ProductTypeId` FOREIGN KEY (`ProductTypeId`) REFERENCES `PD_ProductTypes` (`Id`) ON DELETE CASCADE,
    CONSTRAINT `FK_PD_Products_PD_Segments_SegmentId` FOREIGN KEY (`SegmentId`) REFERENCES `PD_Segments` (`Id`) ON DELETE CASCADE,
    CONSTRAINT `FK_PD_Products_PD_Specificities_SpecificitiesId` FOREIGN KEY (`SpecificitiesId`) REFERENCES `PD_Specificities` (`Id`) ON DELETE CASCADE
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

CREATE INDEX `IX_FN_BankAccount_UserId` ON `FN_BankAccount` (`UserId`);

CREATE INDEX `IX_FN_Cards_BankAccountId` ON `FN_Cards` (`BankAccountId`);

CREATE INDEX `IX_FN_Cards_CompanyId` ON `FN_Cards` (`CompanyId`);

CREATE INDEX `IX_FN_Cards_UserId` ON `FN_Cards` (`UserId`);

CREATE INDEX `IX_FN_CategoriesExpenses_CompanyId` ON `FN_CategoriesExpenses` (`CompanyId`);

CREATE INDEX `IX_FN_CategoriesExpenses_UserId` ON `FN_CategoriesExpenses` (`UserId`);

CREATE INDEX `IX_FN_CreditCardExpenses_CardId` ON `FN_CreditCardExpenses` (`CardId`);

CREATE INDEX `IX_FN_CreditCardExpenses_CategoryExpenseId` ON `FN_CreditCardExpenses` (`CategoryExpenseId`);

CREATE INDEX `IX_FN_CreditCardExpenses_CreditCardExpenseInvoiceId` ON `FN_CreditCardExpenses` (`CreditCardExpenseInvoiceId`);

CREATE INDEX `IX_FN_CreditCardExpenses_FinancingAndLoanExpenseId` ON `FN_CreditCardExpenses` (`FinancingAndLoanExpenseId`);

CREATE INDEX `IX_FN_CreditCardExpenses_MonthlyFixedExpenseId` ON `FN_CreditCardExpenses` (`MonthlyFixedExpenseId`);

CREATE INDEX `IX_FN_CreditCardExpenses_SubcategoryExpenseId` ON `FN_CreditCardExpenses` (`SubcategoryExpenseId`);

CREATE INDEX `IX_FN_CreditCardExpenses_UserId` ON `FN_CreditCardExpenses` (`UserId`);

CREATE INDEX `IX_FN_CreditCardExpenses_VariableExpenseId` ON `FN_CreditCardExpenses` (`VariableExpenseId`);

CREATE INDEX `IX_FN_CreditCardExpenses_YearlyFixedExpenseId` ON `FN_CreditCardExpenses` (`YearlyFixedExpenseId`);

CREATE INDEX `IX_FN_CreditCardExpensesInvoices_CardId` ON `FN_CreditCardExpensesInvoices` (`CardId`);

CREATE INDEX `IX_FN_CreditCardExpensesInvoices_PaidFromBankAccountId` ON `FN_CreditCardExpensesInvoices` (`PaidFromBankAccountId`);

CREATE INDEX `IX_FN_CreditCardExpensesInvoices_UserId` ON `FN_CreditCardExpensesInvoices` (`UserId`);

CREATE UNIQUE INDEX `IX_FN_CreditCardLimitOperations_CardId` ON `FN_CreditCardLimitOperations` (`CardId`);

CREATE INDEX `IX_FN_CreditCardLimitOperations_CompanyId` ON `FN_CreditCardLimitOperations` (`CompanyId`);

CREATE INDEX `IX_FN_CreditCardLimitOperations_UserId` ON `FN_CreditCardLimitOperations` (`UserId`);

CREATE INDEX `IX_FN_FinancingsAndLoansExpenses_CategoryExpenseId` ON `FN_FinancingsAndLoansExpenses` (`CategoryExpenseId`);

CREATE INDEX `IX_FN_FinancingsAndLoansExpenses_CompanyId` ON `FN_FinancingsAndLoansExpenses` (`CompanyId`);

CREATE INDEX `IX_FN_FinancingsAndLoansExpenses_SubcategoryExpenseId` ON `FN_FinancingsAndLoansExpenses` (`SubcategoryExpenseId`);

CREATE INDEX `IX_FN_FinancingsAndLoansExpenses_UserId` ON `FN_FinancingsAndLoansExpenses` (`UserId`);

CREATE INDEX `IX_FN_FinancingsAndLoansExpensesInstallments_BankAccountId` ON `FN_FinancingsAndLoansExpensesInstallments` (`BankAccountId`);

CREATE INDEX `IX_FN_FinancingsAndLoansExpensesInstallments_CardId` ON `FN_FinancingsAndLoansExpensesInstallments` (`CardId`);

CREATE INDEX `IX_FN_FinancingsAndLoansExpensesInstallments_CompanyId` ON `FN_FinancingsAndLoansExpensesInstallments` (`CompanyId`);

CREATE INDEX `IX_FN_FinancingsAndLoansExpensesInstallments_FinancingAndLoanEx~` ON `FN_FinancingsAndLoansExpensesInstallments` (`FinancingAndLoanExpenseId`);

CREATE INDEX `IX_FN_FinancingsAndLoansExpensesInstallments_PixId` ON `FN_FinancingsAndLoansExpensesInstallments` (`PixId`);

CREATE INDEX `IX_FN_FinancingsAndLoansExpensesInstallments_UserId` ON `FN_FinancingsAndLoansExpensesInstallments` (`UserId`);

CREATE INDEX `IX_FN_MonthlyFixedExpenses_BankAccountId` ON `FN_MonthlyFixedExpenses` (`BankAccountId`);

CREATE INDEX `IX_FN_MonthlyFixedExpenses_CardId` ON `FN_MonthlyFixedExpenses` (`CardId`);

CREATE INDEX `IX_FN_MonthlyFixedExpenses_CategoryExpenseId` ON `FN_MonthlyFixedExpenses` (`CategoryExpenseId`);

CREATE INDEX `IX_FN_MonthlyFixedExpenses_CompanyId` ON `FN_MonthlyFixedExpenses` (`CompanyId`);

CREATE INDEX `IX_FN_MonthlyFixedExpenses_PixId` ON `FN_MonthlyFixedExpenses` (`PixId`);

CREATE INDEX `IX_FN_MonthlyFixedExpenses_SubcategoryExpenseId` ON `FN_MonthlyFixedExpenses` (`SubcategoryExpenseId`);

CREATE INDEX `IX_FN_MonthlyFixedExpenses_UserId` ON `FN_MonthlyFixedExpenses` (`UserId`);

CREATE INDEX `IX_FN_Pixes_BankAccountId` ON `FN_Pixes` (`BankAccountId`);

CREATE INDEX `IX_FN_PixExpenses_CompanyId` ON `FN_PixExpenses` (`CompanyId`);

CREATE INDEX `IX_FN_PixExpenses_FinancingAndLoanExpenseId` ON `FN_PixExpenses` (`FinancingAndLoanExpenseId`);

CREATE INDEX `IX_FN_PixExpenses_MonthlyFixedExpenseId` ON `FN_PixExpenses` (`MonthlyFixedExpenseId`);

CREATE INDEX `IX_FN_PixExpenses_PixOutId` ON `FN_PixExpenses` (`PixOutId`);

CREATE INDEX `IX_FN_PixExpenses_UserId` ON `FN_PixExpenses` (`UserId`);

CREATE INDEX `IX_FN_PixExpenses_VariableExpenseId` ON `FN_PixExpenses` (`VariableExpenseId`);

CREATE INDEX `IX_FN_PixExpenses_YearlyFixedExpenseId` ON `FN_PixExpenses` (`YearlyFixedExpenseId`);

CREATE INDEX `IX_FN_SubcategoriesExpenses_CategoryExpenseId` ON `FN_SubcategoriesExpenses` (`CategoryExpenseId`);

CREATE INDEX `IX_FN_VariablesExpenses_BankAccountId` ON `FN_VariablesExpenses` (`BankAccountId`);

CREATE INDEX `IX_FN_VariablesExpenses_CardId` ON `FN_VariablesExpenses` (`CardId`);

CREATE INDEX `IX_FN_VariablesExpenses_CategoryExpenseId` ON `FN_VariablesExpenses` (`CategoryExpenseId`);

CREATE INDEX `IX_FN_VariablesExpenses_CompanyId` ON `FN_VariablesExpenses` (`CompanyId`);

CREATE INDEX `IX_FN_VariablesExpenses_PixId` ON `FN_VariablesExpenses` (`PixId`);

CREATE INDEX `IX_FN_VariablesExpenses_SubcategoryExpenseId` ON `FN_VariablesExpenses` (`SubcategoryExpenseId`);

CREATE INDEX `IX_FN_VariablesExpenses_UserId` ON `FN_VariablesExpenses` (`UserId`);

CREATE INDEX `IX_FN_YearlyFixedExpenses_BankAccountId` ON `FN_YearlyFixedExpenses` (`BankAccountId`);

CREATE INDEX `IX_FN_YearlyFixedExpenses_CardId` ON `FN_YearlyFixedExpenses` (`CardId`);

CREATE INDEX `IX_FN_YearlyFixedExpenses_CategoryExpenseId` ON `FN_YearlyFixedExpenses` (`CategoryExpenseId`);

CREATE INDEX `IX_FN_YearlyFixedExpenses_CompanyId` ON `FN_YearlyFixedExpenses` (`CompanyId`);

CREATE INDEX `IX_FN_YearlyFixedExpenses_PixId` ON `FN_YearlyFixedExpenses` (`PixId`);

CREATE INDEX `IX_FN_YearlyFixedExpenses_SubcategoryExpenseId` ON `FN_YearlyFixedExpenses` (`SubcategoryExpenseId`);

CREATE INDEX `IX_FN_YearlyFixedExpenses_UserId` ON `FN_YearlyFixedExpenses` (`UserId`);

CREATE INDEX `IX_MN_AdditionalCosts_CompanyId` ON `MN_AdditionalCosts` (`CompanyId`);

CREATE INDEX `IX_MN_Companies_AddressId` ON `MN_Companies` (`AddressId`);

CREATE INDEX `IX_MN_Companies_ContactId` ON `MN_Companies` (`ContactId`);

CREATE INDEX `IX_MN_Customers_AdditionalCostsId` ON `MN_Customers` (`AdditionalCostsId`);

CREATE INDEX `IX_MN_Customers_AddressId` ON `MN_Customers` (`AddressId`);

CREATE INDEX `IX_MN_Customers_CompanyId` ON `MN_Customers` (`CompanyId`);

CREATE INDEX `IX_MN_Customers_ContactId` ON `MN_Customers` (`ContactId`);

CREATE INDEX `IX_MN_Customers_PhysicallyMovingCostsId` ON `MN_Customers` (`PhysicallyMovingCostsId`);

CREATE INDEX `IX_MN_Customers_UserId` ON `MN_Customers` (`UserId`);

CREATE INDEX `IX_MN_PartnerPaymentBankAccounts_CompanyId` ON `MN_PartnerPaymentBankAccounts` (`CompanyId`);

CREATE INDEX `IX_MN_PartnerPaymentBankAccounts_PaymentDataId` ON `MN_PartnerPaymentBankAccounts` (`PaymentDataId`);

CREATE INDEX `IX_MN_PartnerPaymentPixes_CompanyId` ON `MN_PartnerPaymentPixes` (`CompanyId`);

CREATE INDEX `IX_MN_PartnerPaymentPixes_PaymentDataId` ON `MN_PartnerPaymentPixes` (`PaymentDataId`);

CREATE INDEX `IX_MN_Partners_AddressId` ON `MN_Partners` (`AddressId`);

CREATE INDEX `IX_MN_Partners_CompanyId` ON `MN_Partners` (`CompanyId`);

CREATE INDEX `IX_MN_Partners_ContactId` ON `MN_Partners` (`ContactId`);

CREATE INDEX `IX_MN_Partners_PaymentsDataId` ON `MN_Partners` (`PaymentsDataId`);

CREATE INDEX `IX_MN_Partners_PhysicallyMovingCostsId` ON `MN_Partners` (`PhysicallyMovingCostsId`);

CREATE INDEX `IX_MN_Partners_UserId` ON `MN_Partners` (`UserId`);

CREATE INDEX `IX_MN_PaymentsData_CompanyId` ON `MN_PaymentsData` (`CompanyId`);

CREATE INDEX `IX_MN_PhysicallyMovingCosts_CompanyId` ON `MN_PhysicallyMovingCosts` (`CompanyId`);

CREATE INDEX `IX_OS_BillingsFroms_CompanyId` ON `OS_BillingsFroms` (`CompanyId`);

CREATE INDEX `IX_OS_BillingsFroms_CustomerId` ON `OS_BillingsFroms` (`CustomerId`);

CREATE INDEX `IX_OS_BillingsFroms_PartnerId` ON `OS_BillingsFroms` (`PartnerId`);

CREATE INDEX `IX_OS_CollectsDelivers_BillingFromId` ON `OS_CollectsDelivers` (`BillingFromId`);

CREATE INDEX `IX_OS_CollectsDelivers_CompanyId` ON `OS_CollectsDelivers` (`CompanyId`);

CREATE INDEX `IX_OS_CollectsDelivers_DestinyId` ON `OS_CollectsDelivers` (`DestinyId`);

CREATE INDEX `IX_OS_CollectsDelivers_TransporterId` ON `OS_CollectsDelivers` (`TransporterId`);

CREATE INDEX `IX_OS_CollectsDelivers_UserId` ON `OS_CollectsDelivers` (`UserId`);

CREATE INDEX `IX_OS_Destinies_CompanyId` ON `OS_Destinies` (`CompanyId`);

CREATE INDEX `IX_OS_Destinies_CustomerId` ON `OS_Destinies` (`CustomerId`);

CREATE INDEX `IX_OS_Destinies_PartnerId` ON `OS_Destinies` (`PartnerId`);

CREATE INDEX `IX_OS_ElectronicsRepairs_CompanyId` ON `OS_ElectronicsRepairs` (`CompanyId`);

CREATE INDEX `IX_OS_ElectronicsRepairs_CustomerId` ON `OS_ElectronicsRepairs` (`CustomerId`);

CREATE INDEX `IX_OS_ElectronicsRepairs_ServiceProviderId` ON `OS_ElectronicsRepairs` (`ServiceProviderId`);

CREATE INDEX `IX_OS_ElectronicsRepairs_UserId` ON `OS_ElectronicsRepairs` (`UserId`);

CREATE INDEX `IX_PD_Manufacturers_CompanyId` ON `PD_Manufacturers` (`CompanyId`);

CREATE INDEX `IX_PD_Manufacturers_SegmentId` ON `PD_Manufacturers` (`SegmentId`);

CREATE INDEX `IX_PD_Models_CompanyId` ON `PD_Models` (`CompanyId`);

CREATE INDEX `IX_PD_Models_ManufacturerId` ON `PD_Models` (`ManufacturerId`);

CREATE UNIQUE INDEX `IX_PD_Models_Name` ON `PD_Models` (`Name`);

CREATE INDEX `IX_PD_Products_CompanyId` ON `PD_Products` (`CompanyId`);

CREATE INDEX `IX_PD_Products_IsReservedByUserId` ON `PD_Products` (`IsReservedByUserId`);

CREATE INDEX `IX_PD_Products_ManufacturerId` ON `PD_Products` (`ManufacturerId`);

CREATE INDEX `IX_PD_Products_ModelId` ON `PD_Products` (`ModelId`);

CREATE INDEX `IX_PD_Products_ProductTypeId` ON `PD_Products` (`ProductTypeId`);

CREATE INDEX `IX_PD_Products_ReservedForCustomerId` ON `PD_Products` (`ReservedForCustomerId`);

CREATE INDEX `IX_PD_Products_SegmentId` ON `PD_Products` (`SegmentId`);

CREATE INDEX `IX_PD_Products_SpecificitiesId` ON `PD_Products` (`SpecificitiesId`);

CREATE INDEX `IX_PD_Products_SupplierId` ON `PD_Products` (`SupplierId`);

CREATE INDEX `IX_PD_Products_UserId` ON `PD_Products` (`UserId`);

CREATE INDEX `IX_PD_ProductTypes_CompanyId` ON `PD_ProductTypes` (`CompanyId`);

CREATE UNIQUE INDEX `IX_PD_ProductTypes_Name` ON `PD_ProductTypes` (`Name`);

CREATE INDEX `IX_PD_ProductTypes_UserId` ON `PD_ProductTypes` (`UserId`);

CREATE INDEX `IX_PD_Segments_CompanyId` ON `PD_Segments` (`CompanyId`);

CREATE INDEX `IX_PD_Segments_ProductTypeId` ON `PD_Segments` (`ProductTypeId`);

CREATE INDEX `IX_PD_Specificities_CompanyId` ON `PD_Specificities` (`CompanyId`);

CREATE INDEX `IX_PD_Specificities_ModelId` ON `PD_Specificities` (`ModelId`);

CREATE INDEX `IX_SD_socialnetworks_CompanyId` ON `SD_socialnetworks` (`CompanyId`);

CREATE INDEX `IX_SD_socialnetworks_ContactId` ON `SD_socialnetworks` (`ContactId`);

INSERT INTO `__EFMigrationsHistory` (`MigrationId`, `ProductVersion`)
VALUES ('20250102125721_fkgkged', '5.0.13');

COMMIT;

START TRANSACTION;

ALTER TABLE `PD_Specificities` DROP FOREIGN KEY `FK_PD_Specificities_PD_Models_ModelId`;

ALTER TABLE `PD_Specificities` DROP INDEX `IX_PD_Specificities_ModelId`;

ALTER TABLE `PD_Specificities` DROP COLUMN `ModelId`;

ALTER TABLE `PD_Models` ADD `SpecificitiesId` int NULL;

CREATE INDEX `IX_PD_Models_SpecificitiesId` ON `PD_Models` (`SpecificitiesId`);

ALTER TABLE `PD_Models` ADD CONSTRAINT `FK_PD_Models_PD_Specificities_SpecificitiesId` FOREIGN KEY (`SpecificitiesId`) REFERENCES `PD_Specificities` (`Id`) ON DELETE RESTRICT;

INSERT INTO `__EFMigrationsHistory` (`MigrationId`, `ProductVersion`)
VALUES ('20250108200633_specificities', '5.0.13');

COMMIT;

START TRANSACTION;

ALTER TABLE `PD_Specificities` ADD `ManufacturerLink` longtext CHARACTER SET utf8mb4 NULL;

INSERT INTO `__EFMigrationsHistory` (`MigrationId`, `ProductVersion`)
VALUES ('20250109010954_manufacturerLinks', '5.0.13');

COMMIT;

START TRANSACTION;

ALTER TABLE `PD_Specificities` RENAME COLUMN `Version` TO `DetailedDescription`;

INSERT INTO `__EFMigrationsHistory` (`MigrationId`, `ProductVersion`)
VALUES ('20250109141852_detailedDescription', '5.0.13');

COMMIT;

START TRANSACTION;

ALTER TABLE `PD_Models` DROP INDEX `IX_PD_Models_Name`;

ALTER TABLE `PD_Models` MODIFY COLUMN `Name` longtext CHARACTER SET utf8mb4 NULL;

INSERT INTO `__EFMigrationsHistory` (`MigrationId`, `ProductVersion`)
VALUES ('20250118012926_modelCanToBeIqualToAnother', '5.0.13');

COMMIT;

START TRANSACTION;

ALTER TABLE `PD_Specificities` DROP COLUMN `Capacity`;

ALTER TABLE `PD_Specificities` DROP COLUMN `Generation`;

ALTER TABLE `PD_Specificities` DROP COLUMN `Speed`;

INSERT INTO `__EFMigrationsHistory` (`MigrationId`, `ProductVersion`)
VALUES ('20250120235618_lToAnother', '5.0.13');

COMMIT;

