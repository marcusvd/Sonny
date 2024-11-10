using Application.Services.Operations.Finances.Dtos.CategorySubcategoryExpenses;
using Application.Services.Operations.Finances.Dtos.Enums;
using Domain.Entities.Finances.CategorySubcategoryExpenses;
using Domain.Entities.Finances.Enums;
using Application.Services.Shared.Dtos.Mappers;
using System.Collections.Generic;

namespace Application.Services.Operations.Finances.Dtos.Mappers
{
    public partial class FinancialObjectMapperServices : CommonObjectMapper, IFinancialObjectMapperServices
    {
        public List<CategoryExpenseDto> CategoryExpensesListMake(List<CategoryExpense> list)
        {
            if (list == null) return null;

            var toReturn = new List<CategoryExpenseDto>();

            list.ForEach(x =>
            {
                toReturn.Add(CategoryExpenseMapper(x));
            });


            return toReturn;
        }
        public List<CategoryExpense> CategoryExpensesListMake(List<CategoryExpenseDto> list)
        {
            if (list == null) return null;

            var toReturn = new List<CategoryExpense>();

            list.ForEach(x =>
            {
                toReturn.Add(CategoryExpenseMapper(x));
            });


            return toReturn;
        }
        public List<SubcategoryExpenseDto> SubcategoryExpensesListMake(List<SubcategoryExpense> list)
        {
            if (list == null) return null;

            var toReturn = new List<SubcategoryExpenseDto>();

            list.ForEach(x =>
            {
                toReturn.Add(SubcategoryExpenseMapper(x));
            });


            return toReturn;
        }
        public List<SubcategoryExpense> SubcategoryExpensesListMake(List<SubcategoryExpenseDto> list)
        {
            if (list == null) return null;

            var toReturn = new List<SubcategoryExpense>();

            list.ForEach(x =>
            {
                toReturn.Add(SubcategoryExpenseMapper(x));
            });


            return toReturn;
        }
        public CategoryExpenseDto CategoryExpenseMapper(CategoryExpense entity)
        {
            if (entity == null) return null;

            var catExpense = new CategoryExpenseDto()
            {
                Id = entity.Id,
                CompanyId = entity.CompanyId,
                Name = entity.Name,
                SubcategoriesExpenses = SubcategoryExpensesListMake(entity.SubcategoriesExpenses)
            };
            return catExpense;
        }
        public CategoryExpense CategoryExpenseMapper(CategoryExpenseDto entity)
        {
            if (entity == null) return null;

            var catExpense = new CategoryExpense()
            {
                Id = entity.Id,
                CompanyId = entity.CompanyId,
                Name = entity.Name,
                SubcategoriesExpenses = SubcategoryExpensesListMake(entity.SubcategoriesExpenses)
            };
            return catExpense;
        }
        public SubcategoryExpenseDto SubcategoryExpenseMapper(SubcategoryExpense entity)
        {
            if (entity == null) return null;

            var obj = new SubcategoryExpenseDto()
            {
                Id = entity.Id,
                CategoryExpenseId = entity.CategoryExpenseId,
                Name = entity.Name,
                PayCycle = (PayCycleEnumDto)entity.PayCycle,
            };
            return obj;
        }
        public SubcategoryExpense SubcategoryExpenseMapper(SubcategoryExpenseDto entity)
        {
            if (entity == null) return null;

            var subCatExpense = new SubcategoryExpense()
            {
                Id = entity.Id,
                CategoryExpenseId = entity.CategoryExpenseId,
                Name = entity.Name,
                PayCycle = (PayCycleEnum)entity.PayCycle,
            };
            return subCatExpense;
        }
    }
}