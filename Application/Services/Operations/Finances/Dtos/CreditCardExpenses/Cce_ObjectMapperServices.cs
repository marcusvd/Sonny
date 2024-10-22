// using System.Collections.Generic;
// using Domain.Entities.Finances.FinancingsLoansExpenses;
// using Application.Services.Operations.Finances.Dtos.CategorySubcategoryExpenses;
// using Application.Services.Operations.Finances.Dtos.Enums;
// using Application.Services.Operations.Authentication.Dtos;
// using Application.Services.Operations.Main.Companies.Dtos;
// using Application.Services.Operations.Finances.Dtos.Bank;
// using Application.Services.Operations.Finances.Dtos.CreditCardExpenses;
// using Domain.Entities.Finances.CreditCardExpenses;

// namespace Application.Services.Operations.Finances.Dtos.FinancingsLoansExpenses
// {
//     public class Cce_ObjectMapperServices : ICce_ObjectMapperServices
//     {
//         // public List<FinancingAndLoanExpenseDto> ExpensesDbToDtoListMake(List<FinancingAndLoanExpense> financingAndLoanExpense)
//         // {
//         //     var toReturn = new List<FinancingAndLoanExpenseDto>();

//         //     financingAndLoanExpense.ForEach(x =>
//         //     {
//         //         toReturn.Add(ExpenseDbToDto(x));
//         //     });


//         //     return toReturn;
//         // }
//         public CreditCardExpense ExpenseDtoToDb(CreditCardExpenseDto entityDto)
//         {
//             var obj = new CreditCardExpense()
//             {
//                 Id = entityDto.Id,
//                 Name = entityDto.Name,
//                 UserId = entityDto.UserId,
//                 CompanyId = entityDto.CompanyId,
//                 CategoryExpenseId = entityDto.CategoryExpenseId,
//                 SubcategoryExpenseId = entityDto.SubcategoryExpenseId,
//                 Deleted = entityDto.Deleted,
//                 CardId = entityDto.CardId,
//                 Price = entityDto.Price,
//                 Expires = entityDto.Expires,
//                 Registered = entityDto.Registered,
//                 WasPaid = entityDto.WasPaid,
//                 OthersPaymentMethods = entityDto.OthersPaymentMethods,
//                 Document = entityDto.Document,
//                 Description = entityDto.Description,
//                 InstallmentsQuantity = entityDto.InstallmentsQuantity,
//                 InstallmentPrice = entityDto.InstallmentPrice,
//                 TotalPriceInterest = entityDto.TotalPriceInterest,
//                 TotalPercentageInterest = entityDto.TotalPercentageInterest,
//                 PaymentAtSight = entityDto.PaymentAtSight,
//                 CurrentInstallment = entityDto.CurrentInstallment,
//                 ExpenseDay = entityDto.ExpenseDay,
//                 CreditCardExpenseInvoiceId = entityDto.CreditCardExpenseInvoiceId ?? 0,
//             };

//             return obj;
//         }
//         public CreditCardExpenseDto ExpenseDbToDto(CreditCardExpense db)
//         {

//             var creditCardExpenseInvoice = new CreditCardExpenseInvoiceDto();
//             if (db.CreditCardExpenseInvoice != null)
//             {
//                 creditCardExpenseInvoice.Id = db.Id;
//                 creditCardExpenseInvoice.UserId = db.UserId;
//                 creditCardExpenseInvoice.CompanyId = db.CompanyId;
//                 creditCardExpenseInvoice.CardId = db.CardId;
//                 creditCardExpenseInvoice.PaidFromBankAccountId = db.CreditCardExpenseInvoice.PaidFromBankAccountId ?? 0;
//                 creditCardExpenseInvoice.Price = db.Price;
//                 creditCardExpenseInvoice.Expires = db.Expires;
//                 creditCardExpenseInvoice.WasPaid = db.WasPaid;
//                 creditCardExpenseInvoice.OthersPaymentMethods = db.OthersPaymentMethods;
//                 creditCardExpenseInvoice.Document = db.Document;
//                 creditCardExpenseInvoice.Description = db.Description;
//                 creditCardExpenseInvoice.Registered = db.Registered;
//                 creditCardExpenseInvoice.Deleted = db.Deleted;
//             }

//             var catExpense = new CategoryExpenseDto();
//             if (db.CategoryExpense != null)
//             {
//                 catExpense.Id = db.CategoryExpense.Id;
//                 catExpense.CompanyId = db.CategoryExpense.CompanyId;
//                 catExpense.Name = db.CategoryExpense.Name;
//             }

