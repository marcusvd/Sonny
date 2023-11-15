using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Services.Operations.ProductServices.Dtos;
using Pagination.Models;

namespace Application.Services.Operations.ProductServices.QuantitiesServices
{
    public interface IQuantitiesUpdateServices
    {
        Task<QuantityDto> Reserve(int quantityId, QuantityDto entityDto);
        Task<QuantityDto> Sell(int quantityId, QuantityDto entityDto);
    }
}