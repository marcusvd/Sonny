using Domain.Entities.BudgetBench;
using Repository.Contracts;
using System.Threading.Tasks;

namespace Repository.Data.Contracts
{
    public interface ISolutionsPricesRepository : IRepository<SolutionPrice>
    {
        void DeleteAsync(int id);
    }


}