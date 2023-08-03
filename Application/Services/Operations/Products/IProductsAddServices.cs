using System.Threading.Tasks;
using Application.Dto;
using Application.Services.Operations.Products.Dtos;
using Pagination.Models;
using Services.Dto;

namespace Application.Services.Operations.Products
{
    public interface IProductsAddServices
    {
        Task<ProductDto> AddAsync(ProductDto entityDto);
    }
}