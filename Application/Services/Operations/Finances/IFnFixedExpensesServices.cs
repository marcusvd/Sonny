using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Services.Operations.Finances.Dtos;
using Pagination.Models;

namespace Application.Services.Operations.Finances
{
    public interface IFnFixedExpensesServices
    {
        Task<FixedExpensesDto> AddAsync(FixedExpensesDto entityDto);
        Task<List<FixedExpensesDto>> GetAllAsync(int companyId);
        Task<PagedList<FixedExpensesDto>> GetAllPagedAsync(Params parameters);
    }
}