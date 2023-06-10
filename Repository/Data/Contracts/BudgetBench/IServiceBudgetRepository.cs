using Domain.Entities.BudgetBench;
using Repository.Data.Operations.Repository;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Repository.Data.Contracts
{
    public interface IServiceBudgetRepository : IRepository<ServiceBudget>
    {
        Task <List<ServiceBudget>> GetAllAsyncIncluded();
        Task<ServiceBudget> GetByIdAsyncIncluded(int id);
     }


}