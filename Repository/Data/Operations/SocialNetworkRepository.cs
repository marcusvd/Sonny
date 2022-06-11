using System.Linq;
using System.Threading.Tasks;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Repository.Data.Context;
using Repository.Data.Contracts;

namespace Repository.Data.Operations
{

    public class SocialNetworkRepository : Repository<SocialNetwork>, ISocialNetworkRepository
    {
        private readonly SonnyDbContext _CONTEXT;
        public SocialNetworkRepository(SonnyDbContext CONTEXT):base(CONTEXT)
        {
            _CONTEXT = CONTEXT;
        }
        public async Task<SocialNetwork[]> GetAllAsync()
        {
            IQueryable<SocialNetwork> query = _CONTEXT.socialnetworks.AsNoTracking()
            .OrderBy(_name => _name.Name);
            return await query.ToArrayAsync();
        }
        public async Task<SocialNetwork> GetByIdAsync(int id, bool include)
        {
            IQueryable<SocialNetwork> query = _CONTEXT.socialnetworks.Where(_id => _id.Id == id).Select(obj => obj).AsNoTracking();
            return await query.FirstOrDefaultAsync();
        }



    }
}