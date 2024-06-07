using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Domain.Entities.Finances;
using Domain.Entities.Finances.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
using Repository.Data.Context;
using Repository.Data.Operations.Repository;

namespace Repository.Data.Operations.Finances
{
    public class FixedExpensesTrackingRepository : Repository<FixedExpensesTracking>, IFixedExpensesTrackingRepository
    {
        private readonly SonnyDbContext _CONTEXT;
        DateTime today = DateTime.Now;
        public FixedExpensesTrackingRepository(SonnyDbContext CONTEXT) : base(CONTEXT)
        {
            _CONTEXT = CONTEXT;
        }

        public void FillFixedExpensesTracking(int companyId)
        {
            var getAllFixedExpenses = _CONTEXT.FN_FixedExpenses.Where(x => x.CompanyId == companyId && x.Deleted != true).AsNoTracking().Include(x => x.FixedExpensesTrackings).ToList();

            // var daily = getAllFixedExpenses.Where(x => x.CyclePayment == CyclePaymentEnum.Daily && x.Deleted != true).ToList();
            var month = getAllFixedExpenses.Where(x => x.CyclePayment == CyclePaymentEnum.Month && x.Deleted != true).ToList();
            var year = getAllFixedExpenses.Where(x => x.CyclePayment == CyclePaymentEnum.Year && x.Deleted != true).ToList();

            // updateFixedExpensesList(daily, CyclePaymentEnum.Daily);
            updateFixedExpensesList(month, CyclePaymentEnum.Month);
            updateFixedExpensesList(year, CyclePaymentEnum.Year);

        }

        private FixedExpensesTracking Tracking(int id)
        {
            var entityTracking = new FixedExpensesTracking()
            {
                UserId = null,
                BankAccountId = null,
                PixId = null,
                CardId = null,
                FixedExpensesId = id,
                Registered = today,
                WasPaid = DateTime.MinValue,
                Price = 0,
                Interest = 0,
                Deleted = false
            };
            return entityTracking;
        }

        private void updateFixedExpensesList(List<FixedExpenses> listFromDb, CyclePaymentEnum cyclePayment)
        {

            var check = listFromDb.Exists(x => x.FixedExpensesTrackings.Count > 0);

            if (check)
            {
                var trackings = listFromDb.SelectMany(x => x.FixedExpensesTrackings).ToList();

                var fixedExpensesTrackingIds = trackings.Select(x => x.FixedExpensesId).Distinct().ToList();

                List<FixedExpensesTracking> itemsList;

                fixedExpensesTrackingIds.ForEach(id =>
                {
                    itemsList = new();
                    itemsList = trackings.Where(x => x.FixedExpensesId == id).ToList();

                    var Exists = cycleCheck(itemsList, cyclePayment);

                    if (!Exists)
                    {
                        _CONTEXT.FN_FixedExpensesTrackings.Add(Tracking(id));

                        _CONTEXT.SaveChanges();
                    }
                });

            }



        }

        private bool cycleCheck(List<FixedExpensesTracking> itemsList, CyclePaymentEnum cycle)
        {

            bool result = true;

            switch (cycle)
            {
                // case CyclePaymentEnum.Daily:
                //     result = itemsList.Exists(x => x.Registered.Day == today.Day && x.Registered.Month == today.Month && x.Registered.Year == today.Year);
                //     break;

                case CyclePaymentEnum.Month:
                    result = itemsList.Exists(x => x.Registered.Month == today.Month && x.Registered.Year == today.Year);
                    break;

                case CyclePaymentEnum.Year:
                    result = itemsList.Exists(x => x.Registered.Year == today.Year);
                    break;
            }


            return result;
        }

    }
}