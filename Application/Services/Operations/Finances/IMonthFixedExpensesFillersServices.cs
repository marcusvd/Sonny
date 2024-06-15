using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using Application.Services.Operations.Finances.Dtos;
using Pagination.Models;

namespace Application.Services.Operations.Finances
{
    public interface IMonthFixedExpensesFillersServices
    {
        Task<HttpStatusCode> AddAsync(MonthFixedExpensesFillersDto entityDto);
        Task<List<MonthFixedExpensesFillersDto>> GetAllAsync(int companyId);
        Task<PagedList<MonthFixedExpensesFillersDto>> GetAllPagedAsync(Params parameters);
        Task<MonthFixedExpensesFillersDto> GetByIdAllIncluded(int monthFixedExpensesId);
    }
}