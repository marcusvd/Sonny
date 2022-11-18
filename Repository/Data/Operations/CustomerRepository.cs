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

        public async Task<List<Customer>> GetAllIncludedAsync()
        {
            IQueryable<Customer> query =
                _CONTEXT
                    .Customers
                    .AsNoTracking();

            query = query
                                .Include(_address => _address.Address)
                                .Include(_contact => _contact.Contact)
                                .ThenInclude(_networkDevices => _networkDevices.socialnetworks);

            query = query.OrderBy(_name => _name.Name);
            return await query.ToListAsync();
        }

        public async Task<Customer> GetByIdAllIncludedAsync(int id)
        {
            Task<Customer> result = _CONTEXT.Customers.AsNoTracking().Include(_net => _net.NetworksDevices)
                                    .Include(_address => _address.Address)
                                    .Include(_contact => _contact.Contact)
                                    .ThenInclude(_socialNetworks => _socialNetworks.socialnetworks)
                                      .Include(_destinyCollectDelivers => _destinyCollectDelivers.DestinyCollectDelivers)
                                      .Include(_networksDevices => _networksDevices.NetworksDevices)
                                      .Include(_servicesBudgets => _servicesBudgets.ServicesBudgets)
                                      .Include(_sourceCollectDelivers => _sourceCollectDelivers.SourceCollectDelivers)
                                      .FirstOrDefaultAsync(_customer => _customer.Id == id);
            return await result;
        }

        public async Task<Customer> GetByIdAsync(int id)
        {
            Task<Customer> query =
             _CONTEXT.Customers.AsNoTracking()
             .FirstOrDefaultAsync(_customer => _customer.Id == id);
            return await query;
        }


        public async Task<PagedList<Customer>> GetClientPagedAsync(PgParams parameters)
        {
            var fromDb = _CONTEXT.Customers.AsNoTracking()
            .Include(_net => _net.NetworksDevices)
                                    .Include(_address => _address.Address)
                                    .Include(_contact => _contact.Contact)
                                    .ThenInclude(_socialNetwork =>
                                        _socialNetwork.socialnetworks);

            return await PagedList<Customer>.ToPagedList(fromDb, parameters.PgNumber, parameters.PgSize);

        }


    }





}
