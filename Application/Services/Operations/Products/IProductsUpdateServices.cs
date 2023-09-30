using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Services.Operations.Products.Dtos;
using Domain.Entities.Product;
using Pagination.Models;

namespace Application.Services.Operations.Products
{
    public interface IProductsUpdateServices
    {
        Task<ProductDto> UpdateAsync(int productId, ProductDto entityDto);
    }
}