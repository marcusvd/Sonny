using System.Threading.Tasks;
using Application.Services.Operations.Finances.Dtos;

namespace Application.Services.Operations.Finances
{
    public interface IFinancialBankAccountServices
    {
        Task<FinancialBankAccountDto> AddAsync(FinancialBankAccountDto entityDto);
    }
}