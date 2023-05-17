using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Linq.Expressions;
using System;
using System.Collections.Generic;
using Repository.Contracts;
using Repository.Data.Context;
using Pagination.Models;

namespace Repository.Data.Operations
{
    public class Repository<T> : IRepository<T> where T : class

    {
        private readonly SonnyDbContext _CONTEXT;
        public Repository(SonnyDbContext CONTEXT)
        {
            _CONTEXT = CONTEXT;
        }

        public void AddAsync(T entity)
        {
            _CONTEXT.Set<T>().Add(entity);
        }

        public void Delete(T entity)
        {
            _CONTEXT.Set<T>().Remove(entity);
        }

        public Task<List<T>> GetAllAsync()
        {
            return _CONTEXT.Set<T>().AsNoTracking().ToListAsync();
        }
        public IQueryable<T> GetAllPagination()
        {
            IQueryable<T> result = _CONTEXT.Set<T>().AsNoTracking();

            return result;
        }
        public async Task<PagedList<T>> GetPagedAsync(Params parameters)
        {
            IQueryable<T> result = _CONTEXT.Set<T>().AsNoTracking();
            return await PagedList<T>.ToPagedList(result, parameters.PgNumber, parameters.PgSize);
        }
        public async Task<T> GetByIdAsync(Expression<Func<T, bool>> predicate)
        {
            return await _CONTEXT.Set<T>().AsNoTracking().SingleOrDefaultAsync(predicate);
        }
        public async Task<List<T>> GetAllByCompanyIdAsync(Expression<Func<T, bool>> predicate)
        {
            return await _CONTEXT.Set<T>().AsNoTracking().Where(predicate).ToListAsync();
        }
        public async Task<int> GetCountByCompanyIdAsync(Expression<Func<T, bool>> predicate)
        {
            return await _CONTEXT.Set<T>().AsNoTracking().Where(predicate).CountAsync();
        }

        public void Update(T entity)
        {
            _CONTEXT.Entry(entity).CurrentValues.SetValues(entity);
            _CONTEXT.Set<T>().Update(entity);
        }

    }

}