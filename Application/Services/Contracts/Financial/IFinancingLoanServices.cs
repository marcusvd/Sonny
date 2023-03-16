using System.Threading.Tasks;
using Application.Dto.Financial;

namespace Application.Services.Contracts.Financial
{
    public interface IFinancingLoanServices
    {
        Task<FinancingLoanDto> AddAsync(FinancingLoanDto entityDto);
        Task<FinancingLoanDto[]> GetAllAsync();
    }
}