using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Query;
using Pagination.Models;
//using Pagination;

namespace Repository.Data.Operations.Repository
{

    public interface IRepository<T> where T : class
    {
        void Add(T entity);
        void Update(T entity);
        void Delete(T entity);
        Task<int> GetCount(Expression<Func<T, bool>> predicate);
        IQueryable<T> Get(
                                Expression<Func<T, bool>> predicate = null,
                                Func<IQueryable<T>, IIncludableQueryable<T, object>> include = null,
                                Expression<Func<T, T>> selector = null,
                                Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null,
                                Expression<Func<T, bool>> termPredicate = null,
                                bool disableTracking = true
        );
        Task<T> GetById(Expression<Func<T, bool>> predicate = null, Func<IQueryable<T>, IIncludableQueryable<T, object>> include = null, Expression<Func<T, T>> selector = null, Func<IQueryable<T>, IOrderedQueryable<T>> ordeBy = null, bool disableTracking = true);
        // Task<Page<T>> GetPaged(
        //      Params parameters,
        //     Expression<Func<T, bool>> predicate = null,
        //     Func<IQueryable<T>, IIncludableQueryable<T, object>> include = null,
        //     Expression<Func<T, T>> selector = null,
        //     Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null,
        //     Expression<Func<T, bool>> termPredicate = null,
        //     bool noTraking = true
        // );
        Task<Page<T>> GetPaged(
             Params parameters,
            Expression<Func<T, bool>> predicate = null,
            Func<IQueryable<T>, IIncludableQueryable<T, object>> include = null,
            Expression<Func<T, T>> selector = null,
            Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null,
            Expression<Func<T, bool>> termPredicate = null,
            bool noTraking = true
        );

        // Task<List<T>> GetAllAsync();
        // IQueryable<T> GetAllPagination();
        // IQueryable<T> GetAllPaginationByCompanyId(Expression<Func<T,bool>> predicate);
        // Task<T> GetByIdAsync(Expression<Func<T, bool>> predicate);
        // Task<T> GetById(Expression<Func<T, bool>> predicate);
        // Task<List<T>> GetAllByCompanyIdAsync(Expression<Func<T, bool>> predicate);
        // Task<int> GetCountByCompanyIdAsync(Expression<Func<T, bool>> predicate);
        // Task<List<T>> GetAllProductByStockIdAsync(Expression<Func<T, bool>> predicate);
        // Task<T> GetProductByIdByStockIdAsync(Expression<Func<T, bool>> predicateStock, Expression<Func<T, bool>> predicateProd);
    }
}