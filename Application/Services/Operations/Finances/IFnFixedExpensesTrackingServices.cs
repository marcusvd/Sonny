using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using Application.Services.Operations.Finances.Dtos;
using Pagination.Models;

namespace Application.Services.Operations.Finances
{
    public interface IFnFixedExpensesTrackingServices
    {
        Task<HttpStatusCode> AddAsync(FixedExpensesTrackingDto entityDto);
        void AddEssentialExpensesTest(int companyId);
        Task<PagedList<FixedExpensesTrackingDto>> GetAllPagedAsync(Params parameters);
        Task<List<FixedExpensesTrackingDto>> GetAllByCompanyIdAsync(int id);
    }
}