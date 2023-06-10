using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Domain.Entities;
using Repository.Data.Context;
using Repository.Data.Contracts;
using Domain.Entities.Financial;
using Repository.Data.Contracts.Financial;
using Repository.Data.Operations.Repository;

namespace Repository.Data.Operations.Financial
{
    public class TypePaymentRepository : Repository<TypePayment>, ITypePaymentRepository
    {
        private readonly SonnyDbContext _CONTEXT;
        public TypePaymentRepository(SonnyDbContext CONTEXT):base(CONTEXT)
        {
            _CONTEXT = CONTEXT;
        }
    }
}