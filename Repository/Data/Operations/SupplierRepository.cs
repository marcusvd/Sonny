using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Domain.Entities;
using Repository.Data.Context;
using Repository.Data.Contracts;

namespace Repository.Data.Operations
{
    public class SupplierRepository : Repository<Supplier>,ISupplierRepository 
    {
        private readonly SonnyDbContext _CONTEXT;
        public SupplierRepository(SonnyDbContext CONTEXT):base(CONTEXT)
        {
            _CONTEXT = CONTEXT;
        }
        public Task<Supplier[]> GetAll()
        {
            IQueryable<Supplier> query = _CONTEXT.Suppliers
            .AsNoTracking()
            .Include(_address => _address.Address)
            .Include(_contact => _contact.Contact)
            .ThenInclude(_social => _social.socialnetworks)
            .Include(_suppliersT => _suppliersT.SuppliersTypesPayments)
            .OrderBy(_name => _name.Name);

            return query.ToArrayAsync();
        }

        public async Task<Supplier> GetByIdAsync(int Id, bool include)
        {
            IQueryable<Supplier> Result = _CONTEXT.Suppliers.AsNoTracking();
            if (include)
            {
                Result = Result
                .Include(_add => _add.Address)
                .Include(_d => _d.SuppliersTypesPayments)
                .Include(_ctc => _ctc.Contact)
                .ThenInclude(_SocialNet => _SocialNet.socialnetworks);
            }
            return await Result.FirstOrDefaultAsync(_id => _id.Id == Id);
        }

        public async Task<TypePayment> GetTypePaymentByIdAsync(int id)
        {
            IQueryable<TypePayment> query = _CONTEXT.TypesPayments
            .AsNoTracking();
            TypePayment selected = await query.SingleAsync(TPayment => TPayment.Id == id);
            return selected;
        }
        public async Task<TypePayment[]> GetAllTypePaymentAsync()
        {
            IQueryable<TypePayment> query = _CONTEXT.TypesPayments
            .AsNoTracking();
            return await query.ToArrayAsync();
        }







    }
}