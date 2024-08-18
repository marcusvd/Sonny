using System.Threading.Tasks;
using Repository.Data.Context;
using Repository.Data.Seed.EntitiesSeed.Financial;
namespace Repository.Data.Seed.EntitiesSeed
{
    public class SeedSonnyDbRepository
    {

        private readonly SonnyDbContext _context;
        private bool _disposed = false;
        public SeedSonnyDbRepository(SonnyDbContext context)
        {
            _context = context;
        }

        public async Task<bool> CheckIfNeededSeed()
        {
            CompanySeed nostopti = new();
            CustomerSeed_NSTI customers = new();
            PartnerSeed_NSTI partners = new();
            FinancialMonthlyExpensesSeed financialMonthlyExpensesSeed = new();
            FinancialBankAccountSeed financialBankAccountSeed = new();

            await _context.AddAsync(nostopti.NoStopTi());

            await _context.AddRangeAsync(customers.CustomerAdd());
            await _context.AddRangeAsync(partners.PartnersReturn());
            await _context.AddRangeAsync(financialMonthlyExpensesSeed.AddExpensesSaveAllAsync());
            await _context.AddRangeAsync(financialBankAccountSeed.AddBankAccountSaveAllAsync());



            // await _context.AddRangeAsync(
            //     nostopti.NoStopTi(),
            //     customers.CustomerAdd(),
            //     partners.PartnersReturn(),
            //     financialMonthlyExpensesSeed.AddExpensesSaveAllAsync(),
            //     financialBankAccountSeed.AddBankAccountSaveAllAsync()
            //  );


            if (await _context.SaveChangesAsync() > 1)
                return true;
            else
            {
                return false;
            }
        }

    }







}