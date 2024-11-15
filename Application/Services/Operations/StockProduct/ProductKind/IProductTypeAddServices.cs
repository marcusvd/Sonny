using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using Application.Services.Operations.Main.Customers.Dtos;
using Application.Services.Operations.StockProduct.ProductKind.Add;

namespace Application.Services.Operations.StockProduct.ProductKind
{
    public interface IProductTypeAddServices
    {
        //  Task<HttpStatusCode> AddAsync(ProductTypeAddDto dtoView);
        Task<HttpStatusCode> AddAsync(ProductTypeDto entity);
         Task<List<ProductTypeDto>> GetAllProcuctsTypesByCompanyIdAsync(int companyId);
    }
}