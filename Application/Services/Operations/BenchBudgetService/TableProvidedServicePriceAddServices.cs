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
    public class TableProvidedServicePriceAddServices : ITableProvidedServicePriceAddServices
    {
        private readonly IMapper _MAP;
        private readonly IUnitOfWork _GENERIC_REPO;
        public TableProvidedServicePriceAddServices(
                        IMapper MAP,
                        IUnitOfWork GENERIC_REPO
 )
        {
            _MAP = MAP;
            _GENERIC_REPO = GENERIC_REPO;
        }

        public async Task<KeyValuePair<String, int>> AddRangeAsync(List<TableProvidedServicePriceDto> entities)
        {
            if (entities == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);

            List<TableProvidedServicePrice> entityConvertedToDb = _MAP.Map<List<TableProvidedServicePrice>>(entities);


            _GENERIC_REPO.TableProvidedServicesPrices.AddRangeAsync(entityConvertedToDb);

            if (await _GENERIC_REPO.save())
            {

                return new KeyValuePair<string, int>("Succeeded Added.", 200);
            }

            return new KeyValuePair<string, int>("Fail when adding.", 400);
        }

    }
}
