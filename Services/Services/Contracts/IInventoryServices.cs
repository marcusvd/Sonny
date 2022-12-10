using System.Threading.Tasks;
using Services.Dto;

namespace Services.Services.Contracts
{
    public interface IInventoryServices
    {
        Task<InventoryDto[]> GetAllAsync();
        Task<InventoryDto> AddAsync(InventoryDto record);

    }
}