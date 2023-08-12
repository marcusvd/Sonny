using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Services.Operations.Main.Partners.Dtos;
using Application.Services.Shared.Dtos.Pagination;
using Pagination.Models;

namespace Application.Services.Operations.Main.Partners
{
    public interface IPartnerAddServices
    {
        Task<PartnerDto> AddAsync(PartnerDto entityDto);
        Task<PartnerDto[]> GetAllAsync();
        Task<List<PartnerDto>> GetAllByCompanyIdAsync(int id);
        Task<int> GetCountByCompanyIdAsync(int id);
        Task<int> GetTotalHardwareVendorPartnersByCompanyId(int id);
        Task<PagedListDto<PartnerDto>> GetAllPagedAsync(Params parameters);
    }
}