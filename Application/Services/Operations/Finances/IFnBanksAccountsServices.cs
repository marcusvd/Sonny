using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Services.Operations.Finances.Dtos;

namespace Application.Services.Operations.Finances
{
    public interface IFnBanksAccountsServices
    {
        Task<BankAccountDto> AddAsync(BankAccountDto entityDto);
        Task<List<BankAccountDto>> GetAllAsync(int companyId);
    }
}