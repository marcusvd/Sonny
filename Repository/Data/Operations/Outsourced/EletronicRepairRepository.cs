using Domain.Entities.Outsourced;
using Repository.Data.Context;
using Repository.Data.Contracts.Outsourced;

namespace Repository.Data.Operations.Outsourced
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