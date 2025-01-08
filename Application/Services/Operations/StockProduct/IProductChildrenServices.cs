using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using Application.Services.Operations.StockProduct.ProductKind;

namespace Application.Services.Operations.StockProduct
{
    public interface IProductChildrenServices
    {
         Task<List<SegmentDto>> GetSegmentsAsync(int companyId);
        Task<List<ManufacturerDto>> GetManufacturersAsync(int companyId);
        Task<List<ModelDto>> GetModelsAsync(int companyId);
        Task<List<SpecificitiesDto>> GetSpecificitiesAsync(int companyId);


        // Task<HttpStatusCode> UpdateSegmentRangeAsync(List<SegmentDto> dtoView);
        // Task<HttpStatusCode> UpdateManufacturerRangeAsync(List<ManufacturerDto> dtoView);
        // Task<HttpStatusCode> UpdateModelRangeAsync(List<ModelDto> dtoView);
        
    }
}