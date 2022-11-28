using System.Threading.Tasks;
using Services.Dto;
using Services.Dto.Financial;

namespace Services.Services.Contracts.Financial
{
    public interface ICheckingAccountServices
    {
        Task<CheckingAccountDto> AddAsync(CheckingAccountDto entityDto);
        Task<CheckingAccountDto[]> GetAllAsync(bool include = false);
    }
}