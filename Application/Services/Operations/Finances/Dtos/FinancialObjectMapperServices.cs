using System.Collections.Generic;
using Domain.Entities.Finances.FinancingsLoansExpenses;
using Application.Services.Operations.Finances.Dtos.CategorySubcategoryExpenses;
using Application.Services.Operations.Finances.Dtos.Enums;
using Application.Services.Operations.Authentication.Dtos;
using Application.Services.Operations.Main.Companies.Dtos;
using Application.Services.Operations.Finances.Dtos.Bank;
using Application.Services.Operations.Finances.Dtos.PixExpenses;
using Domain.Entities.Main.Companies;
using Domain.Entities.Finances.CategorySubcategoryExpenses;
using Domain.Entities.Finances.Enums;
using Domain.Entities.Authentication;
using Application.Services.Operations.Finances.Dtos.FinancingsLoansExpenses;
using Domain.Entities.Finances.Bank;
using Domain.Entities.Finances.CreditCardExpenses;
using Application.Services.Operations.Finances.Dtos.CreditCardExpenses;
using Application.Services.Shared.Mapper;


namespace Application.Services.Operations.Finances.Dtos
{
    public class FinancialObjectMapperServices : CommonObjectMapper, IFinancialObjectMapperServices
    {
        //BankAccount
        public BankAccountDto BankAccountMapper(BankAccount entity)
        {
            var obj = new BankAccountDto()
            {
                Id = entity.Id,
                UserId = entity.UserId,
                CompanyId = entity.CompanyId,
                Holder = entity.Holder,
                Institution = entity.Institution,
                Account = entity.Account,
                Agency = entity.Agency,
                ManagerName = entity.ManagerName,
                ManagerContact = entity.ManagerContact,
                Balance = entity.Balance,
                Deleted = entity.Deleted,
                Registered = entity.Registered,
                Description = entity.Description,
                Type = (TypeAccountEnumDto)entity.Type,
            };

            return obj;
        }
        public BankAccount BankAccountMapper(BankAccountDto entity)
        {
            var obj = new BankAccount()
            {
                Id = entity.Id,
                UserId = entity.UserId,
                CompanyId = entity.CompanyId,
                Holder = entity.Holder,
                Institution = entity.Institution,
                Account = entity.Account,
                Agency = entity.Agency,
                ManagerName = entity.ManagerName,
                ManagerContact = entity.ManagerContact,
                Balance = entity.Balance,
                Deleted = entity.Deleted,
                Registered = entity.Registered,
                Description = entity.Description,
                Type = (TypeAccountEnum)entity.Type,
            };

            return obj;
        }
        public CardDto CardMapper(Card entity)
        {
            var card = new CardDto()
            {
                Id = entity.Id,
                UserId = entity.UserId,
                CompanyId = entity.CompanyId,
                Holder = entity.Holder,
                Flag = entity.Flag,
                CreditLimit = entity.CreditLimit,
                Type = (TypeCardEnumDto)entity.Type,
                CVC = entity.CVC,
                Description = entity.Description,
                Validate = entity.Validate,
                ClosingDate = entity.ClosingDate,
                ExpiresDate = entity.ExpiresDate,
                Deleted = entity.Deleted,
                Registered = entity.Registered,
                BankAccountId = entity.BankAccountId ?? 0,
            };
            return card;
        }
        public Card CardMapper(CardDto entity)
        {
            var card = new Card()
            {
                Id = entity.Id,
                UserId = entity.UserId,
                CompanyId = entity.CompanyId,
                Holder = entity.Holder,
                Flag = entity.Flag,
                CreditLimit = entity.CreditLimit,
                Type = (TypeCardEnum)entity.Type,
                CVC = entity.CVC,
                Description = entity.Description,
                Validate = entity.Validate,
                ClosingDate = entity.ClosingDate,
                ExpiresDate = entity.ExpiresDate,
                Deleted = entity.Deleted,
                Registered = entity.Registered,
                BankAccountId = entity.BankAccountId,

            };
            return card;
        }
        public CreditCardLimitOperationDto CreditCardLimitOperationMapper(CreditCardLimitOperation entity)
        {
            var creditCardLimitOperation = new CreditCardLimitOperationDto()
            {
                CardId = entity.CardId,
                UserId = entity.UserId,
                CompanyId = entity.CompanyId,
                LimitCreditUsed = entity.LimitCreditUsed,
                Registered = entity.Registered,
                PriceOfLastPayment = entity.PriceOfLastPayment,
                LastPayment = entity.LastPayment,
            };

            return creditCardLimitOperation;

        }
        public CreditCardLimitOperation CreditCardLimitOperationMapper(CreditCardLimitOperationDto entity)
        {
            var creditCardLimitOperation = new CreditCardLimitOperation()
            {
                CardId = entity.CardId,
                UserId = entity.UserId ?? 0,
                CompanyId = entity.CompanyId,
                LimitCreditUsed = entity.LimitCreditUsed,
                Registered = entity.Registered,
                PriceOfLastPayment = entity.PriceOfLastPayment,
                LastPayment = entity.LastPayment,
            };

            return creditCardLimitOperation;

        }
        public PixDto PixMapper(Pix entity)
        {
            var obj = new PixDto()
            {
                Id = entity.Id,
                Key = entity.Key,
                Value = entity.Value,
                Deleted = entity.Deleted,
                BankAccountId = entity.BankAccountId,
            };

            return obj;
        }
        public Pix PixMapper(PixDto entity)
        {
            var obj = new Pix()
            {
                Id = entity.Id,
                Key = entity.Key,
                Value = entity.Value,
                Deleted = entity.Deleted,
                BankAccountId = entity.BankAccountId,
            };

            return obj;
        }
        //
        //Financial
        public CategoryExpenseDto CategoryExpenseMapper(CategoryExpense entity)
        {
            var catExpense = new CategoryExpenseDto()
            {
                Id = entity.Id,
                CompanyId = entity.CompanyId,
                Name = entity.Name,
            };
            return catExpense;
        }
        public CategoryExpense CategoryExpenseMapper(CategoryExpenseDto entity)
        {
            var catExpense = new CategoryExpense()
            {
                Id = entity.Id,
                CompanyId = entity.CompanyId,
                Name = entity.Name,
            };
            return catExpense;
        }
        public SubcategoryExpenseDto SubcategoryExpenseMapper(SubcategoryExpense entity)
        {
            var subCatExpense = new SubcategoryExpenseDto()
            {
                Id = entity.Id,
                CategoryExpenseId = entity.CategoryExpenseId,
                Name = entity.Name,
                PayCycle = (PayCycleEnumDto)entity.PayCycle,
            };
            return subCatExpense;
        }
        public SubcategoryExpense SubcategoryExpenseMapper(SubcategoryExpenseDto entity)
        {
            var subCatExpense = new SubcategoryExpense()
            {
                Id = entity.Id,
                CategoryExpenseId = entity.CategoryExpenseId,
                Name = entity.Name,
                PayCycle = (PayCycleEnum)entity.PayCycle,
            };
            return subCatExpense;
        }
        //
        //FinancingAndLoanExpense
        public List<FinancingAndLoanExpenseDto> FinancingAndLoanExpenseListMake(List<FinancingAndLoanExpense> financingAndLoanExpense)
        {
            var toReturn = new List<FinancingAndLoanExpenseDto>();

            financingAndLoanExpense.ForEach(x =>
            {
                toReturn.Add(FinancingAndLoanExpenseMapper(x));
            });


            return toReturn;
        }
        public List<FinancingAndLoanExpenseInstallmentDto> FinancingAndLoanExpenseInstallmentListMake(List<FinancingAndLoanExpenseInstallment> installments)
        {
            var toReturn = new List<FinancingAndLoanExpenseInstallmentDto>();

            installments.ForEach(x =>
            {
                toReturn.Add(FinancingAndLoanExpenseInstallmentMapper(x));
            });


            return toReturn;
        }
        public FinancingAndLoanExpenseDto FinancingAndLoanExpenseMapper(FinancingAndLoanExpense entity)
        {
            var obj = new FinancingAndLoanExpenseDto()
            {
                Id = entity.Id,
                Name = entity.Name,
                UserId = entity.UserId,
                CompanyId = entity.CompanyId,
                CategoryExpense = CategoryExpenseMapper(entity.CategoryExpense),
                CategoryExpenseId = entity.CategoryExpenseId,
                SubcategoryExpense = SubcategoryExpenseMapper(entity.SubcategoryExpense),
                SubcategoryExpenseId = entity.SubcategoryExpenseId,
                Start = entity.Start,
                End = entity.End,
                TotalPriceToBePaid = entity.TotalPriceToBePaid,
                TotalPriceFinancingOrLoan = entity.TotalPriceFinancingOrLoan,
                TotalPriceInterest = entity.TotalPriceInterest,
                TotalPercentageInterest = entity.TotalPercentageInterest,
                InstallmentsQuantity = entity.InstallmentsQuantity,
                InstallmentPrice = entity.InstallmentPrice,
                WasPaid = entity.WasPaid,
                PaidOff = entity.PaidOff,
                Deleted = entity.Deleted,
                Registered = entity.Registered,
                Description = entity.Description,
                FinancingsAndLoansExpensesInstallments = new(),
                LinkCopyBill = entity.LinkCopyBill,
                USERLinkCopyBill = entity.USERLinkCopyBill,
                PASSLinkCopyBill = entity.PASSLinkCopyBill,
            };
            return obj;
        }
        public FinancingAndLoanExpense FinancingAndLoanExpenseMapper(FinancingAndLoanExpenseDto entity)
        {
            var obj = new FinancingAndLoanExpense()
            {
                Id = entity.Id,
                Name = entity.Name,
                UserId = entity.UserId,
                CompanyId = entity.CompanyId,
                CategoryExpenseId = entity.CategoryExpenseId,
                SubcategoryExpenseId = entity.SubcategoryExpenseId,
                Start = entity.Start,
                End = entity.End,
                TotalPriceToBePaid = entity.TotalPriceToBePaid,
                TotalPriceFinancingOrLoan = entity.TotalPriceFinancingOrLoan,
                TotalPriceInterest = entity.TotalPriceInterest,
                TotalPercentageInterest = entity.TotalPercentageInterest,
                InstallmentsQuantity = entity.InstallmentsQuantity,
                InstallmentPrice = entity.InstallmentPrice,
                WasPaid = entity.WasPaid,
                PaidOff = entity.PaidOff,
                Deleted = entity.Deleted,
                Registered = entity.Registered,
                Description = entity.Description,
                FinancingsAndLoansExpensesInstallments = new(),
                LinkCopyBill = entity.LinkCopyBill,
                USERLinkCopyBill = entity.USERLinkCopyBill,
                PASSLinkCopyBill = entity.PASSLinkCopyBill,
            };
            return obj;
        }
        public FinancingAndLoanExpenseInstallmentDto FinancingAndLoanExpenseInstallmentMapper(FinancingAndLoanExpenseInstallment entity)
        {
            var obj = new FinancingAndLoanExpenseInstallmentDto()
            {
                Id = entity.Id,
                CompanyId = entity.CompanyId,
                UserId = entity.UserId,
                BankAccountId = entity.BankAccountId,
                Deleted = entity.Deleted,
                CardId = entity.CardId,
                PixId = entity.PixId,
                Interest = entity.Interest,
                Expires = entity.Expires,
                Registered = entity.Registered,
                WasPaid = entity.WasPaid,
                OthersPaymentMethods = entity.OthersPaymentMethods,
                Document = entity.Document,
                PriceWasPaidInstallment = entity.PriceWasPaidInstallment,
                CurrentInstallment = entity.CurrentInstallment,
                FinancingAndLoanExpenseId = entity.FinancingAndLoanExpenseId,
            };

            return obj;

        }
        public FinancingAndLoanExpenseInstallment FinancingAndLoanExpenseInstallmentMapper(FinancingAndLoanExpenseInstallmentDto entity)
        {
            var obj = new FinancingAndLoanExpenseInstallment()
            {
                Id = entity.Id,
                CompanyId = entity.CompanyId,
                UserId = entity.UserId,
                BankAccountId = entity.BankAccountId,
                Deleted = entity.Deleted,
                CardId = entity.CardId,
                PixId = entity.PixId,
                Interest = entity.Interest,
                Expires = entity.Expires,
                Registered = entity.Registered,
                WasPaid = entity.WasPaid,
                OthersPaymentMethods = entity.OthersPaymentMethods,
                Document = entity.Document,
                PriceWasPaidInstallment = entity.PriceWasPaidInstallment,
                CurrentInstallment = entity.CurrentInstallment,
                FinancingAndLoanExpenseId = entity.FinancingAndLoanExpenseId,
            };

            return obj;

        }
        public FinancingAndLoanExpenseInstallment InstallmentPayment(FinancingAndLoanExpenseInstallmentPaymentDto dto, FinancingAndLoanExpenseInstallment db)
        {
            db.Id = dto.Id;
            db.CompanyId = dto.CompanyId;
            db.UserId = dto.UserId;
            db.BankAccountId = dto.BankAccountId;
            db.CardId = dto.CardId;
            db.PixId = dto.PixId;
            db.Interest = dto.Interest;
            db.WasPaid = dto.WasPaid;
            db.OthersPaymentMethods = dto.OthersPaymentMethods;
            db.Document = dto.Document;
            db.PriceWasPaidInstallment = dto.PriceWasPaidInstallment;
            return db;
        }
        //
        //CreditCardExpenses
        public CreditCardExpenseDto CreditCardExpenseMapper(CreditCardExpense entity)
        {
            var obj = new CreditCardExpenseDto()
            {
                Id = entity.Id,
                Name = entity.Name,
                UserId = entity.UserId,
                CompanyId = entity.CompanyId,
                CategoryExpenseId = entity.CategoryExpenseId,
                SubcategoryExpenseId = entity.SubcategoryExpenseId,
                Deleted = entity.Deleted,
                CardId = entity.CardId,
                Price = entity.Price,
                Expires = entity.Expires,
                Registered = entity.Registered,
                WasPaid = entity.WasPaid,
                OthersPaymentMethods = entity.OthersPaymentMethods,
                Document = entity.Document,
                Description = entity.Description,
                InstallmentsQuantity = entity.InstallmentsQuantity,
                InstallmentPrice = entity.InstallmentPrice,
                TotalPriceInterest = entity.TotalPriceInterest,
                TotalPercentageInterest = entity.TotalPercentageInterest,
                PaymentAtSight = entity.PaymentAtSight,
                CurrentInstallment = entity.CurrentInstallment,
                ExpenseDay = entity.ExpenseDay,
                CreditCardExpenseInvoiceId = entity.CreditCardExpenseInvoiceId,
            };

            return obj;
        }
        public CreditCardExpense CreditCardExpenseMapper(CreditCardExpenseDto entity)
        {
            var obj = new CreditCardExpense()
            {
                Id = entity.Id,
                Name = entity.Name,
                UserId = entity.UserId,
                CompanyId = entity.CompanyId,
                CategoryExpenseId = entity.CategoryExpenseId,
                SubcategoryExpenseId = entity.SubcategoryExpenseId,
                Deleted = entity.Deleted,
                CardId = entity.CardId,
                Price = entity.Price,
                Expires = entity.Expires,
                Registered = entity.Registered,
                WasPaid = entity.WasPaid,
                OthersPaymentMethods = entity.OthersPaymentMethods,
                Document = entity.Document,
                Description = entity.Description,
                InstallmentsQuantity = entity.InstallmentsQuantity,
                InstallmentPrice = entity.InstallmentPrice,
                TotalPriceInterest = entity.TotalPriceInterest,
                TotalPercentageInterest = entity.TotalPercentageInterest,
                PaymentAtSight = entity.PaymentAtSight,
                CurrentInstallment = entity.CurrentInstallment,
                ExpenseDay = entity.ExpenseDay,
                CreditCardExpenseInvoiceId = entity.CreditCardExpenseInvoiceId ?? 0,
            };

            return obj;
        }
        public CreditCardExpenseInvoiceDto CreditCardExpenseInvoiceMapper(CreditCardExpenseInvoice entity)
        {
            var obj = new CreditCardExpenseInvoiceDto()
            {
                Id = entity.Id,
                UserId = entity.UserId,
                CompanyId = entity.CompanyId,
                CardId = entity.CardId ?? 0,
                PaidFromBankAccountId = entity.PaidFromBankAccountId,
                Price = entity.Price,
                Expires = entity.Expires,
                Interest = entity.Interest,
                ClosingDate = entity.ClosingDate,
                WasPaid = entity.WasPaid,
                OthersPaymentMethods = entity.OthersPaymentMethods,
                Document = entity.Document,
                Description = entity.Description,
                Registered = entity.Registered,
                Deleted = entity.Deleted,
            };

            return obj;
        }
        public CreditCardExpenseInvoice CreditCardExpenseInvoiceMapper(CreditCardExpenseInvoiceDto entity)
        {
            var obj = new CreditCardExpenseInvoice()
            {
                Id = entity.Id,
                UserId = entity.UserId,
                CompanyId = entity.CompanyId,
                CardId = entity.CardId,
                PaidFromBankAccountId = entity.PaidFromBankAccountId,
                Price = entity.Price,
                Expires = entity.Expires,
                Interest = entity.Interest,
                ClosingDate = entity.ClosingDate,
                WasPaid = entity.WasPaid,
                OthersPaymentMethods = entity.OthersPaymentMethods,
                Document = entity.Document,
                Description = entity.Description,
                Registered = entity.Registered,
                Deleted = entity.Deleted,
            };

            return obj;
        }
        //




    }
}