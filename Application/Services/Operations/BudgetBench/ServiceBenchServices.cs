using System;
using System.Threading.Tasks;
using AutoMapper;
using UnitOfWork.Persistence.Contracts;
using System.Collections.Generic;
using Application.Dto.ServiceBudgetBench;
using Domain.Entities.BudgetBench;
using Application.Services.Contracts.BudgetBench;

namespace Application.Services.Operations.BudgetBench
{
    public class ServiceBenchServices : IServiceBenchServices
    {
        private readonly IMapper _MAP;
        private readonly IUnitOfWork _GENERIC_REPO;
        public ServiceBenchServices(
                        IMapper MAP,
                        IUnitOfWork GENERIC_REPO
 )
        {
            _MAP = MAP;
            _GENERIC_REPO = GENERIC_REPO;
        }

        public async Task<ServiceBenchDto> AddAsync(ServiceBenchDto entityDto)
        {

            if (entityDto == null) throw new Exception("O objeto era nulo.");

            ServiceBench entityToDb = _MAP.Map<ServiceBench>(entityDto);

            entityToDb.DateServiceStarted = DateTime.Now;
            
            _GENERIC_REPO.ServicesBench.AddAsync(entityToDb);

            if (await _GENERIC_REPO.save())
            {
                return _MAP.Map<ServiceBenchDto>(entityToDb);
            }
            return entityDto;
        }

        public async Task<List<ServiceBenchDto>> GetAllAsyncIncluded()
        {
            var entityFromDb = await _GENERIC_REPO.ServicesBench.GetAllAsyncIncluded();

            if (entityFromDb == null) throw new Exception("Objeto era nulo.");

            List<ServiceBenchDto> entityFromDbConverted = _MAP.Map<List<ServiceBenchDto>>(entityFromDb);

            return entityFromDbConverted;
        }
        public async Task<ServiceBenchDto> Update(int id, ServiceBenchDto entityDto)
        {
            if (id == entityDto.Id) throw new Exception("os Ids não coincidem.");

            var entityFromDb = await _GENERIC_REPO.ServicesBench.GetByIdAsync(x => x.Id == entityDto.Id);

            if (entityFromDb == null) throw new Exception("Objeto era nulo.");

            var entityConvertedToDb = _MAP.Map<ServiceBench>(entityDto);

            var entityMergedToUpdate = _MAP.Map(entityConvertedToDb, entityFromDb);

            _GENERIC_REPO.ServicesBench.Update(entityMergedToUpdate);

            if (await _GENERIC_REPO.save())
            {
                return _MAP.Map<ServiceBenchDto>(entityMergedToUpdate);
            }
            return entityDto;
        }
    }
}