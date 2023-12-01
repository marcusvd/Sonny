using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Services.Operations.Finances.Dtos;

namespace Application.Services.Operations.Finances
{
    public interface IFinancialExpensesServices
    {
        Task<FinancialExpensesDto> AddAsync(FinancialExpensesDto entityDto);
        Task<List<FinancialExpensesDto>> GetAllAsync(int companyId);
    }
}