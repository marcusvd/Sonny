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
    }
}