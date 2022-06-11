using System.Threading.Tasks;
using Services.Dto;

namespace Services.Services.Contracts
{
    public interface IInventoryServices
    {
        Task<InventoryDto> AddAsync(InventoryDto record);
        Task<InventoryDto> EditAsync(int id, InventoryDto record);
        Task<bool> DeleteAsync(int id);
        Task<InventoryDto[]> GetAllAsync();
        Task<InventoryDto> GetByIdAsync(int id);

    }
}