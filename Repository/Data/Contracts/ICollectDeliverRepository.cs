using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Entities;
using Pagination;
using Repository.Contracts;

namespace Repository.Data.Contracts
{
    public interface ICollectDeliverRepository : IRepository<CollectDeliver>
    {

        //   Task<bool> save();
        Task<PagedList<CollectDeliver>> GetAllPaged(PgParams parameters);
        Task<PagedList<CollectDeliver>> DateCurrentMonth(PgParams parameters);

    }
}