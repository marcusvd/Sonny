
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Entities.ServicesBench;
using Domain.Entities.ServicesBench.Enums;
using Microsoft.EntityFrameworkCore;
using Pagination.Models;
using Repository.Data.Context;
using Repository.Data.Operations.Repository;
using Repository.Helpers;

namespace Repository.Data.Operations.BudgetBench
{
    public class BudgetServiceRepository : Repository<BudgetService>, IBudgetServiceRepository
    {
        private SonnyDbContext _CONTEXT;
        public BudgetServiceRepository(SonnyDbContext CONTEXT) : base(CONTEXT)
        {
            _CONTEXT = CONTEXT;
        }

        public async Task<CollectDeliverCosts> CollectDeliverCostsByIdAsync(int id)
        {
            var CDeliversCosts = await _CONTEXT.BS_CollectsDeliversCosts.AsNoTracking().SingleOrDefaultAsync(x => x.Id == id);
            return CDeliversCosts;
        }

        public async Task<Page<BudgetService>> GetBudgetCustomerIncludeAsync(Params parameters)
        {
            IQueryable<BudgetService> query = Get(x => x.CompanyId == parameters.predicate)
            .Include(x => x.Customer)
            .Include(x => x.Service)
            .Where(x => x.Service == null);

            if (String.IsNullOrEmpty(parameters.Term))
                return await Page<BudgetService>.ToPagedList(query, parameters.PgNumber, parameters.PgSize, selector => selector);

            if (!string.IsNullOrEmpty(parameters.Term))
                query = query.Where(p => p.Customer.Name.Contains(parameters.Term.RemoveAccentsNormalize()));

            return await Page<BudgetService>.ToPagedList(query, parameters.PgNumber, parameters.PgSize, selector => selector);
        }

        public async Task<PagedList<BudgetService>> GetServiceCustomerIncludeAsync(Params parameters)
        {

            IQueryable<BudgetService> query = Get(x => x.CompanyId == parameters.predicate)
            .Include(x => x.Customer)
            .Include(x => x.Service)
            .ThenInclude(x => x.Prices)
            .Where(x => x.Service != null);

            if (String.IsNullOrEmpty(parameters.Term))
                return await PagedList<BudgetService>.ToPagedList(query, parameters.PgNumber, parameters.PgSize);

            if (!string.IsNullOrEmpty(parameters.Term))
                query = query.Where(p => p.Customer.Name.Contains(parameters.Term.RemoveAccentsNormalize()));

            return await PagedList<BudgetService>.ToPagedList(query, parameters.PgNumber, parameters.PgSize);

        }

        // public async Task<List<BudgetService>> GetAllIncludedServicesPricesAsync(int companyId)
        // {
        //     var query = await _CONTEXT.BS_BudgetsServices
        //     .AsNoTracking()
        //     .Include(x => x.Service)
        //     .ThenInclude(x => x.Prices)
        //     .ToListAsync();

        //     return query;
        // }



        


    }
}