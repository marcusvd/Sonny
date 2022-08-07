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
    public class ClientRepository : Repository<ClientEntity>, IClientRepository
    {
        private readonly SonnyDbContext _CONTEXT;

        public ClientRepository(SonnyDbContext CONTEXT) : base(CONTEXT)
        {
            _CONTEXT = CONTEXT;
        }

        public async Task<List<ClientEntity>> GetAllIncludedAsync()
        {
            IQueryable<ClientEntity> query =
                _CONTEXT
                    .Clients
                    .AsNoTracking();

            query = query
                                .Include(_address => _address.Address)
                                .Include(_contact => _contact.Contact)
                                .ThenInclude(_networkDevices => _networkDevices.socialnetworks);

            query = query.OrderBy(_name => _name.Name);
            return await query.ToListAsync();
        }

        public async Task<ClientEntity> GetByIdIncludedAsync(int id, bool include = false)
        {
            IQueryable<ClientEntity> query =
                _CONTEXT
                    .Clients
                    .AsNoTracking();
            if (include)
            {
                query = query
                                    .Include(_net => _net.NetworksDevices)
                                    .Include(_address => _address.Address)
                                    .Include(_contact => _contact.Contact)
                                    .ThenInclude(_socialNetwork =>
                                        _socialNetwork.socialnetworks);
            }
            ClientEntity client =
                await query
                    .AsNoTracking()
                    .FirstOrDefaultAsync(_client => _client.Id == id);

            return client;
        }

        public async Task<PagedList<ClientEntity>> GetClientPagedAsync(PgParams parameters)
        {
            var fromDb = _CONTEXT.Clients.AsNoTracking()
            .Include(_net => _net.NetworksDevices)
                                    .Include(_address => _address.Address)
                                    .Include(_contact => _contact.Contact)
                                    .ThenInclude(_socialNetwork =>
                                        _socialNetwork.socialnetworks);
                                        
            return await PagedList<ClientEntity>.ToPagedList(fromDb, parameters.PgNumber, parameters.PgSize);

        }


    }





}
