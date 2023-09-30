using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Services.Operations.Products.Dtos;
using Pagination.Models;

namespace Application.Services.Operations.Products
{
    public interface IProductsGetServices
    {
        Task<PagedList<ProductDto>> GetAllPagedAsync(Params parameters);
        Task<List<ProductGroupedToDtoView>> GetAllProductGroupedToDtoView(int stockId);
    }
}