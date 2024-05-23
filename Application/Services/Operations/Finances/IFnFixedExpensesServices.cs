using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Services.Operations.Finances.Dtos;

namespace Application.Services.Operations.Finances
{
    public interface IFnFixedExpensesServices
    {
        Task<FixedExpensesDto> AddAsync(FixedExpensesDto entityDto);
        Task<List<FixedExpensesDto>> GetAllAsync(int companyId);
    }
}