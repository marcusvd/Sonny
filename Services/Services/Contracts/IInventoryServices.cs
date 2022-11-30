using System.Collections.Generic;
using System.Threading.Tasks;
using Pagination;
using Services.Dto;

namespace Services.Services.Contracts
{
    public interface IInventoryServices
    {
        Task<InventoryDto[]> GetAllAsync();
        Task<InventoryDto> AddAsync(InventoryDto record);

    }
}