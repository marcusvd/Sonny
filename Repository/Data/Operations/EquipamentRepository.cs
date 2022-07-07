using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Domain.Entities;
using Repository.Data.Context;
using Repository.Data.Contracts;

namespace Repository.Data.Operations
{
    public class EquipamentRepository :Repository<Equipament>, IEquipamentRepository
    {
        private readonly SonnyDbContext _CONTEXT;
        public EquipamentRepository(SonnyDbContext CONTEXT):base(CONTEXT)
        {
            _CONTEXT = CONTEXT;
        }
        public Task<Equipament[]> GetAll(bool include = false)
        {

            IQueryable<Equipament> query = _CONTEXT.Equipaments
            .AsNoTracking().OrderBy(n=>n.Name);
          

            return query.ToArrayAsync();
        }

        public async Task<Equipament> GetByIdAsync(int Id, bool include = false)
        {
            IQueryable<Equipament> Result = _CONTEXT.Equipaments.AsNoTracking().OrderBy(n => n.Name);

            return await Result.FirstOrDefaultAsync(_id => _id.Id == Id);
        }




    }
}