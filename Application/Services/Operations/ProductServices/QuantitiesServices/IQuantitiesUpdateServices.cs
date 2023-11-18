using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Services.Operations.ProductServices.Dtos;
using Pagination.Models;

namespace Application.Services.Operations.ProductServices.QuantitiesServices
{
    public interface IQuantitiesUpdateServices
    {
        Task<QuantityDto> ToReserve(int quantityId, QuantityDto entityDto);
        Task<QuantityDto> ToSell(int quantityId, QuantityDto entityDto);
        Task<QuantityDto> GetByIdAsync(int quantityId);
    }
}