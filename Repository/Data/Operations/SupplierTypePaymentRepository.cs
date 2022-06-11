using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Repository.Contracts;
using Repository.Data.Context;
using Repository.Data.Contracts;

namespace Repository.Data.Operations
{

    public class SupplierTypePay : Repository<ISupplierTypePaymentRepository>, ISupplierTypePaymentRepository
    {
        private readonly SonnyDbContext _CONTEXT;
        public SupplierTypePay(SonnyDbContext CONTEXT):base(CONTEXT)
        {
            _CONTEXT = CONTEXT;
        }

        public void AddAsync(SupplierTypePayment entity)
        {
            throw new NotImplementedException();
        }

        public void Delete(SupplierTypePayment entity)
        {
            throw new NotImplementedException();
        }

        public Task<SupplierTypePayment> GetByIdAsync(Expression<Func<SupplierTypePayment, bool>> predicate)
        {
           return _CONTEXT.Set<SupplierTypePayment>().SingleOrDefaultAsync(predicate);
        }

        public void UpdateAsync(SupplierTypePayment entity)
        {
            throw new NotImplementedException();
        }

        Task<List<SupplierTypePayment>> IRepository<SupplierTypePayment>.GetAllAsync()
        {
            throw new NotImplementedException();
        }
    }
}