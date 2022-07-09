using System.Collections.Generic;
using System.Threading.Tasks;
using Pagination;
using Services.Dto;

namespace Services.Services.Contracts
{
    public interface IInventoryServices
    {
        // Task<InventoryDto> AddAsync(InventoryDto record);
        // Task<InventoryDto> EditAsync(int id, InventoryDto record);
        // Task<bool> DeleteAsync(int id);
        // Task<InventoryDto[]> GetAllAsync();
        // Task<InventoryDto> GetByIdAsync(int id);
        Task<PagedListDto<InventoryDto>> PagedListGetAllIncludedAsync(PgParams parameters);
        Task<InventoryDto[]> GetAllAsync();
        Task<InventoryDto[]> GetAllEquipamentIncludedAsync();
        Task<InventoryDto> GetByIdAsync(int id);
        Task<InventoryDto> AddAsync(InventoryDto record);
        Task<InventoryDto> EditAsync(int id, InventoryDto model);
        Task<bool> DeleteAsync(int id);

    }
}