using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Services.Operations.ProductServices.Dtos;
using Domain.Entities.StkProduct;
using Pagination.Models;

namespace Application.Services.Operations.ProductServices.QuantitiesServices
{
    public interface IQuantitiesUpdateServices
    {
        Task<QuantityDto> ToReserve(int quantityId, QuantityDto entityDto);
        Task<QuantityDto> ToSell(int quantityId, QuantityDto entityDto);
        Task<QuantityDto> GetByIdAsync(int quantityId);
       // Task<List<Quantity>> UpdateRangeAsync(List<int> quantityId);
         Task<KeyValuePair<string, int>> UpdateRangeAsync(List<QuantityDto> entitiesDto);
    }
}