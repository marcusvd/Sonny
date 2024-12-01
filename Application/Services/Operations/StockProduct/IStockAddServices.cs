using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using Application.Services.Operations.StockProduct.ProductKind;

namespace Application.Services.Operations.StockProduct
{
    public interface IStockAddServices
    {
        Task<HttpStatusCode> AddAsync(ProductDto dtoView);
        Task<HttpStatusCode> UpdatePartial(StockDto dtoView, int productId);
        Task<HttpStatusCode> AddStock(StockDto dtoView);
        Task<List<ProductDto>> GetAllProductsByCompanyIdAsync(int companyId);
        Task<List<StockDto>> GetAllStockByCompanyIdAsync(int companyId);
    }
}