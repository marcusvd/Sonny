using Domain.Entities.ServicesBench;
using Repository.Data.Operations.Repository;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Repository.Data.Operations.ServicesBench
{
    public interface ITableProvidedServicesPricesRepository : IRepository<TableProvidedServicePrice>
    {
        //Task<List<ServicesPrices>> GetAllAsyncIncluded();
        // Task<ServiceBench> GetByIdAsyncIncluded(int id);
        bool save();
    }


}