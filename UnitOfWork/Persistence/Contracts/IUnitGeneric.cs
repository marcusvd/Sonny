using System.Threading.Tasks;
using Repository.Contracts;
using Repository.Data.Context;
using Repository.Data.Contracts;
using UnitOfWork.Persistence.Operations;


namespace UnitOfWork.Persistence.Contracts
{
    public interface IUnitGeneric<T>
    {
        void Add(T entity);  
        Task<bool> save();
    }
}