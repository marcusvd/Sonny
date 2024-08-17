using System.Linq;
using Microsoft.EntityFrameworkCore;
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
            // CustomerSeed_NSTI customers = new(_context);
            CustomerSeed_NSTI customers = new();
            PartnerSeed_NSTI partners = new(_context);
            Seed_NSTI financials = new(_context);

            // var nsti = await _context.MN_Companies.AnyAsync();
            // if (!nsti)
                nostopti.NoStopTi();

            // var cust = await _context.MN_Customers.AnyAsync();
            // if (!cust)
                customers.CustomerAdd();

            // var part = await _context.MN_Partners.AnyAsync();
            // if (!part)
                partners.AddSaveAllAsync();

            // var FN_Bank = await _context.FN_BankAccount.AnyAsync();
            // if (!FN_Bank)
                financials.AddBankAccountSaveAllAsync();

            // var FN_Monthly = await _context.FN_MonthlyFixedExpenses.AnyAsync();
            // if (!FN_Monthly)
                financials.AddExpensesSaveAllAsync();

             _context.SaveChanges();
             await _context.DisposeAsync();

        }

    }







}