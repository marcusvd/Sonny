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
    public class YearlyFixedExpensesFillersServices : IYearlyFixedExpensesFillersServices
    {
        private readonly IMapper _MAP;
        private readonly IUnitOfWork _GENERIC_REPO;

        public YearlyFixedExpensesFillersServices(IUnitOfWork GENERIC_REPO,
            IMapper MAP
            )
        {

            _GENERIC_REPO = GENERIC_REPO;
            _MAP = MAP;
        }
        public Task<HttpStatusCode> AddAsync(YearlyFixedExpensesFillersDto entityDto)
        {
            throw new NotImplementedException();
        }

        public async Task<List<YearlyFixedExpensesFillersDto>> GetAllAsync(int companyId)
        {
            var fromDb = await _GENERIC_REPO.YearlyFixedExpensesFillers.Get(
             predicate => predicate.CompanyId == companyId && predicate.Deleted != true,
            //   toInclude => toInclude.Include(x => x.MonthFixedExpenses),
            null,
             selector => selector
             ).ToListAsync();

            if (fromDb == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);

            var toViewDto = _MAP.Map<List<YearlyFixedExpensesFillersDto>>(fromDb);

            return toViewDto;
        }

        public Task<PagedList<YearlyFixedExpensesFillersDto>> GetAllPagedAsync(Params parameters)
        {
            throw new NotImplementedException();
        }

        public Task<YearlyFixedExpensesFillersDto> GetByIdAllIncluded(int monthFixedExpensesId)
        {
            throw new NotImplementedException();
        }
    }
}