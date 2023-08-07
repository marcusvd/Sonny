
using Domain.Entities.ServicesBench;
using Repository.Data.Operations.Repository;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Repository.Data.Operations.BudgetBench
{
    public interface IBudgetServiceRepository : IRepository<BudgetService>
    {
       // Task <List<BudgetService>> GetAllAsyncIncluded();
        //Task<BudgetService> GetByIdAsyncIncluded(int id);
     }


}