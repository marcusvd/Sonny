using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using Application.Services.Operations.Finances.Dtos.CashWithdrawnExpenses;
using Application.Services.Operations.Finances.Dtos.VariableDebitExpenses;

namespace Application.Services.Operations.Finances.VariablesDebitsExpenses
{
    public interface ICashWithdrawnExpensesServices
    {
        Task<HttpStatusCode> AddAsync(CashWithdrawnExpenseDto entityDto);
        Task<List<CashWithdrawnExpenseDto>> GetAllAsync(int companyId);
        Task<CashWithdrawnExpenseDto> GetByIdFull(int id);
        Task<HttpStatusCode> EditAsync(int id, CashWithdrawnExpenseDto entityDto);
    }
}