using System.Collections.Generic;

using Domain.Entities.Finances.MonthlyExpenses;
using Application.Services.Operations.Finances.Dtos.MonthlyExpenses;
using Application.Services.Operations.Finances.Dtos.YearlyExpenses;
using Domain.Entities.Finances.YearlyExpenses;


namespace Application.Services.Operations.Finances.Dtos.Mappers
{
    public partial class FinancialObjectMapperServices
    {
        public List<YearlyFixedExpenseDto> YearlyFixedExpensesListMake(List<YearlyFixedExpense> list)
        {
            if (list == null) return null;

            var toReturn = new List<YearlyFixedExpenseDto>();

            list.ForEach(x =>
            {
                toReturn.Add(YearlyFixedExpenseMapper(x));

                // toReturn.ForEach(y =>
                // {
                //     if (x.CategoryExpenseId == y.CategoryExpenseId)
                //         y.CategoryExpense = CategoryExpenseMapper(x.CategoryExpense);

                //     if (x.SubcategoryExpenseId == y.SubcategoryExpenseId)
                //         y.SubcategoryExpense = SubcategoryExpenseMapper(x.SubcategoryExpense);
                // });

            });


            return toReturn;
        }
        public YearlyFixedExpenseDto YearlyFixedExpenseMapper(YearlyFixedExpense entity)
        {
            if (entity == null) return null;

            var obj = new YearlyFixedExpenseDto()
            {
                Name = entity.Name,
                CategoryExpenseId = entity.CategoryExpenseId,
                SubcategoryExpenseId = entity.SubcategoryExpenseId,
                BankAccountId = entity.BankAccountId,
                CardId = entity.CardId,
                PixId = entity.PixId,
                Price = entity.Price,
                Interest = entity.Interest,
                Expires = entity.Expires,
                WasPaid = entity.WasPaid,
                Start = entity.Start,
                AutoRenew = entity.AutoRenew,
                OthersPaymentMethods = entity.OthersPaymentMethods,
                Document = entity.Document,
                Description = entity.Description,
                LinkCopyBill = entity.LinkCopyBill,
                USERLinkCopyBill = entity.USERLinkCopyBill,
                PASSLinkCopyBill = entity.PASSLinkCopyBill,
            };

            return obj;
        }
        public YearlyFixedExpense YearlyFixedExpenseMapperPayment(YearlyFixedExpensePaymentDto entity)
        {
            if (entity == null) return null;

            var obj = new YearlyFixedExpenseDto()
            {
                Name = entity.Name,
                CategoryExpenseId = entity.CategoryExpenseId,
                SubcategoryExpenseId = entity.SubcategoryExpenseId,
                BankAccountId = entity.BankAccountId,
                CardId = entity.CardId,
                PixId = entity.PixId,
                Price = entity.Price,
                Interest = entity.Interest,
                Expires = entity.Expires,
                WasPaid = entity.WasPaid,
                Start = entity.Start,
                AutoRenew = entity.AutoRenew,
                OthersPaymentMethods = entity.OthersPaymentMethods,
                Document = entity.Document,
                Description = entity.Description,
                LinkCopyBill = entity.LinkCopyBill,
                USERLinkCopyBill = entity.USERLinkCopyBill,
                PASSLinkCopyBill = entity.PASSLinkCopyBill,
            };

            return obj;
        }
        public YearlyFixedExpense YearlyFixedExpenseMapper(YearlyFixedExpenseDto entity)
        {
            if (entity == null) return null;

            var obj = new YearlyFixedExpense()
            {
                Name = entity.Name,
                CategoryExpenseId = entity.CategoryExpenseId,
                SubcategoryExpenseId = entity.SubcategoryExpenseId,
                BankAccountId = entity.BankAccountId,
                CardId = entity.CardId,
                PixId = entity.PixId,
                Price = entity.Price,
                Interest = entity.Interest,
                Expires = entity.Expires,
                WasPaid = entity.WasPaid,
                Start = entity.Start,
                AutoRenew = entity.AutoRenew,
                OthersPaymentMethods = entity.OthersPaymentMethods,
                Document = entity.Document,
                Description = entity.Description,
                LinkCopyBill = entity.LinkCopyBill,
                USERLinkCopyBill = entity.USERLinkCopyBill,
                PASSLinkCopyBill = entity.PASSLinkCopyBill,
            };

            return obj;
        }

    }
}