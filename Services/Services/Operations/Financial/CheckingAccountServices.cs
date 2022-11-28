using System.Threading.Tasks;
using AutoMapper;
using UnitOfWork.Persistence.Contracts;
using System.Collections.Generic;
using Services.Dto.Financial;
using Domain.Entities.Financial;
using Services.Services.Contracts.Financial;

namespace Services.Services.Operations.Financial
{
    public class CheckingAccountServices : ICheckingAccountServices
    {
        private readonly IMapper _MAP;
        private readonly IUnitOfWork _GENERIC_REPO;
        public CheckingAccountServices(
            IUnitOfWork GENERIC_REPO,
            IMapper MAP
            )
        {
            _GENERIC_REPO = GENERIC_REPO;
            _MAP = MAP;
        }
        public async Task<CheckingAccountDto> AddAsync(CheckingAccountDto entityDto)
        {
            var EntityToDb = _MAP.Map<CheckingAccount>(entityDto);

            _GENERIC_REPO.Checkingaccounts.AddAsync(EntityToDb);

            if (await _GENERIC_REPO.save())
            {
                CheckingAccount EntityFromDb = await _GENERIC_REPO.Checkingaccounts.GetByIdAsync(_id => _id.Id == EntityToDb.Id);

                return _MAP.Map<CheckingAccountDto>(EntityFromDb);
            }

            return entityDto;
        }
        public async Task<CheckingAccountDto[]> GetAllAsync(bool include = false)
        {
            List<CheckingAccount> EntityFromDb = await _GENERIC_REPO.Checkingaccounts.GetAllAsync();

            if (EntityFromDb == null) return null;

            return _MAP.Map<CheckingAccountDto[]>(EntityFromDb);
        }
    }
}