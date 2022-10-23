using Domain.Entities;
using Domain.Entities.Financial;
using Repository.Contracts;

namespace Repository.Data.Contracts.Financial
{
    public interface IDailyInRepository:IRepository<DailyInFlow>
    {
        // Task<DailyInFlow[]> GetAllAsync(bool include = false);
        // Task<DailyInFlow> GetByIdsync(int Id, bool include = false);

    }
}