using System.Collections.Generic;

using Domain.Entities.Finances.MonthlyExpenses;
using Application.Services.Operations.Finances.Dtos.MonthlyExpenses;
using Application.Services.Shared.Mapper;


namespace Application.Services.Operations.Finances.Dtos.Mappers
{
    public partial class FinancialObjectMapperServices : CommonObjectMapper, IFinancialObjectMapperServices
    {
        public List<MonthlyFixedExpenseDto> MonthlyFixedExpensesListMake(List<MonthlyFixedExpense> list)
        {
            if (list == null) return null;

            var toReturn = new List<MonthlyFixedExpenseDto>();

            list.ForEach(x =>
            {
                toReturn.Add(MonthlyFixedExpenseMapper(x));

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
        public List<MonthlyFixedExpense> MonthlyFixedExpensesListMake(List<MonthlyFixedExpenseDto> list)
        {
            if (list == null) return null;

            var toReturn = new List<MonthlyFixedExpense>();

            list.ForEach(x =>
            {
                toReturn.Add(MonthlyFixedExpenseMapper(x));

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
        public MonthlyFixedExpenseDto MonthlyFixedExpenseMapper(MonthlyFixedExpense entity)
        {
            if (entity == null) return null;

            var obj = new MonthlyFixedExpenseDto()
            {
                Id = entity.Id,
                CompanyId = entity.CompanyId,
                UserId = entity.UserId,
                Deleted = entity.Deleted,
                Registered = entity.Registered,
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
                OthersPaymentMethods = entity.OthersPaymentMethods,
                Document = entity.Document,
                Description = entity.Description,
                LinkCopyBill = entity.LinkCopyBill,
                USERLinkCopyBill = entity.USERLinkCopyBill,
                PASSLinkCopyBill = entity.PASSLinkCopyBill,
            };

            return obj;
        }
        public MonthlyFixedExpense MonthlyFixedExpenseMapper(MonthlyFixedExpenseDto entity)
        {
            if (entity == null) return null;

            var obj = new MonthlyFixedExpense()
            {
                Id = entity.Id,
                CompanyId = entity.CompanyId,
                UserId = entity.UserId,
                Deleted = entity.Deleted,
                Registered = entity.Registered,
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
                OthersPaymentMethods = entity.OthersPaymentMethods,
                Document = entity.Document,
                Description = entity.Description,
                LinkCopyBill = entity.LinkCopyBill,
                USERLinkCopyBill = entity.USERLinkCopyBill,
                PASSLinkCopyBill = entity.PASSLinkCopyBill,
            };

            return obj;
        }
        public MonthlyFixedExpense MonthlyFixedExpenseMapper(MonthlyFixedExpensePaymentDto entity)
        {
            if (entity == null) return null;

            var obj = new MonthlyFixedExpense()
            {
                Id = entity.Id,
                UserId = entity.UserId,
                CompanyId = entity.CompanyId,
                BankAccountId = entity.BankAccountId,
                CardId = entity.CardId,
                PixId = entity.PixId,
                Price = entity.Price,
                Interest = entity.Interest,
                WasPaid = entity.WasPaid,
                OthersPaymentMethods = entity.OthersPaymentMethods,
                Document = entity.Document
            };

            return obj;
        }

    }

}