using System.Threading.Tasks;
using Application.Dto;

namespace Application.Services.Contracts
{
    public interface IInventoryServices
    {
        Task<InventoryDto[]> GetAllAsync();
        Task<InventoryDto> AddAsync(InventoryDto record);

    }
}