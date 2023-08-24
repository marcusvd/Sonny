using System.Threading.Tasks;
using Application.Services.Operations.Products.Dtos;

namespace Application.Services.Operations.Products
{
    public interface IManufacturerAddServices
    {
         Task<ManufacturerDto> AddAsync(ManufacturerDto entityDto);
    }
}