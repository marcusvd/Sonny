using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using Application.Services.Operations.Finances.Dtos.CategorySubcategoryExpenses;
using Application.Services.Operations.Finances.Dtos.MonthlyExpenses;
using Pagination.Models;

namespace Application.Services.Operations.Finances.MonthlyExpenses
{
    public interface IMonthlyFixedExpensesServices
    {
        Task<HttpStatusCode> AddRangeAsync(MonthlyFixedExpenseDto entityDto);
        // Task<HttpStatusCode> AddCategoryExpensesAsync(CategoryExpenseDto entityDto);
        Task<List<MonthlyFixedExpenseDto>> GetAllAsync(int companyId);
        Task<PagedList<MonthlyFixedExpenseDto>> GetAllPagedAsync(Params parameters);
        Task<MonthlyFixedExpenseDto> GetByIdAllIncluded(int monthFixedExpensesId);
        Task<bool> CreateMonthlyFixedExpensesTrackingForNewYear(int companyId);
        Task<HttpStatusCode> PaymentAsync(int fixedExpensesTrackingId, MonthlyFixedExpensePaymentDto entity);
        // Task<HttpStatusCode> UpdateAsync(int fixedExpensesTrackingId, MonthlyFixedExpenseDto entity);
    }
}