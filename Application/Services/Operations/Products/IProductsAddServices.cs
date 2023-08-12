using System.Threading.Tasks;
using Application.Services.Operations.Products.Dtos;
using Pagination.Models;

namespace Application.Services.Operations.Products
{
    public interface IProductsAddServices
    {
        Task<ProductDto> AddAsync(ProductDto entityDto);
    }
}