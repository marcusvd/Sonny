using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Services.Operations.ProductServices.Dtos;
using Pagination.Models;

namespace Application.Services.Operations.ProductServices
{
    public interface IProductsGetServices
    {
       Task<PagedList<ProductDto>> GetAllPagedAsync(Params parameters);
        // Task<List<ProductGroupedToDtoView>> GetAllProductGroupedToDtoView(int stockId);
    }
}