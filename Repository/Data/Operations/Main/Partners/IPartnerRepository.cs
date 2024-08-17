using System.Collections.Generic;
using System.Threading.Tasks;
using Domain.Entities;
using Domain.Entities.Main;
using Pagination.Models;
using Repository.Data.Operations.Repository;

namespace Repository.Data.Operations.Main.Partners
{
    public interface IPartnerRepository : IRepository<Partner>
    {
        void AddRangeAsync(List<Partner> entities);
        // Task<PagedList<Partner>> GetAllPartnersPagedAsync(Params parameters);
        // Task<List<Partner>> GetAllEletronicRepairAsync(int companyId);
        // Task<List<Partner>> GetAllHardwareVendorByCompanyIdAsync(int companyId);
        // Task<int> GetTotalHardwareVendorByCompanyIdAsync(int id);
    }
}