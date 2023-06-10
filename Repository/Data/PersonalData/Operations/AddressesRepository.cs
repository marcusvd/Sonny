using Domain.Entities.Shared;
using Repository.Data.Context;
using Repository.Data.Operations;
using Repository.Data.Operations.Repository;
using Repository.Data.PersonalData.Contracts;

namespace Repository.Data.PersonalData.Operations
{
    public class AddressesRepository : Repository<Address>, IAddressesRepository
    {
        private readonly SonnyDbContext _CONTEXT;
        public AddressesRepository(SonnyDbContext CONTEXT) : base(CONTEXT)
        {
            _CONTEXT = CONTEXT;
        }

    }
}