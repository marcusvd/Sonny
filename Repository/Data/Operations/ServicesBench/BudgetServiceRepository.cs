
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Entities.ServicesBench;
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

        public async Task<CollectDeliverCosts> CollectDeliverCostsById(int id)
        {
            var CDeliversCosts = await _CONTEXT.BS_CollectsDeliversCosts.AsNoTracking().SingleOrDefaultAsync(x => x.Id == id);
            return CDeliversCosts;
        }

        public async Task<PagedList<BudgetService>> GetPaginatedCustomerInclude(Params parameters)
        {
            IQueryable<BudgetService> query = GetAllPaginationByCompanyId(x => x.CompanyId == parameters.CompanyId)
            .Include(x => x.Customer);

            if (String.IsNullOrEmpty(parameters.Term))
            {
                return await PagedList<BudgetService>.ToPagedList(query, parameters.PgNumber, parameters.PgSize);
            }

            if (parameters.Term.Equals("null"))
            {
                return await PagedList<BudgetService>.ToPagedList(query, parameters.PgNumber, parameters.PgSize);
            }

            if (!string.IsNullOrEmpty(parameters.Term))
            {
                query = query.Where(p => p.NormalizedName.Contains(parameters.Term.RemoveAccentsNormalize()));
            }

            return await PagedList<BudgetService>.ToPagedList(query, parameters.PgNumber, parameters.PgSize);
        }

        public async Task<BudgetService> GetByCompanyIdBybudgetServiceId(int companyId, int id)
        {
            var query = await _CONTEXT.BS_BudgetsServices
            .AsNoTracking()
            .Where(x => x.CompanyId == companyId)
            .Include(x => x.Customer)
            .Include(x => x.CollectsDeliversCosts)
            .Include(x => x.Service)
            .SingleOrDefaultAsync(x => x.Id == id);

            return query;
        }

    }
}