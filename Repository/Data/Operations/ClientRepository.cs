using System.Threading.Tasks;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using Repository.Data.Context;
using Repository.Data.Contracts;
using System.Collections.Generic;

namespace Repository.Data.Operations
{
    public class ClientRepository : Repository<ClientEntity>, IClientRepository
    {
        private readonly SonnyDbContext _context;

        public ClientRepository(SonnyDbContext CONTEXT):base(CONTEXT)
        {
            _context = CONTEXT;
        }

        public async Task<List<ClientEntity>> GetAllIncludedAsync()
        {
            IQueryable<ClientEntity> query =
                _context
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
                _context
                    .Clients
                    .AsNoTracking();
            if (include)
            {
                query = query
                                    .Include(_net => _net.NetWorkDevices)
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




    }





}
