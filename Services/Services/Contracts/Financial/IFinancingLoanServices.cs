using System.Threading.Tasks;
using Services.Dto;
using Services.Dto.Financial;

namespace Services.Services.Contracts.Financial
{
    public interface IFinancingLoanServices
    {
        Task<FinancingLoanDto> AddAsync(FinancingLoanDto entityDto);
        Task<FinancingLoanDto[]> GetAllAsync(bool include = false);
    }
}