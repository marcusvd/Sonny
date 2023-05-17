using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Pagination.Models;
//using Pagination;

namespace Repository.Contracts
{

    public interface IRepository<T> where T : class
    {
        Task<List<T>> GetAllAsync();
        IQueryable<T> GetAllPagination();
        Task<PagedList<T>> GetPagedAsync(Params parameters);
        Task<T> GetByIdAsync(Expression<Func<T, bool>> predicate);
        Task<List<T>> GetAllByCompanyIdAsync(Expression<Func<T, bool>> predicate);
        Task<int> GetCountByCompanyIdAsync(Expression<Func<T, bool>> predicate);
        void AddAsync(T entity);
        void Update(T entity);
        void Delete(T entity);
    }
}