
using System.Collections.Generic;
using Domain.Entities.Finances.Bank;
using Repository.Data.Operations.Repository;

namespace Repository.Data.Operations.Finances
{
    public interface ICreditCardLimitOperationsRepository : IRepository<CreditCardLimitOperation>
    {
         void AddRangeAsync(List<CreditCardLimitOperation> entities);
    }
}