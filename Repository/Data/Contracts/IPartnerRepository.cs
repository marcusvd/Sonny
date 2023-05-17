using System.Threading.Tasks;
using Domain.Entities;
using Pagination.Models;
using Repository.Contracts;

namespace Repository.Data.Contracts
{
    public interface IPartnerRepository : IRepository<Partner>
    {
        Task<PagedList<Partner>> GetPartnersPagedAsync(Params parameters);
    }
}