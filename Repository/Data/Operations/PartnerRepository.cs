using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Domain.Entities;
using Repository.Data.Context;
using Repository.Data.Contracts;

namespace Repository.Data.Operations
{
    public class PartnerRepository : Repository<Partner>,IPartnerRepository
    {
        private readonly SonnyDbContext _CONTEXT;
        public PartnerRepository(SonnyDbContext CONTEXT):base(CONTEXT)
        {
            _CONTEXT = CONTEXT;
        }
        public Task<Partner[]> GetAll(bool include = false)
        {

            IQueryable<Partner> query = _CONTEXT.Partners
            .AsNoTracking()
            .Include(_address => _address.Address)
            .Include(_contact => _contact.Contact)
            .OrderBy(_name => _name.Name);

            return query.ToArrayAsync();
        }

        public async Task<Partner> GetByIdAsync(int Id, bool include = false)
        {
            IQueryable<Partner> Result = _CONTEXT.Partners.AsNoTracking();
            if (include)
            {
                Result = Result
                .Include(_add => _add.Address)
                .Include(_ctc => _ctc.Contact)
                .ThenInclude(entity => entity.socialnetworks);
            }
            return await Result.FirstOrDefaultAsync(_id => _id.Id == Id);
        }


    

    }
}