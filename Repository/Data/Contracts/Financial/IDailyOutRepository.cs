using Domain.Entities;
using Domain.Entities.Financial;
using Repository.Contracts;

namespace Repository.Data.Contracts.Financial
{
    public interface IDailyOutRepository : IRepository<DailyOutFlow>
    {
        // Task<DailyOutFlow[]> GetAllAsync(bool include = false);
        // Task<DailyOutFlow> GetByIdsync(int Id, bool include = false);

    }
}