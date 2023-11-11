using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Services.Operations.ProductServices.Dtos;

namespace Application.Services.Operations.ProductServices
{
    public interface IEquipamentAddServices
    {
        Task<EquipamentDto> AddAsync(EquipamentDto entityDto);
        Task<KeyValuePair<string, int>> AddRangeAsync(List<EquipamentDto> entityDto);
    }
}