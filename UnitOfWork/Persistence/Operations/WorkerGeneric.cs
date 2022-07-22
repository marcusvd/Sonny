
using System.Threading.Tasks;
using Domain.Entities;
using Repository.Data.Context;
using Repository.Data.Contracts;
using Repository.Data.Operations;
using UnitOfWork.Persistence.Contracts;

namespace UnitOfWork.Persistence.Operations
{
    public class WorkerGeneric<T> : IUnitGeneric<T> where T : class
    {

        private readonly SonnyDbContext _CONTEXT;
        public WorkerGeneric(SonnyDbContext CONTEXT)
        {
            _CONTEXT = CONTEXT;
        }

        public void Add(T entity)
        {
            _CONTEXT.Add(entity);
        }

        

        public async Task<bool> save()
        {
            return await _CONTEXT.SaveChangesAsync() > 0;            
        }
    }
}
