using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using Application.Services.Operations.Finances.Dtos.Bank;

namespace Application.Services.Operations.Finances.Bank
{
    public interface IBankAccountsServices
    {
        Task<List<BankAccountDto>> GetAllAsync(int companyId);
        Task<HttpStatusCode> AddAsync(BankAccountDto entityDto);
        Task<BankAccountDto> GetByIdAllIncluded(int fnBankAccountId);
        Task<HttpStatusCode> UpdateAsync(int fnBankAccountId, BankAccountDto entity);
        Task<HttpStatusCode> DeleteFakeAsync(int fnBankAccountId);
    }
}