using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using Application.Services.Operations.Finances.Dtos;
using Application.Services.Operations.Finances.Dtos.CategorySubcategoryExpenses;
using Pagination.Models;

namespace Application.Services.Operations.Finances.MonthlyExpenses
{
    public interface IMonthFixedExpensesServices
    {
        Task<MonthFixedExpensesDto> AddAsync(MonthFixedExpensesDto entityDto);
        Task<HttpStatusCode> AddCategoryExpensesAsync(CategoryExpensesDto entityDto);
        Task<List<MonthFixedExpensesDto>> GetAllAsync(int companyId);
        Task<PagedList<MonthFixedExpensesDto>> GetAllPagedAsync(Params parameters);
        Task<MonthFixedExpensesDto> GetByIdAllIncluded(int monthFixedExpensesId);
        Task<bool> CreateMonthFixedExpensesTrackingForNewYear(int companyId);
       
    }
}