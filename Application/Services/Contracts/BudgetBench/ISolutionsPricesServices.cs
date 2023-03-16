using System.Threading.Tasks;

namespace Application.Services.BudgetBench.Contracts
{
    public interface ISolutionsPricesServices
    {
        Task<bool> DeleteAsync(int id);
    }
}