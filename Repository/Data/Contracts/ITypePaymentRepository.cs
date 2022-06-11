using Domain.Entities;
using Repository.Contracts;

namespace Repository.Data.Contracts
{
    public interface ITypePaymentRepository : IRepository<TypePayment>
    {
        // Task<TypePayment[]> GetAll(bool include = false);
        // Task<TypePayment> GetByIdAsync(int Id, bool include = false);
    }
}