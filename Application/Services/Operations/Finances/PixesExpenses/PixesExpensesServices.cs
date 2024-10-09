using System.Threading.Tasks;
using AutoMapper;
using UnitOfWork.Persistence.Operations;
using Application.Exceptions;
using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Domain.Entities.Finances.VariablesDebitsExpenses;
using Application.Services.Operations.Finances.Dtos.VariableDebitExpenses;
using System.Net;
using Application.Services.Operations.Finances.CommonForServices;
using Application.Services.Operations.Finances.Dtos.PixExpenses;
using Domain.Entities.Finances.PixExpenses;

namespace Application.Services.Operations.Finances.PixesExpenses
{
    public class PixesExpensesServices : IPixesExpensesServices
    {
        private readonly IMapper _MAP;
        private readonly IUnitOfWork _GENERIC_REPO;
        private readonly ICommonForFinancialServices _ICOMMONFORFINANCIALSERVICES;
        public PixesExpensesServices(
            IUnitOfWork GENERIC_REPO,
            IMapper MAP,
            ICommonForFinancialServices ICOMMONFORFINANCIALSERVICES
            )
        {
            _GENERIC_REPO = GENERIC_REPO;
            _MAP = MAP;
            _ICOMMONFORFINANCIALSERVICES = ICOMMONFORFINANCIALSERVICES;
        }
        public async Task<HttpStatusCode> AddAsync(PixExpenseDto entityDto)
        {
            if (entityDto == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);


            var updated = _MAP.Map<PixExpense>(entityDto);

            updated.Registered = DateTime.Now;

            // _GENERIC_REPO.PixesExpenses.Add(updated);
            // var bankBalanceUpdate = await _ICOMMONFORFINANCIALSERVICES.GetBankAccountByIdUpdateBalance(updated.BankAccountId ?? 0, updated.Price);

            // if (bankBalanceUpdate != null)
            //     _GENERIC_REPO.BankAccounts.Update(bankBalanceUpdate);
            if (await _GENERIC_REPO.save())
                return HttpStatusCode.Created;

            return HttpStatusCode.BadRequest;

        }

        // private PixExpense CheckSourcePix(PixExpenseDto entityDto)
        // {
        //     if (entityDto.MonthlyFixedExpenseId != null)
        //     {

        //     }
        //     if (entityDto.YearlyFixedExpenseId != null)
        //     {

        //     }
        //     if (entityDto.VariableExpenseId != null)
        //     {

        //     }
        //     if (entityDto.FinancingAndLoanExpenseId != null)
        //     {

        //     }
        // }
        // private PixExpense MakeEntityPixBySource(PixExpenseDto entityDto)
        // {

        // }




    }
}