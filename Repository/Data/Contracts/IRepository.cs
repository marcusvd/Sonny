using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Repository.Contracts
{

    public interface IRepository<T> where T : class
    {

        Task<List<T>> GetAllAsync();
        IQueryable<T> GetAllPagination();
        Task<T> GetByIdAsync(Expression<Func<T, bool>> predicate);
        void AddAsync(T entity);
        void UpdateAsync(T entity);
        void Delete(T entity);
    }
}