using System.Threading.Tasks;
using Domain.Entities;
using Services.Dto;

namespace Services.Services.Contracts
{
    public interface IEletronicRepairServices
    {
        Task<EletronicRepairDto> AddAsync(EletronicRepairDto record);
        // Task<EletronicRepairDto> EditAsync(int id, EletronicRepairDto record);
        // Task<EletronicRepairDto[]> GetAllAsync();
        // Task<EletronicRepairDto> GetByIdAsync(int id);
        // Task<bool> DeleteAsync(int id);

    }
}