
using Domain.Entities.ServicesBench;
using Repository.Data.Operations.Repository;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Repository.Data.Operations.BudgetBench
{
    public interface IServicePriceRepository : IRepository<BudgetService>
    {
        Task<List<Repair>> GetAllByIdService(int serviceId);
        void RemoveRange(List<Repair> servicesLabelPrices);
    }


}