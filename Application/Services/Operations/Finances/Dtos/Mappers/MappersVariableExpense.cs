using System.Collections.Generic;

using Application.Services.Operations.Finances.Dtos.VariableDebitExpenses;
using Domain.Entities.Finances.VariablesDebitsExpenses;


namespace Application.Services.Operations.Finances.Dtos.Mappers
{
    public partial class FinancialObjectMapperServices
    {
        public List<VariableExpenseDto> VariableExpenseListMake(List<VariableExpense> list)
        {
            if (list == null) return null;

            var toReturn = new List<VariableExpenseDto>();

            list.ForEach(x =>
            {
                toReturn.Add(VariableExpenseMapper(x));

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
        public VariableExpenseDto VariableExpenseMapper(VariableExpense entity)
        {
            if (entity == null) return null;

            var obj = new VariableExpenseDto()
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
                OthersPaymentMethods = entity.OthersPaymentMethods,
                Document = entity.Document,
                Place = entity.Place,
                Description = entity.Description,
                LinkCopyBill = entity.LinkCopyBill,
                USERLinkCopyBill = entity.USERLinkCopyBill,
                PASSLinkCopyBill = entity.PASSLinkCopyBill,
            };

            return obj;
        }
        public VariableExpense VariableExpenseMapper(VariableExpenseDto entity)
        {
            if (entity == null) return null;

            var obj = new VariableExpense()
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
                OthersPaymentMethods = entity.OthersPaymentMethods,
                Document = entity.Document,
                Place = entity.Place,
                Description = entity.Description,
                LinkCopyBill = entity.LinkCopyBill,
                USERLinkCopyBill = entity.USERLinkCopyBill,
                PASSLinkCopyBill = entity.PASSLinkCopyBill,
            };

            return obj;
        }
      
    }
}