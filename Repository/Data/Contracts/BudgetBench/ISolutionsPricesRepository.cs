using Domain.Entities.BudgetBench;
using Repository.Data.Operations.Repository;

namespace Repository.Data.Contracts
{
    public interface ISolutionsPricesRepository : IRepository<SolutionPrice>
    {
        void DeleteAsync(int id);
    }


}