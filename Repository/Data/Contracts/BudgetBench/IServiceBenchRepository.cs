using Domain.Entities.BudgetBench;
using Repository.Data.Operations.Repository;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Repository.Data.Contracts
{
    public interface IServiceBenchRepository : IRepository<ServiceBench>
    {
        Task<List<ServiceBench>> GetAllAsyncIncluded();
        // Task<ServiceBench> GetByIdAsyncIncluded(int id);
    }


}