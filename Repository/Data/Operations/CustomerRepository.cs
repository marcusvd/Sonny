using System.Linq;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Domain.Entities;
using Pagination.Models;
using Repository.Data.Context;
using Repository.Data.Contracts.Customers;


namespace Repository.Data.Operations
{
    public class CustomerRepository : Repository<Customer>, ICustomerRepository
    {
        private readonly SonnyDbContext _CONTEXT;

        public CustomerRepository(SonnyDbContext CONTEXT) : base(CONTEXT)
        {
            _CONTEXT = CONTEXT;
        }

        public async Task<PagedList<Customer>> GetCustomersPagedAsync(Params parameters)
        {
            IQueryable<Customer> query =
             GetAllPagination().OrderBy(o => o.Name)
            .Where(p => p.Name.ToLower().Contains(parameters.Term));
            return await PagedList<Customer>.ToPagedList(query, parameters.PgNumber, parameters.PgSize);
        }
    }

}
