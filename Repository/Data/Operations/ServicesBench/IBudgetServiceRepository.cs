
using Domain.Entities.ServicesBench;
using Pagination.Models;
using Repository.Data.Operations.Repository;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Repository.Data.Operations.BudgetBench
{
    public interface IBudgetServiceRepository : IRepository<BudgetService>
    {

        Task<CollectDeliverCosts> CollectDeliverCostsByIdAsync(int cdCostsId);
        Task<Page<BudgetService>> GetBudgetCustomerIncludeAsync(Params parameters);
        Task<PagedList<BudgetService>> GetServiceCustomerIncludeAsync(Params parameters);
        // Task<List<BudgetService>> GetAllIncludedServicesPricesAsync(int companyId);

    }


}