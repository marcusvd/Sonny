using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Services.Operations.ProductServices.Dtos;
using Pagination.Models;

namespace Application.Services.Operations.ProductServices
{
    public interface IProductsAddServices
    {
        Task<ProductDto> AddAsync(ProductDto entityDto);
        Task<KeyValuePair<string, int>> AddProductSoldTrakingAsync(List<TrackingDto> entitiesDto);
    }
}