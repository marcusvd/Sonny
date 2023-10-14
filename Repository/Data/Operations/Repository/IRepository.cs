using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Pagination.Models;
//using Pagination;

namespace Repository.Data.Operations.Repository
{

    public interface IRepository<T> where T : class
    {
        void AddAsync(T entity);

        void Update(T entity);
        void Delete(T entity);
        Task<List<T>> GetAllAsync();
        IQueryable<T> GetAllPagination();
        IQueryable<T> GetAllPaginationByCompanyId(Expression<Func<T,bool>> predicate);
        // Task<PagedList<T>> GetPagedAsync(Params parameters);
        Task<T> GetByIdAsync(Expression<Func<T, bool>> predicate);
        Task<T> GetById(Expression<Func<T, bool>> predicate);
        Task<List<T>> GetAllByCompanyIdAsync(Expression<Func<T, bool>> predicate);
        Task<int> GetCountByCompanyIdAsync(Expression<Func<T, bool>> predicate);
        Task<List<T>> GetAllProductByStockIdAsync(Expression<Func<T, bool>> predicate);
        Task<T> GetProductByIdByStockIdAsync(Expression<Func<T, bool>> predicateStock, Expression<Func<T, bool>> predicateProd);
    }
}