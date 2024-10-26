using System.Threading.Tasks;
using AutoMapper;
using UnitOfWork.Persistence.Operations;
using System.Collections.Generic;
using System;
using Application.Exceptions;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Net;
using Application.Services.Operations.Finances.Dtos.CategorySubcategoryExpenses;
using Domain.Entities.Finances.CategorySubcategoryExpenses;
using Application.Services.Operations.Finances.Dtos;

namespace Application.Services.Operations.Finances.CategorySubcategoryExpenses
{
    public class CategoryExpensesServices : ICategoryExpensesServices
    {
        private readonly IFinancialObjectMapperServices _IObjectMapperServices;
        private readonly IUnitOfWork _GENERIC_REPO;

        public CategoryExpensesServices(IUnitOfWork GENERIC_REPO,
           IFinancialObjectMapperServices IObjectMapperServices)
        {

            _GENERIC_REPO = GENERIC_REPO;
            _IObjectMapperServices = IObjectMapperServices;
        }
        public async Task<HttpStatusCode> AddAsync(CategoryExpenseDto entityDto)
        {
            if (entityDto == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);


            var toDb = _IObjectMapperServices.CategoryExpenseMapper(entityDto);

            _GENERIC_REPO.CategoriesExpenses.Add(toDb);

            if (await _GENERIC_REPO.save())
                return HttpStatusCode.Created;

            return HttpStatusCode.BadRequest;
        }

        public async Task<List<CategoryExpenseDto>> GetAllAsync(int companyId)
        {
            var fromDb = await _GENERIC_REPO.CategoriesExpenses.Get(
             predicate => predicate.CompanyId == companyId && predicate.Deleted == DateTime.MinValue,
             toInclude => toInclude.Include(x => x.SubcategoriesExpenses.Where(x => x.Deleted == DateTime.MinValue)),
             selector => selector
             ).ToListAsync();

            if (fromDb == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);

            var toViewDto = _IObjectMapperServices.CategoryExpensesListMake(fromDb);

            return toViewDto;
        }

        public async Task<HttpStatusCode> UpdateAsync(int categoryExpensesId, CategoryExpenseDto entity)
        {
            if (entity == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);
            if (categoryExpensesId != entity.Id) throw new GlobalServicesException(GlobalErrorsMessagesException.IdIsDifferentFromEntityUpdate);

            var fromDb = await _GENERIC_REPO.CategoriesExpenses.GetById(
                x => x.Id == categoryExpensesId,
                null,
                selector => selector
                );

            var updated = _IObjectMapperServices.CategoryExpenseMapper(entity);

            _GENERIC_REPO.CategoriesExpenses.Update(updated);

            var result = await _GENERIC_REPO.save();

            if (result)
                return HttpStatusCode.OK;

            return HttpStatusCode.BadRequest;
        }
        public async Task<HttpStatusCode> DeleteFakeAsync(int categoryExpensesId)
        {

            var fromDb = await _GENERIC_REPO.CategoriesExpenses.GetById(
                x => x.Id == categoryExpensesId,
                toInclude => toInclude.AsNoTracking().Include(x => x.SubcategoriesExpenses),
                selector => selector
                );

            fromDb.Deleted = DateTime.MinValue;

            fromDb.SubcategoriesExpenses.ForEach(x => x.Deleted = DateTime.MinValue);

            _GENERIC_REPO.CategoriesExpenses.Update(fromDb);

            var result = await _GENERIC_REPO.save();

            if (result)
                return HttpStatusCode.OK;

            return HttpStatusCode.BadRequest;
        }

    }
}