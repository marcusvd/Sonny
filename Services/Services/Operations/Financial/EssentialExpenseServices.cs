using System.Threading.Tasks;
using AutoMapper;
using UnitOfWork.Persistence.Contracts;
using Domain.Entities.Financial;
using Services.Dto.Financial;
using Services.Services.Contracts.Financial;

namespace Services.Services.Operations.Financial
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
            EssentialExpense entityToDb = _MAP.Map<EssentialExpense>(entityDto);

            _GENERIC_REPO.EssentialsExpenses.AddAsync(entityToDb);

            await _GENERIC_REPO.save();

            return _MAP.Map<EssentialExpenseDto>(entityToDb);
        }
    }

}