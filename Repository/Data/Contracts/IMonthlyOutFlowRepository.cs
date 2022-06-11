using Domain.Entities;
using Repository.Contracts;

namespace Repository.Data.Contracts
{
    public interface IMonthlyOutFlowRepository:IRepository<MonthlyOutFlow>
    {
        // Task<MonthlyOutFlow[]> GetAllAsync(bool include = false);
        // Task<MonthlyOutFlow> GetByIdAsync(int Id, bool include = false);
    }
}