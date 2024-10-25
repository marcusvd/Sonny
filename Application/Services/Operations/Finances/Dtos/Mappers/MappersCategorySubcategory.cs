using Application.Services.Operations.Finances.Dtos.CategorySubcategoryExpenses;
using Application.Services.Operations.Finances.Dtos.Enums;
using Domain.Entities.Finances.CategorySubcategoryExpenses;
using Domain.Entities.Finances.Enums;
using Application.Services.Shared.Mapper;

namespace Application.Services.Operations.Finances.Dtos.Mappers
{
    public partial class FinancialObjectMapperServices
    {
        public CategoryExpenseDto CategoryExpenseMapper(CategoryExpense entity)
        {
            if (entity == null) return null;

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
            if (entity == null) return null;

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