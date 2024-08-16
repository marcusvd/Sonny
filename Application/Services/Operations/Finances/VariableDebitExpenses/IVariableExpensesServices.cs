using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Services.Operations.Finances.Dtos;

namespace Application.Services.Operations.Finances.VariableDebitExpenses
{
    public interface IVariableExpensesServices
    {
        Task<VariableExpensesDto> AddAsync(VariableExpensesDto entityDto);
        Task<List<VariableExpensesDto>> GetAllAsync(int companyId);
    }
}