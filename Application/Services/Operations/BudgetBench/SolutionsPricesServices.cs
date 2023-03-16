using System.Threading.Tasks;
using AutoMapper;
using Application.Services.BudgetBench.Contracts;
using UnitOfWork.Persistence.Contracts;


namespace Application.Services.Operations.ServiceBudgetBench
{
    public class SolutionsPricesServices : ISolutionsPricesServices
    {

        private readonly IMapper _MAP;

        private readonly IUnitOfWork _GENERIC_REPO;
        public SolutionsPricesServices(
                        IMapper MAP,
                        IUnitOfWork GENERIC_REPO
 )
        {
            _MAP = MAP;
            _GENERIC_REPO = GENERIC_REPO;
        }

        public Task<bool> DeleteAsync(int id)
        {
            if (id == 0) return null;
            _GENERIC_REPO.SolutionsPrices.DeleteAsync(id);
            return _GENERIC_REPO.save();
        }
    }
}