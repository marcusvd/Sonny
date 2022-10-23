using Domain.Entities;
using Domain.Entities.Financial;
using Repository.Contracts;

namespace Repository.Data.Contracts.Financial
{
    public interface ITypePaymentRepository : IRepository<TypePayment>
    {
        // Task<TypePayment[]> GetAll(bool include = false);
        // Task<TypePayment> GetByIdAsync(int Id, bool include = false);
    }
}