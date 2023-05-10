using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Dto;

namespace Application.Services.Operations.Partners
{
    public interface IPartnerServices
    {
        Task<PartnerDto> AddAsync(PartnerDto entityDto);
        Task<PartnerDto[]> GetAllAsync();
        Task<List<PartnerDto>> GetAllByCompanyIdAsync(int id);
    }
}