using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Services.Operations.Products.Dtos;

namespace Application.Services.Operations.Products
{
    public interface IEquipamentAddServices
    {
        Task<EquipamentTypeDto> AddAsync(EquipamentTypeDto entityDto);
        Task<KeyValuePair<string, int>> AddRangeAsync(List<EquipamentTypeDto> entityDto);
    }
}