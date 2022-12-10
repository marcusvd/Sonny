using System.Threading.Tasks;

namespace Services.Services.BudgetBench.Contracts
{
    public interface ISolutionsPricesServices
    {
        Task<bool> DeleteAsync(int id);
    }
}