using Domain.Entities;
using Domain.Entities.Financial;
using Repository.Contracts;

namespace Repository.Data.Contracts.Financial
{
    public interface IMonthlyOutFlowRepository:IRepository<MonthlyOutFlow>
    {
        // Task<MonthlyOutFlow[]> GetAllAsync(bool include = false);
        // Task<MonthlyOutFlow> GetByIdAsync(int Id, bool include = false);
    }
}