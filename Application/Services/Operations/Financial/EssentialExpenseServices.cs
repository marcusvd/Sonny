using System.Threading.Tasks;
using AutoMapper;
using UnitOfWork.Persistence.Contracts;
using Domain.Entities.Financial;
using Application.Dto.Financial;
using Application.Services.Contracts.Financial;
using System;

namespace Application.Services.Operations.Financial
{
    public class EssentialExpenseServices : IEssentialExpenseServices
    {
        private readonly IMapper _MAP;
        private readonly IUnitOfWork _GENERIC_REPO;
        public EssentialExpenseServices(
                         IUnitOfWork GENERIC_REPO,
                         IMapper MAP
                        )
        {
            _MAP = MAP;
            _GENERIC_REPO = GENERIC_REPO;
        }
        public async Task<EssentialExpenseDto> AddAsync(EssentialExpenseDto entityDto)
        {
            if (entityDto == null) throw new Exception("O objeto era nulo.");

            EssentialExpense entityToDb = _MAP.Map<EssentialExpense>(entityDto);

            _GENERIC_REPO.EssentialsExpenses.AddAsync(entityToDb);

            await _GENERIC_REPO.save();

            return _MAP.Map<EssentialExpenseDto>(entityToDb);
        }
    }

}