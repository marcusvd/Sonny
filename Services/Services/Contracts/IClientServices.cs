using System.Threading.Tasks;
using Services.Dto;

namespace Services.Services.Contracts
{
    public interface IClientServices
    {
        Task<ClientDto> AddAsync(ClientDto record);
        Task<ClientDto> EditAsync(int id, ClientDto record);
        Task<bool> DeleteAsync(int id);
        Task<ClientDto[]> GetAllAsync();
        Task<ClientDto> GetByIdAsync(int id);

    }
}