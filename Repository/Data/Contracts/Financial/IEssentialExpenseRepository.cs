using Domain.Entities.Financial;
using Repository.Contracts;

namespace Repository.Data.Contracts.Financial
{
    public interface IEssentialExpenseRepository : IRepository<EssentialExpense>
    {
    }
}