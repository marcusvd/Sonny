using Domain.Entities;
using Repository.Contracts;

namespace Repository.Data.Contracts
{
    public interface IDailyOutRepository : IRepository<DailyOutFlow>
    {
        // Task<DailyOutFlow[]> GetAllAsync(bool include = false);
        // Task<DailyOutFlow> GetByIdsync(int Id, bool include = false);

    }
}