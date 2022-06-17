
using System.Threading.Tasks;
using Domain.Entities;
using Repository.Contracts;
using Repository.Data.Context;
using Repository.Data.Contracts;

namespace Repository.Data.Operations
{
    public class OsRemoveEquipamentRepository : Repository<OsRemoveEquipament>, IOsRemoveEquipamentRepository
    {
        private readonly SonnyDbContext _CONTEXT;
        public OsRemoveEquipamentRepository(SonnyDbContext CONTEXT):base(CONTEXT)
        {
                _CONTEXT = CONTEXT;
        }

     
    }















}