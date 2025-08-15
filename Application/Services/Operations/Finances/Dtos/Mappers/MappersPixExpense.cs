using System.Collections.Generic;


using Application.Services.Operations.Finances.Dtos.PixExpenses;
using Application.Services.Shared.Dtos.Mappers;
using Domain.Entities.Finances.PixExpenses;

namespace Application.Services.Operations.Finances.Dtos.Mappers
{
    public partial class FinancialObjectMapperServices : CommonObjectMapper, IFinancialObjectMapperServices
    {
        public List<PixExpenseDto> PixExpensesListMake(List<PixExpense> list)
        {
            if (list == null) return null;

            var toReturn = new List<PixExpenseDto>();

            list.ForEach(x =>
            {
                toReturn.Add(PixExpensesMapper(x));
            });


            return toReturn;
        }
        public List<PixExpense> PixExpensesListMake(List<PixExpenseDto> list)
        {
            if (list == null) return null;

            var toReturn = new List<PixExpense>();

            list.ForEach(x =>
            {
                toReturn.Add(PixExpensesMapper(x));
            });


            return toReturn;
        }
        public PixExpenseDto PixExpensesMapper(PixExpense entity)
        {
            if (entity == null) return null;

            var obj = new PixExpenseDto()
            {
                Id = entity.Id,
                UserId = entity.UserId,
                CompanyId = entity.CompanyId,
                Deleted = entity.Deleted,
                Registered = entity.Registered,
                PixOut = PixMapper(entity.PixOut),
                PixOutId = entity.PixOutId,
                BenefitedName = entity.BenefitedName,
                BenefitedKey = entity.BenefitedKey,
                Price = entity.Price,
                Interest = entity.Interest,
                ExpenseDay = entity.ExpenseDay,
                MonthlyFixedExpenseId = entity.MonthlyFixedExpenseId,
                YearlyFixedExpenseId = entity.YearlyFixedExpenseId,
                CashWithdrawnExpenseId = entity.CashWithdrawnExpenseId,
                FinancingAndLoanExpenseId = entity.FinancingAndLoanExpenseId,
                Description = entity.Description,
            };

            return obj;
        }
        public PixExpense PixExpensesMapper(PixExpenseDto entity)
        {
            if (entity == null) return null;

            var obj = new PixExpense()
            {
                Id = entity.Id,
                UserId = entity.UserId,
                CompanyId = entity.CompanyId,
                Deleted = entity.Deleted,
                Registered = entity.Registered,
                PixOutId = entity.PixOutId,
                BenefitedName = entity.BenefitedName,
                BenefitedKey = entity.BenefitedKey,
                Price = entity.Price,
                Interest = entity.Interest,
                ExpenseDay = entity.ExpenseDay,
                MonthlyFixedExpenseId = entity.MonthlyFixedExpenseId,
                YearlyFixedExpenseId = entity.YearlyFixedExpenseId,
                CashWithdrawnExpenseId = entity.CashWithdrawnExpenseId,
                FinancingAndLoanExpenseId = entity.FinancingAndLoanExpenseId,
                Description = entity.Description,
            };

            return obj;
        }

    }
}