using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using Application.Services.Operations.Finances.Dtos.CategorySubcategoryExpenses;
using Application.Services.Operations.Finances.Dtos.CreditCardExpenses;
using Application.Services.Operations.Finances.Dtos.MonthlyExpenses;
using Pagination.Models;

namespace Application.Services.Operations.Finances.CreditCardExpenses
{
    public interface ICreditCardExpensesServices
    {
        Task<HttpStatusCode> AddRangeAsync(CreditCardExpenseDto entityDto);
         Task<List<CreditCardExpenseDto>> GetAllAsync(int companyId);
        // Task<HttpStatusCode> AddCategoryExpensesAsync(CategoryExpenseDto entityDto);
        // Task<PagedList<CreditCardExpenseDto>> GetAllPagedAsync(Params parameters);
        // Task<CreditCardExpenseDto> GetByIdAllIncluded(int monthFixedExpensesId);
        // Task<bool> CreateMonthlyFixedExpensesTrackingForNewYear(int companyId);
        // Task<HttpStatusCode> UpdateAsync(int fixedExpensesTrackingId, CreditCardExpenseDto entity);
    }
}