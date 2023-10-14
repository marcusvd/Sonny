using System;
using System.Threading.Tasks;
using AutoMapper;
using UnitOfWork.Persistence.Contracts;
using Application.Services.Operations.BenchBudgetService.Dtos;
using Domain.Entities.ServicesBench;
using Application.Exceptions;
using Application.Services.Operations.BenchBudgetService.BusinessRulesValidation;
using System.Collections.Generic;

namespace Application.Services.Operations.BenchBudgetService
{
    public class TableProvidedServicePriceGetServices : ITableProvidedServicePriceGetServices
    {
        private readonly IMapper _MAP;
        private readonly IUnitOfWork _GENERIC_REPO;
        public TableProvidedServicePriceGetServices(
                        IMapper MAP,
                        IUnitOfWork GENERIC_REPO
 )
        {
            _MAP = MAP;
            _GENERIC_REPO = GENERIC_REPO;
        }

        public async Task<List<TableProvidedServicePriceDto>> GetAllAsync(int companyId)
        {
            var FromDb = await _GENERIC_REPO.TableProvidedServicesPrices.GetAllByCompanyIdAsync(x => x.CompanyId == companyId);
           
            if (FromDb == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);
            
            var toReturnView = _MAP.Map<List<TableProvidedServicePriceDto>>(FromDb);

            return toReturnView;
        }
    }
}
