using Repository.Data.Context;
using Repository.Data.Operations.Repository;
using Domain.Entities.Finances.FinancingsLoansExpenses;

 namespace Repository.Data.Operations.Finances.FinancingsLoansExpenses
 {
     public class FinancingsAndLoansExpensesInstallmentRepository : Repository<FinancingAndLoanExpenseInstallment>, IFinancingsAndLoansExpensesInstallmentRepository
     {
         private readonly SonnyDbContext _CONTEXT;
         public FinancingsAndLoansExpensesInstallmentRepository(SonnyDbContext CONTEXT) : base(CONTEXT)
         {
             _CONTEXT = CONTEXT;
         }
     }
 }