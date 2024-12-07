using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using Application.Services.Operations.StockProduct.ProductKind;

namespace Application.Services.Operations.StockProduct
{
    public interface IProductChildrenServices
    {
        Task<HttpStatusCode> UpdateProductTypeAsync(ProductTypeDto dtoView, int id);
    }
}