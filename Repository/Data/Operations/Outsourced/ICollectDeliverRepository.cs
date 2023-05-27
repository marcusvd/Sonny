using Domain.Entities.Outsourced;
using Repository.Contracts;

namespace Repository.Data.Operations.Outsourced
{
    public interface ICollectDeliverRepository : IRepository<CollectDeliver>
    {
        // Task<PagedList<CollectDeliver>> GetAllPaged(PgParams parameters);
        // Task<PagedList<CollectDeliver>> GetByDateCurrentMonth(PgParams parameters);
        // Task<PagedList<CollectDeliver>> GetByIntervalDate(PgParams parameters);

    }
}