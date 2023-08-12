using System.Threading.Tasks;
using Application.Services.Operations.Finances.Dtos;

namespace Application.Services.Operations.Finances
{
    public interface IFinancialNotPredictableServices
    {
        Task<FinancialNotPredictableDto> AddAsync(FinancialNotPredictableDto entityDto);
    }
}