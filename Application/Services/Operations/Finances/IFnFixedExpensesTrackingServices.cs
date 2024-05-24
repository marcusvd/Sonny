using System.Net;
using System.Threading.Tasks;
using Application.Services.Operations.Finances.Dtos;

namespace Application.Services.Operations.Finances
{
    public interface IFnFixedExpensesTrackingServices
    {
        Task<HttpStatusCode> AddAsync(FixedExpensesTrackingDto entityDto);
        void AddEssentialExpensesTest(int companyId);
    }
}