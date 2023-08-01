using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Dto;
using Application.Dto.Stocks;
using Domain.Entities.Stocks;
using Pagination.Models;
using Services.Dto;

namespace Application.Services.Operations.Stocks
{
    public interface IProductsUpdateServices
    {
        Task<ProductDto> UpdateAsync(int productId, ProductDto entityDto);
    }
}