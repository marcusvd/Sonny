using Domain.Entities.Finances.VariablesDebitsExpenses;
using Repository.Data.Operations.Finances.VariablesDebitsExpenses;
using Repository.Data.Context;
using Repository.Data.Operations.Repository;
using System.Collections.Generic;
using Domain.Entities.Finances.PixExpenses;
using System.Linq;
using System.Linq.Expressions;
using System;
using Microsoft.EntityFrameworkCore.Query;
using System.Threading.Tasks;
using Pagination.Models;

namespace Repository.Data.Operations.Finances.PixesExpenses
{
    public class PixesExpensesRepository : Repository<PixExpense>, IPixesExpensesRepository
    {
        private readonly SonnyDbContext _CONTEXT;
        public PixesExpensesRepository(SonnyDbContext CONTEXT) : base(CONTEXT)
        {
            _CONTEXT = CONTEXT;
        }
     
        public async void AddAsync(PixExpense entity)
        {
            await _CONTEXT.FN_PixExpenses.AddAsync(entity);
        }

   
    }
}