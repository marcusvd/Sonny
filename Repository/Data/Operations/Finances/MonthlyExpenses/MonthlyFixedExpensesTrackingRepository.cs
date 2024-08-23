using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Domain.Entities.Finances;
using Domain.Entities.Finances.Enums;
using Domain.Entities.Finances.MonthlyExpenses;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
using Repository.Data.Context;
using Repository.Data.Operations.Repository;

namespace Repository.Data.Operations.Finances.MonthlyExpenses
{
    // public class MonthlyFixedExpensesTrackingRepository : Repository<MonthlyFixedExpenseTracking>, IMonthlyFixedExpensesTrackingRepository
    // {
    //     private readonly SonnyDbContext _CONTEXT;
    //     DateTime today = DateTime.Now;
    //     public MonthlyFixedExpensesTrackingRepository(SonnyDbContext CONTEXT) : base(CONTEXT)
    //     {
    //         _CONTEXT = CONTEXT;
    //     }

    // }
}