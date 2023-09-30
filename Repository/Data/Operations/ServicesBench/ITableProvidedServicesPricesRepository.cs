using Domain.Entities.ServicesBench;
using Repository.Data.Operations.Repository;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Repository.Data.Operations.ServicesBench
{
    public interface ITableProvidedServicesPricesRepository : IRepository<TableProvidedServicePrice>
    {
        void AddRangeAsync(List<TableProvidedServicePrice> entities);
    }


}