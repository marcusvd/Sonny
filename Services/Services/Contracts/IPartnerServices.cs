using System.Threading.Tasks;
using Services.Dto;

namespace Services.Services.Contracts
{
    public interface IPartnerServices
    {
        Task<PartnerDto> AddAsync(PartnerDto record);
        Task<PartnerDto> EditAsync(int id, PartnerDto record);
        Task<bool> DeleteAsync(int id);
        Task<PartnerDto[]> GetAllAsync();
        Task<PartnerDto> GetByIdAsync(int id);
    }
}