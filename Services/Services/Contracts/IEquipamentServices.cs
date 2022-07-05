using System.Threading.Tasks;
using Services.Dto;

namespace Services.Services.Contracts
{
    public interface IEquipamentServices
    {
        Task<EquipamentDto> AddAsync(EquipamentDto record);
        Task<EquipamentDto> EditAsync(int id, EquipamentDto model);
        Task<bool> DeleteAsync(int id);
        Task<EquipamentDto[]> GetAllAsync();
        Task<EquipamentDto> GetByIdAsync(int id);
    }
}