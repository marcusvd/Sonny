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
    public class MonthFixedExpensesTrackingRepository : Repository<MonthFixedExpensesTracking>, IMonthFixedExpensesTrackingRepository
    {
        private readonly SonnyDbContext _CONTEXT;
        DateTime today = DateTime.Now;
        public MonthFixedExpensesTrackingRepository(SonnyDbContext CONTEXT) : base(CONTEXT)
        {
            _CONTEXT = CONTEXT;
        }

        // public void FillFixedExpensesTracking(int companyId)
        // {
        //     var getAllFixedExpenses = _CONTEXT.FN_MonthFixedExpenses.Where(x => x.CompanyId == companyId && x.Deleted != true).AsNoTracking().Include(x => x.MonthFixedExpensesTrackings).ToList();
        // }

        // private MonthFixedExpensesTracking Tracking(int id)
        // {
        //     var entityTracking = new MonthFixedExpensesTracking()
        //     {
        //         UserId = null,
        //         BankAccountId = null,
        //         PixId = null,
        //         CardId = null,
        //         MonthFixedExpensesId = id,
        //         Registered = today,
        //         WasPaid = DateTime.MinValue,
        //         Price = 0,
        //         Interest = 0,
        //         Deleted = false
        //     };
        //     return entityTracking;
        // }

        // private void updateFixedExpensesList(List<MonthFixedExpenses> listFromDb, CyclePaymentEnum cyclePayment)
        // {

        //     var check = listFromDb.Exists(x => x.MonthFixedExpensesTrackings.Count > 0);

        //     if (check)
        //     {
        //         var trackings = listFromDb.SelectMany(x => x.MonthFixedExpensesTrackings).ToList();

        //         var fixedExpensesTrackingIds = trackings.Select(x => x.MonthFixedExpensesId).Distinct().ToList();

        //         List<MonthFixedExpensesTracking> itemsList;

        //         fixedExpensesTrackingIds.ForEach(id =>
        //         {
        //             itemsList = new();
        //             itemsList = trackings.Where(x => x.MonthFixedExpensesId == id).ToList();

        //             // var Exists = cycleCheck(itemsList, cyclePayment);

        //             // if (!Exists)
        //             // {
        //             //     _CONTEXT.FN_MonthFixedExpensesTrackings.Add(Tracking(id));

        //             //     _CONTEXT.SaveChanges();
        //             // }
        //         });

        //     }



        // }

    }
}