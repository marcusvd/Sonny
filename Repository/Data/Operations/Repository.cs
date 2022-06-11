using System.Threading.Tasks;
using Domain.Entities;
using Repository.Data;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Linq.Expressions;
using System;
using System.Collections.Generic;
using Repository.Contracts;
using Repository.Data.Context;

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
       
        public async Task<T> GetByIdAsync(Expression<Func<T, bool>> predicate)
        {
            return await _CONTEXT.Set<T>().AsNoTracking().SingleOrDefaultAsync(predicate);
        }

        public void UpdateAsync(T entity)
        {
            _CONTEXT.Entry(entity).State = EntityState.Modified;
            _CONTEXT.Set<T>().Update(entity);
        }

    }

}