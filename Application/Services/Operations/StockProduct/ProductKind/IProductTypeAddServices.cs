using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using Application.Services.Operations.Main.Customers.Dtos;

namespace Application.Services.Operations.StockProduct.ProductKind
{
    public interface IProductTypeAddServices
    {
         Task<HttpStatusCode> AddAsync(ProductTypeDto entity);
         Task<List<ProductTypeDto>> GetAllProcuctsTypesByCompanyIdAsync(int companyId);
    }
}