//             var subcatExpense = new SubcategoryExpenseDto();
//             if (db.SubcategoryExpense != null)
//             {
//                 subcatExpense.Id = db.SubcategoryExpense.Id;
//                 subcatExpense.CategoryExpenseId = db.SubcategoryExpense.CategoryExpenseId;
//                 subcatExpense.Name = db.SubcategoryExpense.Name;
//                 subcatExpense.PayCycle = (PayCycleEnumDto)db.SubcategoryExpense.PayCycle;
//             }

//             var user = new MyUserDto();
//             if (db.User != null)
//             {
//                 user.Id = db.User.Id;
//                 user.CompanyId = db.User.CompanyId;
//                 user.UserName = db.User.UserName;
//                 user.Email = db.User.Email;
//             }

//             var company = new CompanyDto();
//             if (db.Company != null)
//             {
//                 company.Id = db.Company.Id;
//                 company.Name = db.Company.Name;
//                 company.Deleted = db.Company.Deleted;
//             }

//             var card = new CardDto();
//             if (db.Card != null)
//             {

//                 card.Id = db.Card.Id;
//                 card.UserId = db.Card.UserId;
//                 card.CompanyId = db.Card.CompanyId;
//                 card.Holder = db.Card.Holder;
//                 card.Flag = db.Card.Flag;
//                 card.CreditLimit = db.Card.CreditLimit;
//                 card.Type = (TypeCardEnumDto)db.Card.Type;
//                 card.CVC = db.Card.CVC;
//                 card.Description = db.Card.Description;
//                 card.Validate = db.Card.Validate;
//                 card.ClosingDate = db.Card.ClosingDate;
//                 card.ExpiresDate = db.Card.ExpiresDate;
//                 card.Deleted = db.Card.Deleted;
//                 card.Registered = db.Card.Registered;
//                 card.BankAccountId = db.Card.BankAccountId ?? 0;

//                 var creditCardLimitOperation = new CreditCardLimitOperationDto();
//                 if (db.Card.CreditCardLimitOperation != null)
//                 {
//                     if (creditCardLimitOperation != null)
//                     {
//                         creditCardLimitOperation.CardId = db.Card.CreditCardLimitOperation.CardId;
//                         creditCardLimitOperation.UserId = db.Card.CreditCardLimitOperation.UserId;
//                         creditCardLimitOperation.CompanyId = db.Card.CreditCardLimitOperation.CompanyId;
//                         creditCardLimitOperation.LimitCreditUsed = db.Card.CreditCardLimitOperation.LimitCreditUsed;
//                         creditCardLimitOperation.Registered = db.Card.CreditCardLimitOperation.Registered;
//                         creditCardLimitOperation.PriceOfLastPayment = db.Card.CreditCardLimitOperation.PriceOfLastPayment;
//                         creditCardLimitOperation.LastPayment = db.Card.CreditCardLimitOperation.LastPayment;
//                     }
//                     card.CreditCardLimitOperation = creditCardLimitOperation;
//                 }
//             }


//             var obj = new CreditCardExpenseDto()
//             {
//                 Id = db.Id,
//                 Name = db.Name,
//                 UserId = db.UserId,
//                 User = user,
//                 CompanyId = db.CompanyId,
//                 Company = company,
//                 CategoryExpense = catExpense,
//                 CategoryExpenseId = db.CategoryExpenseId,
//                 SubcategoryExpense = subcatExpense,
//                 SubcategoryExpenseId = db.SubcategoryExpenseId,
//                 Deleted = db.Deleted,
//                 CardId = db.CardId,
//                 Card = card,
//                 Price = db.Price,
//                 Expires = db.Expires,
//                 Registered = db.Registered,
//                 WasPaid = db.WasPaid,
//                 OthersPaymentMethods = db.OthersPaymentMethods,
//                 Document = db.Document,
//                 Description = db.Description,
//                 InstallmentsQuantity = db.InstallmentsQuantity,
//                 InstallmentPrice = db.InstallmentPrice,
//                 TotalPriceInterest = db.TotalPriceInterest,
//                 TotalPercentageInterest = db.TotalPercentageInterest,
//                 PaymentAtSight = db.PaymentAtSight,
//                 CurrentInstallment = db.CurrentInstallment,
//                 ExpenseDay = db.ExpenseDay,
//                 CreditCardExpenseInvoice = creditCardExpenseInvoice,
//                 CreditCardExpenseInvoiceId = db.CreditCardExpenseInvoiceId,
//             };

//             return obj;
//         }



//         public List<FinancingAndLoanExpenseInstallmentDto> InstallmentsDbToDtoListMake(List<FinancingAndLoanExpenseInstallment> installments)
//         {
//             var toReturn = new List<FinancingAndLoanExpenseInstallmentDto>();

//             installments.ForEach(x =>
//             {
//                 toReturn.Add(InstallmentDbToDto(x));
//             });


//             return toReturn;
//         }

//         public CreditCardExpenseInvoiceDto InstallmentDbToDto(CreditCardExpenseInvoice db)
//         {

