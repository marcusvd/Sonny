using System.Threading.Tasks;
using Application.Services.Operations.Authentication.Register;
using Application.Services.Shared.Seed.EntitiesSeed.Financial;
using UnitOfWork.Persistence.Operations;

namespace Application.Services.Shared.Seed.EntitiesSeed
{
    public class SeedSonnyDbServices
    {
        private readonly IUnitOfWork _GENERIC_REPO;
        private readonly IRegisterServices _iRegisterServices;
        public SeedSonnyDbServices(IUnitOfWork GENERIC_REPO, IRegisterServices iRegisterServices)
        {
            _GENERIC_REPO = GENERIC_REPO;
            _iRegisterServices = iRegisterServices;
        }

        public async Task<bool> CheckIfNeededSeed()
        {
            AuthenticationSeed auth = new(_iRegisterServices);
            CustomerSeed_NSTI customers = new();
            PartnerSeed_NSTI partners = new();
            BankAccountSeed bankAccountSeed = new();
            FinancialMonthlyExpensesSeed monthlyExpensesSeed = new();
            FinancingsAndLoansExpensesSeed financingsAndLoansExpensesSeed = new();
            YearlyExpensesSeed yearlyExpensesSeed = new();
            CategoriesExpensesSeed categoriesExpensesSeed = new();
            VariableExpensesSeed variableExpensesSeed = new();

            await auth.AddUser();
            _GENERIC_REPO.CategoriesExpenses.AddRangeAsync(categoriesExpensesSeed.CategoryExpensesToDb());
            _GENERIC_REPO.Customers.AddRangeAsync(customers.CustomerAdd());
            _GENERIC_REPO.Partners.AddRangeAsync(partners.PartnersReturn());
            _GENERIC_REPO.BankAccounts.AddRangeAsync(bankAccountSeed.AddBankAccountSaveAllAsync());
           // _GENERIC_REPO.CreditCards.Add(bankAccountSeed.SingleCreditCard());
            _GENERIC_REPO.MonthlyFixedExpenses.AddRangeAsync(monthlyExpensesSeed.MakeMonthlyFixedExpenseList());
            _GENERIC_REPO.YearlyFixedExpenses.AddRangeAsync(yearlyExpensesSeed.AddYearlyExpensesSaveAllAsync());
            _GENERIC_REPO.FinancingsAndLoansExpenses.AddRangeAsync(financingsAndLoansExpensesSeed.FinancingLoansExpenses(financingsAndLoansExpensesSeed.FinancingAndLoan01()));
            _GENERIC_REPO.VariablesExpenses.AddRangeAsync(variableExpensesSeed.AddVariableExpensesAsync());

            return await _GENERIC_REPO.save();
        }

    }







}