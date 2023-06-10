using System.Threading.Tasks;
using Domain.Entities.Shared;
using Microsoft.EntityFrameworkCore;
using Repository.Data.Context;
using Repository.Data.Operations.Repository;
using Repository.Data.PersonalData.Contracts;

namespace Repository.Data.PersonalData.Operations
{
    public class ContactsRepository : Repository<Contact>, IContactsRepository
    {
        private readonly SonnyDbContext _CONTEXT;
        public ContactsRepository(SonnyDbContext CONTEXT) : base(CONTEXT)
        {
            _CONTEXT = CONTEXT;
        }

        public async Task<Contact> GetByIdAllIncludedAsync(int id)
        {
            var result = await _CONTEXT.Contacts.Include(x => x.socialnetworks).SingleAsync(x => x.Id == id);
            return result;
        }

    }
}