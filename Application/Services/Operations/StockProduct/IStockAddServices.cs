using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;

namespace Application.Services.Operations.StockProduct
{
    public interface IStockAddServices
    {
        //  Task<HttpStatusCode> AddAsync(StockAddDto dtoView);
        Task<HttpStatusCode> Update(StockDto dtoView);
         Task<List<StockDto>> GetAllProcuctsTypesByCompanyIdAsync(int companyId);
    }
}