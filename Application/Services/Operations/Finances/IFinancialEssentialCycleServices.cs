using System.Threading.Tasks;
using Application.Services.Operations.Finances.Dtos;

namespace Application.Services.Operations.Finances
{
    public interface IFinancialEssentialCycleServices
    {
        Task<FinancialEssentialCycleDto> AddAsync(FinancialEssentialCycleDto entityDto);
    }
}