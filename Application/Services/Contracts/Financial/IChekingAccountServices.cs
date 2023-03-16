using System.Threading.Tasks;
using Application.Dto.Financial;

namespace Application.Services.Contracts.Financial
{
    public interface ICheckingAccountServices
    {
        Task<CheckingAccountDto> AddAsync(CheckingAccountDto entityDto);
        Task<CheckingAccountDto[]> GetAllAsync(bool include = false);
    }
}