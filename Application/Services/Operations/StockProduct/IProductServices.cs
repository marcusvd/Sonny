using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using Application.Services.Operations.StockProduct.ProductKind;

namespace Application.Services.Operations.StockProduct
{
    public interface IProductServices
    {
        Task<HttpStatusCode> AddProductTypeAsync(ProductTypeDto dtoView);
        Task<List<ProductTypeDto>> GetProductTypesIncludedAsync(int companyId);
        Task<EditChildrenProductType> UpdateProductTypeAsync(ProductTypeDto dtoView, int id);
        Task<HttpStatusCode> UpdateProductTypeRangeAsync(List<ProductTypeDto> dtoView);
        Task<List<ProductTypeDto>> GetProductTypesAsync(int companyId);

        //Products
        Task<HttpStatusCode> AddProductAsync(ProductDto dtoView);
        Task<List<ProductDto>> GetProductsIncludedAsync(int companyId);
        // Task<HttpStatusCode> UpdatePartial(ProductDto dtoView, int productId);
        // Task<HttpStatusCode> AddStock(ProductDto dtoView);
        // Task<List<ProductDto>> GetAllStockByCompanyIdAsync(int companyId);
    }
}