using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using Application.Services.Operations.Finances.Dtos;
using Pagination.Models;

namespace Application.Services.Operations.Finances
{
    public interface ICategoryExpensesServices
    {
        Task<HttpStatusCode> AddAsync(CategoryExpensesDto entityDto);
        Task<List<CategoryExpensesDto>> GetAllAsync(int companyId);
        Task<PagedList<CategoryExpensesDto>> GetAllPagedAsync(Params parameters);
        Task<CategoryExpensesDto> GetByIdAllIncluded(int monthFixedExpensesId);
        Task<HttpStatusCode> UpdateAsync(int categoryExpensesId, CategoryExpensesDto entity);
        Task<HttpStatusCode> DeleteFakeAsync(int categoryExpensesId);
    }
}