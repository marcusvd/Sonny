using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Services.Operations.Products.Dtos;
using Pagination.Models;

namespace Application.Services.Operations.Products
{
    public interface IEquipamentGetServices
    {
       Task<List<EquipamentTypeDto>> GetAllAsync(int companyId);
       Task<PagedList<EquipamentTypeDto>> GetAllPagedAsync(Params parameters);
       Task<int> GetCountByCompanyIdAsync(int id);

    }
}