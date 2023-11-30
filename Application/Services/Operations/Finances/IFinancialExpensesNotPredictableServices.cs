using System.Threading.Tasks;
using Application.Services.Operations.Finances.Dtos;

namespace Application.Services.Operations.Finances
{
    public interface IFinancialExpensesNotPredictableServices
    {
        Task<FinancialExpensesNotPredictableDto> AddAsync(FinancialExpensesNotPredictableDto entityDto);
    }
}