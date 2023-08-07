using Domain.Entities.ServicesBench;
using Repository.Data.Operations.Repository;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Repository.Data.Operations.ServicesBench
{
    public interface IServicesPricesRepository : IRepository<ServicesPrices>
    {
        //Task<List<ServicesPrices>> GetAllAsyncIncluded();
        // Task<ServiceBench> GetByIdAsyncIncluded(int id);
        bool save();
    }


}