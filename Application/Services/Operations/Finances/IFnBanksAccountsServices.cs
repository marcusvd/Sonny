using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using Application.Services.Operations.Finances.Dtos;

namespace Application.Services.Operations.Finances
{
    public interface IFnBanksAccountsServices
    {
        Task<List<BankAccountDto>> GetAllAsync(int companyId);
        Task<BankAccountDto> AddAsync(BankAccountDto entityDto);
        Task<BankAccountDto> GetByIdAllIncluded(int fnBankAccountId);
        Task<HttpStatusCode> UpdateAsync(int fnBankAccountId, BankAccountDto entity);
        Task<HttpStatusCode> DeleteFakeAsync(int fnBankAccountId);
    }
}