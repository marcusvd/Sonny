using Domain.Entities;
using Repository.Contracts;
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