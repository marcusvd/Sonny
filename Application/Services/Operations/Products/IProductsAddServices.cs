using System.Threading.Tasks;
using Application.Dto;
using Application.Dto.Stocks;
using Pagination.Models;
using Services.Dto;

namespace Application.Services.Operations.Stocks
{
    public interface IProductsAddServices
    {
        Task<ProductDto> AddAsync(ProductDto entityDto);
    }
}