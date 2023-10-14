
using Domain.Entities.ServicesBench;
using Pagination.Models;
using Repository.Data.Operations.Repository;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Repository.Data.Operations.BudgetBench
{
    public interface IBudgetServiceRepository : IRepository<BudgetService>
    {
        Task<CollectDeliverCosts> CollectDeliverCostsById(int cdCostsId);
        Task<PagedList<BudgetService>> GetPaginatedCustomerInclude(Params parameters);
        Task<BudgetService> GetByCompanyIdBybudgetServiceId(int companyId, int id);
     }


}