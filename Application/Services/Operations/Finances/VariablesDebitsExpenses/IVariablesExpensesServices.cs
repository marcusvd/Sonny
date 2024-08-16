using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Services.Operations.Finances.Dtos;

namespace Application.Services.Operations.Finances.VariablesDebitsExpenses
{
    public interface IVariablesExpensesServices
    {
        Task<VariableExpenseDto> AddAsync(VariableExpenseDto entityDto);
        Task<List<VariableExpenseDto>> GetAllAsync(int companyId);
    }
}