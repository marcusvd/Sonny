using System.Collections.Generic;
using System.Threading.Tasks;
using Services.Dto;
using Services.Dto.ServiceBudgetBench;

namespace Services.Services.Contracts
{
    public interface ISolutionsPricesServices
    {
        Task<bool> DeleteAsync(int id);
    }
}