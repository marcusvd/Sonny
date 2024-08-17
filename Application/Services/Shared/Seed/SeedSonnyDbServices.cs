using System.Threading.Tasks;
using UnitOfWork.Persistence.Operations;

namespace Application.Services.Shared.Seed.EntitiesSeed
{
    public class SeedSonnyDbServices
    {
        private readonly IUnitOfWork _GENERIC_REPO;
        public SeedSonnyDbServices(IUnitOfWork GENERIC_REPO
        )
        {
            _GENERIC_REPO = GENERIC_REPO;
        }

        public async Task<bool> CheckIfNeededSeed()
        {
            CompanySeed nostopti = new(_GENERIC_REPO);
            CustomerSeed_NSTI customers = new(_GENERIC_REPO);
            PartnerSeed_NSTI partners = new(_GENERIC_REPO);
            FinancialMonthlyExpensesSeed financialMonthlyExpensesSeed = new(_GENERIC_REPO);
            FinancialBankAccountSeed financialBankAccountSeed = new(_GENERIC_REPO);

            // nostopti.checkAndAdd();
            // customers.checkAndAdd();
            //partners.checkAndAdd();
            // financialMonthlyExpensesSeed.checkAndAdd();
            // financialBankAccountSeed.checkAndAdd();


            _GENERIC_REPO.Companies.Add(nostopti.NoStopTi());
            _GENERIC_REPO.Customers.AddRangeAsync(customers.CustomerAdd());
            _GENERIC_REPO.Partners.AddRangeAsync(partners.PartnersReturn());
            _GENERIC_REPO.MonthlyFixedExpenses.AddRangeAsync(financialMonthlyExpensesSeed.AddExpensesSaveAllAsync());
            _GENERIC_REPO.BankAccounts.AddRangeAsync(financialBankAccountSeed.AddBankAccountSaveAllAsync());

            return await _GENERIC_REPO.save();

        }

    }







}