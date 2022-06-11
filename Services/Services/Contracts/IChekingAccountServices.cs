using System.Threading.Tasks;
using Services.Dto;

namespace Services.Services.Contracts
{
    public interface ICheckingAccountServices
    {
        Task<CheckingAccountDto> AddAsync(CheckingAccountDto record);
        // Task<CheckingAccountDto> EditAsync(int id, CheckingAccountDto record);
        // Task<bool> DeleteAsync(int id);
        Task<CheckingAccountDto[]> GetAllAsync(bool include = false);
        // Task<ChekingAccountDto> GetByIdAsync(int id, bool include = false);
    }
}