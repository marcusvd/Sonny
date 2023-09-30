using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Services.Operations.Products.Dtos;
using Pagination.Models;

namespace Application.Services.Operations.Products
{
    public interface IManufacturerGetServices
    {
      Task<List<ManufacturerDto>> GetAllAsync(int companyId);
      Task<PagedList<ManufacturerDto>> GetAllPagedAsync(Params parameters);
      Task<int> GetCountByCompanyIdAsync(int id);
    }
}