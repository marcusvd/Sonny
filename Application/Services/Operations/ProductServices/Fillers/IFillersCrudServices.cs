using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using Application.Services.Operations.ProductServices.Dtos;
using Application.Services.Operations.ProductServices.Dtos.Fill;

namespace Application.Services.Operations.ProductServices.Fillers
{
     public interface IItemFillCrudServices
    {
        Task<HttpStatusCode> AddItemFillAsync(List<ItemDto> entityDto);
        Task<List<ItemDto>> GetAllItemFill(int companyId);
    }
   
    public interface IModelFillCrudServices
    {
        Task<KeyValuePair<string, int>> AddRangeAsync(List<ModelDto> entityDto);
        Task<List<ModelDto>> GetAll(int companyId);
    }
    public interface IManufacturerFillCrudServices
    {
        Task<KeyValuePair<string, int>> AddRangeAsync(List<ManufacturerDto> entityDto);
        Task<List<ManufacturerDto>> GetAll(int companyId);
    }
    public interface ISegmentFillCrudServices
    {
        Task<KeyValuePair<string, int>> AddRangeAsync(List<SegmentDto> entityDto);
        Task<List<SegmentDto>> GetAll(int companyId);
    }
}