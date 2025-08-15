using System.Collections.Generic;
using Application.Services.Operations.Finances.Dtos.CashWithdrawnExpenses;
using Application.Services.Shared.Dtos.Mappers;
using Domain.Entities.Finances.VariablesDebitsExpenses;


namespace Application.Services.Operations.Finances.Dtos.Mappers
{
    public partial class FinancialObjectMapperServices : CommonObjectMapper, IFinancialObjectMapperServices
    {
        public List<CashWithdrawnExpenseDto> CashWithdrawnExpenseListMake(List<CashWithdrawnExpense> list)
        {
            if (list == null) return null;

            var toReturn = new List<CashWithdrawnExpenseDto>();

            list.ForEach(x =>
            {
                toReturn.Add(CashWithdrawnExpenseMapper(x));

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
        public CashWithdrawnExpenseDto CashWithdrawnExpenseMapper(CashWithdrawnExpense entity)
        {
            if (entity == null) return null;

            var obj = new CashWithdrawnExpenseDto()
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
                BankAccount = BankAccountMapper(entity.BankAccount),
                WithdrawnOn = entity.WithdrawnOn,
                Price = entity.Price,
                Document = entity.Document,
                Place = entity.Place,
                Description = entity.Description,
            };

            return obj;
        }
        public CashWithdrawnExpense CashWithdrawnExpenseMapper(CashWithdrawnExpenseDto entity)
        {
            if (entity == null) return null;

            var obj = new CashWithdrawnExpense()
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
                Price = entity.Price,
                WithdrawnOn = entity.WithdrawnOn,
                Document = entity.Document,
                Place = entity.Place,
                Description = entity.Description
            };

            return obj;
        }




        public CashWithdrawnExpense VariableUpdateMapper(CashWithdrawnExpenseDto dto, CashWithdrawnExpense db)
        {
            if (dto == null || db == null) return null;
            db.Id = dto.Id;
            db.Place = dto.Place;
            db.UserId = dto.UserId;
            db.CompanyId = dto.CompanyId;
            db.Deleted = dto.Deleted;
            db.Registered = dto.Registered;
            db.Name = dto.Name;
            db.CategoryExpenseId = dto.CategoryExpenseId;
            db.SubcategoryExpenseId = dto.SubcategoryExpenseId;
            db.BankAccountId = dto.BankAccountId;
            db.Price = dto.Price;
            db.WithdrawnOn = dto.WithdrawnOn;
            db.Document = dto.Document;
            db.Description = dto.Description;
            return db;
        }




    }
}