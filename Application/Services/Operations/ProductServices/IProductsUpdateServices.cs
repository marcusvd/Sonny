using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Services.Operations.ProductServices.Dtos;
using Pagination.Models;

namespace Application.Services.Operations.ProductServices
{
    public interface IProductsUpdateServices
    {
        Task<bool> AutoReserveRemove(int companyId);
        // Task<ProductDto> UpdateAsync(int productId, ProductDto entityDto);
    }
}