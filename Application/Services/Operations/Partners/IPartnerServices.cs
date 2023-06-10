using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Dto;
using Pagination.Models;
using Services.Dto;

namespace Application.Services.Operations.Partners
{
    public interface IPartnerServices
    {
        Task<PartnerDto> AddAsync(PartnerDto entityDto);
        Task<PartnerDto[]> GetAllAsync();
        Task<List<PartnerDto>> GetAllByCompanyIdAsync(int id);
        Task<int> GetCountByCompanyIdAsync(int id);
        Task<int> GetTotalHardwareVendorPartnersByCompanyId(int id);
        Task<PagedListDto<PartnerDto>> GetAllPagedAsync(Params parameters);
    }
}