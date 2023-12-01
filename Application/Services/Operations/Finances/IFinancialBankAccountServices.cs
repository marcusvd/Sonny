using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Services.Operations.Finances.Dtos;

namespace Application.Services.Operations.Finances
{
    public interface IFinancialBankAccountServices
    {
        Task<FinancialBankAccountDto> AddAsync(FinancialBankAccountDto entityDto);
        Task<List<FinancialBankAccountDto>> GetAllAsync(int companyId);
    }
}