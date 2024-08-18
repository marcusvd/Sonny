using System.Threading.Tasks;
using Application.Services.Shared.Seed.EntitiesSeed.Financial;
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
            CompanySeed nostopti = new();
            CustomerSeed_NSTI customers = new();
            PartnerSeed_NSTI partners = new();
            FinancialMonthlyExpensesSeed financialMonthlyExpensesSeed = new();
            FinancialYearlyExpensesSeed financialYearlyExpensesSeed = new();
            FinancialBankAccountSeed financialBankAccountSeed = new();
            FinancialCategoriesExpensesSeed financialCategoriesExpensesSeed = new();

            _GENERIC_REPO.Companies.Add(nostopti.NoStopTi());
            _GENERIC_REPO.CategoriesExpenses.AddRangeAsync(financialCategoriesExpensesSeed.categoryExpensesToDb());
            _GENERIC_REPO.Customers.AddRangeAsync(customers.CustomerAdd());
            _GENERIC_REPO.Partners.AddRangeAsync(partners.PartnersReturn());
            _GENERIC_REPO.MonthlyFixedExpenses.AddRangeAsync(financialMonthlyExpensesSeed.AddExpensesSaveAllAsync());
            _GENERIC_REPO.YearlyFixedExpenses.AddRangeAsync(financialYearlyExpensesSeed.AddYearlyExpensesSaveAllAsync());
            _GENERIC_REPO.BankAccounts.AddRangeAsync(financialBankAccountSeed.AddBankAccountSaveAllAsync());

            return await _GENERIC_REPO.save();

        }

    }







}