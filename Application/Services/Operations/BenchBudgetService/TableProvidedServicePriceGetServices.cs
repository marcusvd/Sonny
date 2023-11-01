using System;
using System.Threading.Tasks;
using AutoMapper;
using UnitOfWork.Persistence.Operations;
using Application.Services.Operations.BenchBudgetService.Dtos;
using Application.Exceptions;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Application.Services.Operations.BenchBudgetService
{
    public class TableProvidedServicePriceGetServices : ITableProvidedServicePriceGetServices
    {
        private readonly IMapper _MAP;
        private readonly IUnitOfWork _GENERIC_REPO;
        public TableProvidedServicePriceGetServices(
                        IMapper MAP,
                        IUnitOfWork GENERIC_REPO)
        {
            _MAP = MAP;
            _GENERIC_REPO = GENERIC_REPO;
        }

        public async Task<List<TableProvidedServicePriceDto>> GetAllAsync(int companyId)
        {
            var fromDb = await _GENERIC_REPO.TableProvidedServicesPrices.Get(
                x => x.CompanyId == companyId,
                null,
                selector => selector).ToListAsync();
           
            if (fromDb == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);
            
            var toReturnView = _MAP.Map<List<TableProvidedServicePriceDto>>(fromDb);

            return toReturnView;
        }
    }
}
