using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Services.Operations.Main.Partners.Dtos;
using Pagination.Models;

namespace Application.Services.Operations.Main.Partners
{
    public interface IPartnerGetServices
    {
        Task<List<PartnerDto>> GetAllEletronicRepairAsync(int companyId);
        Task<List<PartnerDto>> GetAllHardwareVendorByCompanyIdAsync(int companyId);
        Task<List<PartnerDto>> GetAllTransportersByCompanyIdAsync(int companyId);
        Task<List<PartnerDto>> GetAllByCompanyIdAsync(int id);
        Task<PagedList<PartnerDto>> GetAllPagedAsync(Params parameters);
    }
}