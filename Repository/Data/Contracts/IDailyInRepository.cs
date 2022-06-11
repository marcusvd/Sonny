using Domain.Entities;
using Repository.Contracts;

namespace Repository.Data.Contracts
{
    public interface IDailyInRepository:IRepository<DailyInFlow>
    {
        // Task<DailyInFlow[]> GetAllAsync(bool include = false);
        // Task<DailyInFlow> GetByIdsync(int Id, bool include = false);

    }
}