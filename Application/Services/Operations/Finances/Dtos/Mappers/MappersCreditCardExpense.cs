using System.Collections.Generic;
using Domain.Entities.Finances.CreditCardExpenses;
using Application.Services.Operations.Finances.Dtos.CreditCardExpenses;
using Application.Services.Shared.Mapper;


namespace Application.Services.Operations.Finances.Dtos.Mappers
{
    public partial class FinancialObjectMapperServices:CommonObjectMapper, IFinancialObjectMapperServices
    {
        public List<CreditCardExpenseDto> CreditCardExpensesListMake(List<CreditCardExpense> list)
        {
            if (list == null) return null;

            var toReturn = new List<CreditCardExpenseDto>();

            list.ForEach(x =>
            {
                toReturn.Add(CreditCardExpenseMapper(x));

                toReturn.ForEach(y =>
                {
                    if (x.CategoryExpenseId == y.CategoryExpenseId)
                        y.CategoryExpense = CategoryExpenseMapper(x.CategoryExpense);

                    if (x.SubcategoryExpenseId == y.SubcategoryExpenseId)
                        y.SubcategoryExpense = SubcategoryExpenseMapper(x.SubcategoryExpense);
                });

            });


            return toReturn;
        }
        public List<CreditCardExpense> CreditCardExpensesListMake(List<CreditCardExpenseDto> list)
        {
            if (list == null) return null;

            var toReturn = new List<CreditCardExpense>();

            list.ForEach(x =>
            {
                toReturn.Add(CreditCardExpenseMapper(x));
            });


            return toReturn;
        }
        public CreditCardExpenseDto CreditCardExpenseMapper(CreditCardExpense entity)
        {
            if (entity == null) return null;

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
            if (entity == null) return null;

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

        public List<CreditCardExpenseInvoiceDto> CreditCardExpensesInvoicesListMake(List<CreditCardExpenseInvoice> list)
        {
            if (list == null) return null;

            var toReturn = new List<CreditCardExpenseInvoiceDto>();

            list.ForEach(x =>
            {
                toReturn.Add(CreditCardExpenseInvoiceMapper(x));
            });


            return toReturn;
        }
        public List<CreditCardExpenseInvoice> CreditCardExpensesInvoicesListMake(List<CreditCardExpenseInvoiceDto> list)
        {
            if (list == null) return null;

            var toReturn = new List<CreditCardExpenseInvoice>();

            list.ForEach(x =>
            {
                toReturn.Add(CreditCardExpenseInvoiceMapper(x));
            });


            return toReturn;
        }
        public CreditCardExpenseInvoiceDto CreditCardExpenseInvoiceMapper(CreditCardExpenseInvoice entity)
        {
            if (entity == null) return null;

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
            if (entity == null) return null;

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
                CreditCardExpenses = CreditCardExpensesListMake(entity.CreditCardExpenses)
            };

            return obj;
        }

    }
}