using System.Threading.Tasks;
using Services.Dto;

namespace Services.Services.Contracts
{
    public interface IItemServices
    {
        Task<ItemDto> AddAsync(ItemDto record);
        Task<ItemDto> EditAsync(int id, ItemDto model);
        Task<bool> DeleteAsync(int id);
        Task<ItemDto[]> GetAllAsync();
        Task<ItemDto> GetByIdAsync(int id);
    }
}