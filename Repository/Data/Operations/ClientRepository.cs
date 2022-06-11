using System.Threading.Tasks;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using Repository.Data.Context;
using Repository.Data.Contracts;

namespace Repository.Data.Operations
{
    public class ClientRepository : Repository<ClientEntity>, IClientRepository
    {
        private readonly SonnyDbContext _context;

        public ClientRepository(SonnyDbContext CONTEXT):base(CONTEXT)
        {
            _context = CONTEXT;
        }

        public async Task<ClientEntity[]> GetAllAsync(bool include = false)
        {
            IQueryable<ClientEntity> query =
                _context
                    .Clients
                    .AsNoTracking();
            if (include)
            {
                query = query
                                    .Include(_address => _address.Address)
                                    .Include(_contact => _contact.Contact)
                                    .Include(_networkDevices => _networkDevices.NetWorkDevices)
                                    .ThenInclude(_img => _img.Images);
            }

            query = query.OrderBy(_name => _name.Name);
            return await query.ToArrayAsync();
        }

        public async Task<ClientEntity> GetByIdAsync(int id, bool include = false)
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
