using System.Threading.Tasks;
using Application.Services.Operations.ProductServices.Dtos;
using Pagination.Models;

namespace Application.Services.Operations.ProductServices
{
    public interface IProductsAddServices
    {
        Task<ProductDto> AddAsync(ProductDto entityDto);
    }
}