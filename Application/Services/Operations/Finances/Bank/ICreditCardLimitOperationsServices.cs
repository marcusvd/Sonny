using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using Application.Services.Operations.Finances.Dtos.Bank;

namespace Application.Services.Operations.Finances.Bank
{
    public interface ICreditCardLimitOperationsServices
    {
        Task<HttpStatusCode> UpdateAsync(int CreditCardLimitOperationId, CreditCardLimitOperationDto entity);
    }
}