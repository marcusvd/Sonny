using System.Threading.Tasks;
using AutoMapper;
using UnitOfWork.Persistence.Operations;
using System.Collections.Generic;
using System;
using Application.Services.Operations.Finances.Dtos;
using Domain.Entities.Finances;
using Application.Exceptions;
using Microsoft.EntityFrameworkCore;
using Pagination.Models;
using System.Linq;
using System.Net;

namespace Application.Services.Operations.Finances
{
    public class CategoryExpensesServices : ICategoryExpensesServices
    {
        private readonly IMapper _MAP;
        private readonly IUnitOfWork _GENERIC_REPO;

        public CategoryExpensesServices(IUnitOfWork GENERIC_REPO,
            IMapper MAP
            )
        {

            _GENERIC_REPO = GENERIC_REPO;
            _MAP = MAP;
        }
        public async Task<HttpStatusCode> AddAsync(CategoryExpensesDto entityDto)
        {
            if (entityDto == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);

            var toDb = _MAP.Map<CategoryExpenses>(entityDto);

            _GENERIC_REPO.CategoriesExpenses.Add(toDb);

            if (await _GENERIC_REPO.save())
                return HttpStatusCode.Created;

            return HttpStatusCode.BadRequest;
        }

        public async Task<List<CategoryExpensesDto>> GetAllAsync(int companyId)
        {
            var fromDb = await _GENERIC_REPO.CategoriesExpenses.Get(
             predicate => predicate.CompanyId == companyId && predicate.Deleted != true,
             toInclude => toInclude.Include(x => x.SubcategoriesExpenses),
             selector => selector
             ).ToListAsync();

            if (fromDb == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);

            var toViewDto = _MAP.Map<List<CategoryExpensesDto>>(fromDb);

            return toViewDto;
        }

        public Task<PagedList<CategoryExpensesDto>> GetAllPagedAsync(Params parameters)
        {
            throw new NotImplementedException();
        }

        public Task<CategoryExpensesDto> GetByIdAllIncluded(int monthFixedExpensesId)
        {
            throw new NotImplementedException();
        }
    }
}