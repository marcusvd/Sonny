using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Services.Operations.ProductServices.Dtos;
using Pagination.Models;

namespace Application.Services.Operations.ProductServices
{
    public interface IProductsGetServices
    {
        Task<Page<ProductDto>> GetAllAvailableToSellPagedAsync(Params parameters);
        Task<int> GetLengthAsync(int companyId);
        Task<ProductDto> GetProductByIdAsync(int productId);
    }
}