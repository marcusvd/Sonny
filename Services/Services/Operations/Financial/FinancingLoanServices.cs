using System.Threading.Tasks;
using AutoMapper;
using UnitOfWork.Persistence.Contracts;
using System.Collections.Generic;
using Services.Dto.Financial;
using Domain.Entities.Financial;
using Services.Services.Contracts.Financial;

namespace Services.Services.Operations.Financial
{
    public class FinancingLoanServices : IFinancingLoanServices
    {
        private readonly IMapper _MAP;
        private readonly IUnitOfWork _GENERIC_REPO;
        public FinancingLoanServices(
            IUnitOfWork GENERIC_REPO,
            IMapper MAP
            )
        {
            _GENERIC_REPO = GENERIC_REPO;
            _MAP = MAP;
        }
        public async Task<FinancingLoanDto> AddAsync(FinancingLoanDto entityDto)
        {
            var EntityToDb = _MAP.Map<FinancingLoan>(entityDto);

            _GENERIC_REPO.FinancingsLoans.AddAsync(EntityToDb);

            if (await _GENERIC_REPO.save())
            {
                FinancingLoan EntityFromDb = await _GENERIC_REPO.FinancingsLoans.GetByIdAsync(_id => _id.Id == EntityToDb.Id);

                return _MAP.Map<FinancingLoanDto>(EntityFromDb);
            }

            return entityDto;
        }
        public async Task<FinancingLoanDto[]> GetAllAsync(bool include = false)
        {
            List<FinancingLoan> EntityFromDb = await _GENERIC_REPO.FinancingsLoans.GetAllAsync();

            if (EntityFromDb == null) return null;

            return _MAP.Map<FinancingLoanDto[]>(EntityFromDb);
        }
    }
}