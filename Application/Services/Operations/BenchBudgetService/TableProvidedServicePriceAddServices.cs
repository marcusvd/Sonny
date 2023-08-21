using System;
using System.Threading.Tasks;
using AutoMapper;
using UnitOfWork.Persistence.Contracts;
using Application.Services.Operations.BenchBudgetService.Dtos;
using Domain.Entities.ServicesBench;
using Application.Exceptions;
using Application.Services.Operations.BenchBudgetService.BusinessRulesValidation;

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

        public async Task<TableProvidedServicePriceDto> AddAsync(TableProvidedServicePriceDto entityDto)
        {
            if (entityDto == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);

            TableProvidedServicePrice entityConvertedToDb = _MAP.Map<TableProvidedServicePrice>(entityDto);


            _GENERIC_REPO.TableProvidedServicesPrices.AddAsync(entityConvertedToDb);

            if (await _GENERIC_REPO.save())
            {
                var entityFromDb = _GENERIC_REPO.BudgetsServices.GetByIdAsync(x => x.Id == entityDto.Id);
                return _MAP.Map<TableProvidedServicePriceDto>(entityConvertedToDb);
            }

            return entityDto;
        }

    }
}
