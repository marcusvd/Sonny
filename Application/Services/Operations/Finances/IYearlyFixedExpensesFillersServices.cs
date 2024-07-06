using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using Application.Services.Operations.Finances.Dtos;
using Pagination.Models;

namespace Application.Services.Operations.Finances
{
    public interface IYearlyFixedExpensesFillersServices
    {
        Task<HttpStatusCode> AddAsync(YearlyFixedExpensesFillersDto entityDto);
        Task<List<YearlyFixedExpensesFillersDto>> GetAllAsync(int companyId);
        Task<PagedList<YearlyFixedExpensesFillersDto>> GetAllPagedAsync(Params parameters);
        Task<YearlyFixedExpensesFillersDto> GetByIdAllIncluded(int yearlyFixedExpensesId);
    }
}