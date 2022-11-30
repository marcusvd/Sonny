using System.Threading.Tasks;
using Services.Dto;

namespace Services.Services.Contracts
{
    public interface IPartnerServices
    {
        Task<PartnerDto> AddAsync(PartnerDto entityDto);
        Task<PartnerDto[]> GetAllAsync();

    }
}