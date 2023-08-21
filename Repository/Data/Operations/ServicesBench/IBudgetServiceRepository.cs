
using Domain.Entities.ServicesBench;
using Repository.Data.Operations.Repository;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Repository.Data.Operations.BudgetBench
{
    public interface IBudgetServiceRepository : IRepository<BudgetService>
    {
        Task<CollectDeliverCosts> CollectDeliverCostsById(int cdCostsId);
     }


}