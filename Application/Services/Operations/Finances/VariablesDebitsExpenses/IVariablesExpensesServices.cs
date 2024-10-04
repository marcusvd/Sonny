using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using Application.Services.Operations.Finances.Dtos.VariableDebitExpenses;

namespace Application.Services.Operations.Finances.VariablesDebitsExpenses
{
    public interface IVariablesExpensesServices
    {
        Task<HttpStatusCode> AddAsync(VariableExpenseDto entityDto);
        Task<List<VariableExpenseDto>> GetAllAsync(int companyId);
    }
}