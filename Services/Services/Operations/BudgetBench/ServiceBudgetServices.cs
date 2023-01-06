using System;
using System.Threading.Tasks;
using AutoMapper;
using Services.Services.Contracts.BudgetBench;
using UnitOfWork.Persistence.Contracts;
using System.Collections.Generic;
using Services.Dto.ServiceBudgetBench;
using Domain.Entities.BudgetBench;


namespace Services.Services.Operations
{
    public class ServiceBudgetServices : IServiceBudgetServices
    {

        private readonly IMapper _MAP;
        private readonly IUnitOfWork _GENERIC_REPO;
        public ServiceBudgetServices(
                        IMapper MAP,
                        IUnitOfWork GENERIC_REPO
 )
        {
            _MAP = MAP;
            _GENERIC_REPO = GENERIC_REPO;
        }


        public async Task<ServiceBudgetDto> AddAsync(ServiceBudgetDto entityDto)
        {
            if (entityDto == null) throw new Exception("Objeto era nulo");

            ServiceBudget entityConvertedToDb = _MAP.Map<ServiceBudget>(entityDto);

            _GENERIC_REPO.ServiceBudget.AddAsync(entityConvertedToDb);

            if (await _GENERIC_REPO.save())
            {
               // var entityFromDb = _GENERIC_REPO.ServiceBudget.GetByIdAsync(x => x.Id == entityDto.Id);
                return _MAP.Map<ServiceBudgetDto>(entityConvertedToDb);
            }
            
            return entityDto;
        }

        public async Task<List<ServiceBudgetDto>> GetAllAsyncIncluded()
        {
            List<ServiceBudget> EntitiesFromDb = await _GENERIC_REPO.ServiceBudget.GetAllAsyncIncluded();

            if (EntitiesFromDb == null) throw new Exception("O Objeto era nulo.");

            return _MAP.Map<List<ServiceBudgetDto>>(EntitiesFromDb);
        }
        public async Task<ServiceBudgetDto> GetByIdAsyncIncluded(int id)
        {
            var EntityFromDb = await _GENERIC_REPO.ServiceBudget.GetByIdAsyncIncluded(id);

            if (EntityFromDb == null) throw new Exception("O Objeto era nulo.");

            return _MAP.Map<ServiceBudgetDto>(EntityFromDb);
        }
        public async Task<ServiceBudgetDto> Update(ServiceBudgetDto entityDto)
        {

            var EntityFromDb = await _GENERIC_REPO.ServiceBudget.GetByIdAsyncIncluded(entityDto.Id);
         
            if (EntityFromDb == null) throw new Exception("Objeto era nulo.");

            var EntityConvertedToUpdate = _MAP.Map<ServiceBudget>(entityDto);

            var EntityToSave = _MAP.Map(EntityConvertedToUpdate, EntityFromDb);

            _GENERIC_REPO.ServiceBudget.Update(EntityToSave);

            if (await _GENERIC_REPO.save())
            {
                var entityFromDb = await _GENERIC_REPO.ServiceBudget.GetByIdAsync(_id => _id.Id == entityDto.Id);

                return _MAP.Map<ServiceBudgetDto>(entityFromDb);
            }

            return entityDto;

        }
    }
}
