using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;


namespace Application.Services.Operations.StockProduct.ProductKind
{
    public interface IProductTypeAddServices
    {
        //  Task<HttpStatusCode> AddAsync(ProductTypeAddDto dtoView);
        Task<HttpStatusCode> AddAsync(ProductTypeDto entity);
         Task<List<ProductTypeDto>> GetAllProcuctsTypesByCompanyIdAsync(int companyId);
    }
}