//             var company = new CompanyDto();
//             var user = new MyUserDto();
//             var bankAccount = new BankAccountDto();
//             var card = new CardDto();
//             var financingAndLoanExpense = new FinancingAndLoanExpenseDto();
//             var pix = new PixDto();

//             if (db.Company != null)
//             {
//                 company.Id = db.Company.Id;
//                 company.Name = db.Company.Name;
//                 company.Deleted = db.Company.Deleted;
//             }

//             if (db.User != null)
//             {
//                 user.Id = db.User.Id;
//                 user.CompanyId = db.User.CompanyId;
//                 user.UserName = db.User.UserName;
//                 user.Email = db.User.Email;
//             }

//             if (db.BankAccount != null)
//             {
//                 bankAccount.Id = entityDto.BankAccount.Id;
//                 bankAccount.UserId = entityDto.BankAccount.UserId;
//                 bankAccount.CompanyId = entityDto.BankAccount.CompanyId;
//                 bankAccount.Holder = entityDto.BankAccount.Holder;
//                 bankAccount.Institution = entityDto.BankAccount.Institution;
//                 bankAccount.Account = entityDto.BankAccount.Account;
//                 bankAccount.Agency = entityDto.BankAccount.Agency;
//                 bankAccount.ManagerName = entityDto.BankAccount.ManagerName;
//                 bankAccount.ManagerContact = entityDto.BankAccount.ManagerContact;
//                 bankAccount.Balance = entityDto.BankAccount.Balance;
//                 bankAccount.Deleted = entityDto.BankAccount.Deleted;
//                 bankAccount.Registered = entityDto.BankAccount.Registered;
//                 bankAccount.Description = entityDto.BankAccount.Description;
//                 bankAccount.Type = (TypeAccountEnumDto)entityDto.BankAccount.Type;
//             }

//             if (db.Card != null)
//             {

//                 card.Id = entityDto.Card.Id;
//                 card.UserId = entityDto.Card.UserId;
//                 card.CompanyId = entityDto.Card.CompanyId;
//                 card.Holder = entityDto.Card.Holder;
//                 card.Flag = entityDto.Card.Flag;
//                 card.CreditLimit = entityDto.Card.CreditLimit;
//                 card.Type = (TypeCardEnumDto)entityDto.Card.Type;
//                 card.CVC = entityDto.Card.CVC;
//                 card.Description = entityDto.Card.Description;
//                 card.Validate = entityDto.Card.Validate;
//                 card.ClosingDate = entityDto.Card.ClosingDate;
//                 card.ExpiresDate = entityDto.Card.ExpiresDate;
//                 card.Deleted = entityDto.Card.Deleted;
//                 card.Registered = entityDto.Card.Registered;
//                 card.BankAccountId = entityDto.Card.BankAccountId ?? 0;

//                 var creditCardLimitOperation = new CreditCardLimitOperationDto();
//                 if (entityDto.Card.CreditCardLimitOperation != null)
//                 {
//                     if (creditCardLimitOperation != null)
//                     {
//                         creditCardLimitOperation.CardId = entityDto.Card.CreditCardLimitOperation.CardId;
//                         creditCardLimitOperation.UserId = entityDto.Card.CreditCardLimitOperation.UserId;
//                         creditCardLimitOperation.CompanyId = entityDto.Card.CreditCardLimitOperation.CompanyId;
//                         creditCardLimitOperation.LimitCreditUsed = entityDto.Card.CreditCardLimitOperation.LimitCreditUsed;
//                         creditCardLimitOperation.Registered = entityDto.Card.CreditCardLimitOperation.Registered;
//                         creditCardLimitOperation.PriceOfLastPayment = entityDto.Card.CreditCardLimitOperation.PriceOfLastPayment;
//                         creditCardLimitOperation.LastPayment = entityDto.Card.CreditCardLimitOperation.LastPayment;
//                     }
//                     card.CreditCardLimitOperation = creditCardLimitOperation;
//                 }
//             }

