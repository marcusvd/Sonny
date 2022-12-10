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
    

    }
}