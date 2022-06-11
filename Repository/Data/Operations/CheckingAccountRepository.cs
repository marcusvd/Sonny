using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using Domain.Entities;
using Repository.Data.Context;
using Repository.Data.Contracts;

namespace Repository.Data.Operations
{
    public class CheckingAccountRepository : Repository<CheckingAccount>,ICheckingAccountRepository

    {
        private readonly SonnyDbContext _CONTEXT;
        public CheckingAccountRepository(SonnyDbContext CONTEXT):base(CONTEXT)
        {
            _CONTEXT = CONTEXT;
        }

        // public async Task<CheckingAccount[]> GetAll(bool include = false)
        // {
        //     IQueryable<CheckingAccount> query = _CONTEXT.CheckingAccounts.AsNoTracking();

        //     return await query.ToArrayAsync();
        // }

        // public Task<CheckingAccount> GetByIdAsync(int Id, bool include = false)
        // {
        //     Task<CheckingAccount> query = _CONTEXT.CheckingAccounts.FirstOrDefaultAsync(_chk => _chk.Id == Id);
        //     return query;
        // }
    }
}