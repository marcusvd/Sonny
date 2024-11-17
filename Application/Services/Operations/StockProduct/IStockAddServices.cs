using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using Application.Services.Operations.Main.Customers.Dtos;
using Application.Services.Operations.StockProduct.ProductKind.Add;

namespace Application.Services.Operations.StockProduct
{
    public interface IStockAddServices
    {
        //  Task<HttpStatusCode> AddAsync(StockAddDto dtoView);
        Task<HttpStatusCode> AddAsync(StockDto entity);
         Task<List<StockDto>> GetAllProcuctsTypesByCompanyIdAsync(int companyId);
    }
}