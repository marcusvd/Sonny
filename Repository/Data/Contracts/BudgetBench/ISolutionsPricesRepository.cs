using Domain.Entities.BudgetBench;
using Repository.Contracts;

namespace Repository.Data.Contracts
{
    public interface ISolutionsPricesRepository : IRepository<SolutionPrice>
    {
        void DeleteAsync(int id);
    }


}