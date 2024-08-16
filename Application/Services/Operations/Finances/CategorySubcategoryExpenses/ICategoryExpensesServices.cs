using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using Application.Services.Operations.Finances.Dtos.CategorySubcategoryExpenses;
using Pagination.Models;

namespace Application.Services.Operations.Finances.CategorySubcategoryExpenses
{
    public interface ICategoryExpensesServices
    {
        Task<HttpStatusCode> AddAsync(CategoryExpenseDto entityDto);
        Task<List<CategoryExpenseDto>> GetAllAsync(int companyId);
        Task<PagedList<CategoryExpenseDto>> GetAllPagedAsync(Params parameters);
        Task<CategoryExpenseDto> GetByIdAllIncluded(int monthFixedExpensesId);
        Task<HttpStatusCode> UpdateAsync(int categoryExpensesId, CategoryExpenseDto entity);
        Task<HttpStatusCode> DeleteFakeAsync(int categoryExpensesId);
    }
}