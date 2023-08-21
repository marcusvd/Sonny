
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Entities.ServicesBench;
using Microsoft.EntityFrameworkCore;
using Repository.Data.Context;
using Repository.Data.Operations.Repository;

namespace Repository.Data.Operations.BudgetBench
{
    public class ServicePriceRepository : Repository<BudgetService>, IServicePriceRepository
    {
        private SonnyDbContext _CONTEXT;
        public ServicePriceRepository(SonnyDbContext CONTEXT) : base(CONTEXT)
        {
            _CONTEXT = CONTEXT;
        }

        public async Task<List<Price>> GetAllByIdService(int serviceId)
        {
            var query = await _CONTEXT.Prices.AsNoTracking().Where(x => x.ServiceId == serviceId).ToListAsync();
            return query;
        }

        public void RemoveRange(List<Price> servicesLabelPrices)
        {
             _CONTEXT.Prices.RemoveRange(servicesLabelPrices);

        }



    }
}