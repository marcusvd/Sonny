using System.Threading.Tasks;
using Application.Dto;

namespace Application.Services.Contracts
{
    public interface IPartnerServices
    {
        Task<PartnerDto> AddAsync(PartnerDto entityDto);
        Task<PartnerDto[]> GetAllAsync();
    }
}