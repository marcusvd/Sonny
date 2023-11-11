using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Services.Operations.ProductServices.Dtos;
using Application.Services.Operations.ProductServices.Dtos.Fill;

namespace Application.Services.Operations.ProductServices
{
    public interface IEquipamentFillCrudServices
    {
        Task<KeyValuePair<string, int>> AddRangeAsync(List<Equipament_FillDto> entityDto);
        Task<List<Equipament_FillDto>> GetAll(int companyId);
    }
    public interface IManufacturerFillCrudServices
    {
        Task<KeyValuePair<string, int>> AddRangeAsync(List<Manufacturer_FillDto> entityDto);
        Task<List<Manufacturer_FillDto>> GetAll(int companyId);
    }
    public interface ISegmentFillCrudServices
    {
        Task<KeyValuePair<string, int>> AddRangeAsync(List<Segment_FillDto> entityDto);
        Task<List<Segment_FillDto>> GetAll(int companyId);
    }
}