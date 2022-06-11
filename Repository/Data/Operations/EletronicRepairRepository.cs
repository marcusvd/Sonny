using Domain.Entities;
using Repository.Data.Context;
using Repository.Data.Contracts;

namespace Repository.Data.Operations
{
    public class EletronicRepairRepository : Repository<EletronicRepair>, IEletronicRepairRepository
    {

        private readonly SonnyDbContext _CONTEXT;
      public EletronicRepairRepository(SonnyDbContext CONTEXT) : base(CONTEXT)
        {
            _CONTEXT = CONTEXT;
        }

    }
}