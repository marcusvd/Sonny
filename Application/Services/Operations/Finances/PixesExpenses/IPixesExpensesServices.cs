using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using Application.Services.Operations.Finances.Dtos.PixExpenses;
using Application.Services.Operations.Finances.Dtos.VariableDebitExpenses;

namespace Application.Services.Operations.Finances.PixesExpenses
{
    public interface IPixesExpensesServices
    {
        Task<HttpStatusCode> AddAsync(PixExpenseDto entityDto);
    }
}