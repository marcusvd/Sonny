
using Domain.Entities.ServicesBench;
using Pagination.Models;
using Repository.Data.Operations.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Repository.Data.Operations.BudgetBench
{
    public interface IBudgetServiceRepository : IRepository<BudgetService>
    {

        Task<CollectDeliverCosts> CollectDeliverCostsByIdAsync(int cdCostsId);
        Task<Page<BudgetService>> GetBudgetCustomerIncludeAsync(Params parameters, Expression<Func<BudgetService, BudgetService>> selector = null, Func<IQueryable<BudgetService>, IOrderedQueryable<BudgetService>> orderBy = null);
        Task<PagedList<BudgetService>> GetServiceCustomerIncludeAsync(Params parameters, Expression<Func<BudgetService, BudgetService>> selector = null, Func<IQueryable<BudgetService>, IOrderedQueryable<BudgetService>> orderBy = null);
        // Task<List<BudgetService>> GetAllIncludedServicesPricesAsync(int companyId);

    }


}