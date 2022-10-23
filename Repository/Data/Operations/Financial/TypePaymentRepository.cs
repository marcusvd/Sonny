using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Domain.Entities;
using Repository.Data.Context;
using Repository.Data.Contracts;
using Domain.Entities.Financial;
using Repository.Data.Contracts.Financial;

namespace Repository.Data.Operations.Financial
{
    public class TypePaymentRepository : Repository<TypePayment>, ITypePaymentRepository
    {
        private readonly SonnyDbContext _CONTEXT;
        public TypePaymentRepository(SonnyDbContext CONTEXT):base(CONTEXT)
        {
            _CONTEXT = CONTEXT;
        }
        public Task<TypePayment[]> GetAll(bool include = false)
        {

            IQueryable<TypePayment> query = _CONTEXT.TypesPayments
            .AsNoTracking();
          

            return query.ToArrayAsync();
        }

        public async Task<TypePayment> GetByIdAsync(int Id, bool include = false)
        {
            IQueryable<TypePayment> Result = _CONTEXT.TypesPayments.AsNoTracking();

            return await Result.FirstOrDefaultAsync(_id => _id.Id == Id);
        }




    }
}