//             if (financingAndLoanExpense != null)
//             {
//                 financingAndLoanExpense.Id = entityDto.FinancingAndLoanExpense.Id;
//                 financingAndLoanExpense.Name = entityDto.FinancingAndLoanExpense.Name;
//                 financingAndLoanExpense.UserId = entityDto.FinancingAndLoanExpense.UserId;
//                 financingAndLoanExpense.CompanyId = entityDto.FinancingAndLoanExpense.CompanyId;
//                 financingAndLoanExpense.CategoryExpenseId = entityDto.FinancingAndLoanExpense.CategoryExpenseId;
//                 financingAndLoanExpense.SubcategoryExpenseId = entityDto.FinancingAndLoanExpense.SubcategoryExpenseId;
//                 financingAndLoanExpense.Start = entityDto.FinancingAndLoanExpense.Start;
//                 financingAndLoanExpense.End = entityDto.FinancingAndLoanExpense.End;
//                 financingAndLoanExpense.TotalPriceFinancingOrLoan = entityDto.FinancingAndLoanExpense.TotalPriceFinancingOrLoan;
//                 financingAndLoanExpense.TotalPriceToBePaid = entityDto.FinancingAndLoanExpense.TotalPriceToBePaid;
//                 financingAndLoanExpense.TotalPriceInterest = entityDto.FinancingAndLoanExpense.TotalPriceInterest;
//                 financingAndLoanExpense.TotalPercentageInterest = entityDto.FinancingAndLoanExpense.TotalPercentageInterest;
//                 financingAndLoanExpense.InstallmentPrice = entityDto.FinancingAndLoanExpense.InstallmentPrice;
//                 financingAndLoanExpense.InstallmentsQuantity = entityDto.FinancingAndLoanExpense.InstallmentsQuantity;
//                 financingAndLoanExpense.WasPaid = entityDto.FinancingAndLoanExpense.WasPaid;
//                 financingAndLoanExpense.PaidOff = entityDto.FinancingAndLoanExpense.PaidOff;
//                 financingAndLoanExpense.Deleted = entityDto.FinancingAndLoanExpense.Deleted;
//                 financingAndLoanExpense.Registered = entityDto.FinancingAndLoanExpense.Registered;
//                 financingAndLoanExpense.Description = entityDto.FinancingAndLoanExpense.Description;
//                 financingAndLoanExpense.LinkCopyBill = entityDto.FinancingAndLoanExpense.LinkCopyBill;
//                 financingAndLoanExpense.USERLinkCopyBill = entityDto.FinancingAndLoanExpense.USERLinkCopyBill;
//                 financingAndLoanExpense.PASSLinkCopyBill = entityDto.FinancingAndLoanExpense.PASSLinkCopyBill;
//             }

//             if (db.Pix != null)
//             {
//                 pix.Id = entityDto.Pix.Id;
//                 pix.Key = entityDto.Pix.Key;
//                 pix.Value = entityDto.Pix.Value;
//                 pix.Deleted = entityDto.Pix.Deleted;
//                 pix.BankAccountId = entityDto.Pix.BankAccountId;
//             }


//             var obj = new CreditCardExpenseInvoiceDto()
//             {
//                 Id = db.Id,
//                 UserId = db.UserId,
//                 CompanyId = db.CompanyId,
//                 CardId = db.CardId ?? 0,
//                 PaidFromBankAccountId = db.PaidFromBankAccountId ?? 0,
//                 Price = db.Price,
//                 Expires = db.Expires,
//                 WasPaid = db.WasPaid,
//                 OthersPaymentMethods = db.OthersPaymentMethods,
//                 Document = db.Document,
//                 Description = db.Description,
//                 Registered = db.Registered,
//                 Deleted = db.Deleted,
//             };





//         public FinancingAndLoanExpenseInstallment InstallmentDtoToDb(FinancingAndLoanExpenseInstallmentDto entityDto)
//         {
//             var obj = new FinancingAndLoanExpenseInstallment()
//             {
//                 Id = entityDto.Id,
//                 CompanyId = entityDto.CompanyId,
//                 UserId = entityDto.UserId,
//                 BankAccountId = entityDto.BankAccountId,
//                 Deleted = entityDto.Deleted,
//                 CardId = entityDto.CardId,
//                 PixId = entityDto.PixId,
//                 Interest = entityDto.Interest,
//                 Expires = entityDto.Expires,
//                 Registered = entityDto.Registered,
//                 WasPaid = entityDto.WasPaid,
//                 OthersPaymentMethods = entityDto.OthersPaymentMethods,
//                 Document = entityDto.Document,
//                 PriceWasPaidInstallment = entityDto.PriceWasPaidInstallment,
//                 CurrentInstallment = entityDto.CurrentInstallment,
//                 FinancingAndLoanExpenseId = entityDto.FinancingAndLoanExpenseId,
//             };

//             return obj;
//         }
//         public FinancingAndLoanExpenseInstallment InstallmentPayment(FinancingAndLoanExpenseInstallmentPaymentDto dto, FinancingAndLoanExpenseInstallment db)
//         {

//             db.Id = dto.Id;
//             db.CompanyId = dto.CompanyId;
//             db.UserId = dto.UserId;
//             db.BankAccountId = dto.BankAccountId;
//             db.CardId = dto.CardId;
//             db.PixId = dto.PixId;
//             db.Interest = dto.Interest;
//             db.WasPaid = dto.WasPaid;
//             db.OthersPaymentMethods = dto.OthersPaymentMethods;
//             db.Document = dto.Document;
//             db.PriceWasPaidInstallment = dto.PriceWasPaidInstallment;

//             return db;
//         }

//     }
// }