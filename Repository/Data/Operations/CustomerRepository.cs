using System.Threading.Tasks;
using Domain.Entities;
using Pagination;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using Repository.Data.Context;
using Repository.Data.Contracts;
using System.Collections.Generic;

namespace Repository.Data.Operations
{
    public class CustomerRepository : Repository<Customer>, ICustomerRepository
    {
        private readonly SonnyDbContext _CONTEXT;

        public CustomerRepository(SonnyDbContext CONTEXT) : base(CONTEXT)
        {
            _CONTEXT = CONTEXT;
        }
    }

}
