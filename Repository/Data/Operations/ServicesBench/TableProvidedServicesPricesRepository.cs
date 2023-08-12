using System.Threading.Tasks;
using Domain.Entities.ServicesBench;
using Repository.Data.Context;
using Repository.Data.Operations.Repository;

namespace Repository.Data.Operations.ServicesBench
{
    public class TableProvidedServicesPricesRepository : Repository<TableProvidedServicePrice>, ITableProvidedServicesPricesRepository
    {
        private SonnyDbContext _CONTEXT;
        public TableProvidedServicesPricesRepository(SonnyDbContext CONTEXT) : base(CONTEXT)
        {
            _CONTEXT = CONTEXT;
        }

        public bool save()
        {
            if(_CONTEXT.SaveChanges() > 0){
                return true;
            }
            return false;
        }

        //         public async Task<List<ServiceBench>> GetAllAsyncIncluded()
        //         {
        //             var result = await _CONTEXT.ServicesBench.AsNoTracking()

        //             .Include((benchToCach)=> benchToCach.ListBenchToCashBox)
        //             .Include((customer)=> customer.Customer)
        //             .ToListAsync();

        //             return result;
        //         }


        //         // {
        //         //     var result = await _CONTEXT.ServicesBench.AsNoTracking()
        //         //     // .Include(s => s.SolutionsPrices)
        //         //     .Include(c => c.Client)
        //         //     .FirstOrDefaultAsync(x => x.Id==id);
        //         //     return result;
        //         // }

    }
 }