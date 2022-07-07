using System.Collections.Generic;
using System.Threading.Tasks;
using Pagination;
using Services.Dto;

namespace Services.Services.Contracts
{
    public interface IEquipamentServices
    {
        Task<List<EquipamentDto>> GetAllPagedListAsync(Params parameters);
        Task<EquipamentDto> AddAsync(EquipamentDto record);
        Task<EquipamentDto> EditAsync(int id, EquipamentDto model);
        Task<bool> DeleteAsync(int id);
        Task<EquipamentDto[]> GetAllAsync();
        Task<EquipamentDto> GetByIdAsync(int id);
    }
}