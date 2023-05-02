using Domain.Entities.Outsourced;
using Repository.Data.Context;
using Repository.Data.Contracts.Outsourced;

namespace Repository.Data.Operations.Outsourced
{
    public class ElectronicRepairRepository : Repository<ElectronicRepair>, IElectronicRepairRepository
    {

        private readonly SonnyDbContext _CONTEXT;
      public ElectronicRepairRepository(SonnyDbContext CONTEXT) : base(CONTEXT)
        {
            _CONTEXT = CONTEXT;
        }

    }
}