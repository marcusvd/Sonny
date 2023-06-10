using Domain.Entities.Financial;
using Repository.Data.Operations.Repository;

namespace Repository.Data.Contracts.Financial
{
    public interface IEssentialExpenseRepository : IRepository<EssentialExpense>
    {
    }
}