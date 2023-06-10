using System.Threading.Tasks;
using Domain.Entities;
using Pagination.Models;
using Repository.Data.Operations.Repository;

namespace Repository.Data.Operations.Partners
{
    public interface IPartnerRepository : IRepository<Partner>
    {
        Task<PagedList<Partner>> GetAllPartnersPagedAsync(Params parameters);
        Task<int> GetTotalHardwareVendorPartnersByCompanyId(int id);
    }
}