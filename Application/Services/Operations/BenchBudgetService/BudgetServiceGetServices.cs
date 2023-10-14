using System.Threading.Tasks;
using Application.Services.Operations.BenchBudgetService.Dtos;
using AutoMapper;
using UnitOfWork.Persistence.Contracts;
using System.Linq;
using Domain.Entities.ServicesBench.Enums;
using System;
using Application.Exceptions;
using System.Collections.Generic;
using Pagination.Models;
using Application.Services.Operations.BenchBudgetService.Dtos.Enums;

namespace Application.Services.Operations.BenchBudgetService
{
    public class BudgetServiceGetServices : IBudgetServiceGetServices
    {
        private readonly IMapper _MAP;
        private readonly IUnitOfWork _GENERIC_REPO;

        public BudgetServiceGetServices(IMapper MAP, IUnitOfWork GENERIC_REPO)
        {
            _MAP = MAP;
            _GENERIC_REPO = GENERIC_REPO;

        }
        public async Task<PagedList<BudgetServiceDto>> GetAllPagedNoFinished(Params parameters)
        {
            var FromDb = await _GENERIC_REPO.BudgetsServices.GetPaginatedCustomerInclude(parameters);

            if (FromDb == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);

            List<BudgetServiceDto> ViewDto = _MAP.Map<List<BudgetServiceDto>>(FromDb);

            ViewDto = ViewDto.Where(x => x.StatusService != StatusServiceEnumDto.Finished).ToList();

            var pagedToReturn = new PagedList<BudgetServiceDto>()
            {
                CurrentPg = FromDb.CurrentPg,
                TotalPgs = FromDb.TotalPgs,
                PgSize = FromDb.PgSize,
                TotalCount = FromDb.TotalCount,
                HasPrevious = FromDb.HasPrevious,
                HasNext = FromDb.HasNext,
                EntitiesToShow = ViewDto
            };

            return pagedToReturn;
        }


        public async Task<int> GetCountByCompanyIdAsync(int companyId)
        {
            var FromDb = _GENERIC_REPO.BudgetsServices.GetCountByCompanyIdAsync(x => x.CompanyId == companyId);

            if (FromDb == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);

            return await FromDb;
        }

        public async Task<BudgetServiceDto> GetByCompanyIdBybudgetServiceId(int companyId, int budgetServiceId)
        {
            
            var FromDb = await _GENERIC_REPO.BudgetsServices.GetByCompanyIdBybudgetServiceId(companyId, budgetServiceId);
            
            if (FromDb == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);
            
            var toReturnView = _MAP.Map<BudgetServiceDto>(FromDb);
            
            return toReturnView;

        }

    }
}