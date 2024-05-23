using System.Linq;
using Repository.Data.Context;
using Repository.Data.Operations.Seed.EntitiesSeed;

namespace Repository.Data.Operations.Seed
{
    public class SeedSonnyDb
    {
        private readonly SonnyDbContext _context;
        public SeedSonnyDb(SonnyDbContext context)
        {
            _context = context;
        }

        public async void CheckIfNeededSeed()
        {
            CompanySeed nostopti = new(_context);
            CustomerSeed_NSTI customers = new(_context);
            PartnerSeed_NSTI partners = new(_context);
            Seed_NSTI financials = new(_context);

            if (!_context.MN_Companies.Any())
                nostopti.NoStopTi();

            if (!_context.MN_Customers.Any())
                customers.AddSaveAllAsync();

            if (!_context.MN_Partners.Any())
                partners.AddSaveAllAsync();

            if (!_context.FN_BankAccount.Any())
                 financials.AddBankAccountSaveAllAsync();
            
            if (!_context.FN_FixedExpenses.Any())
                financials.AddExpensesSaveAllAsync();

             await _context.SaveChangesAsync();

        }

    }







}