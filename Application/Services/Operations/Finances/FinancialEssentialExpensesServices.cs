using System.Threading.Tasks;
using AutoMapper;
using UnitOfWork.Persistence.Operations;
using System;
using Application.Services.Operations.Finances.Dtos;
using Domain.Entities.Finances;
using Application.Exceptions;
using Application.Services.Operations.Finances.BusinessRulesValidation;
using System.Collections.Generic;
using System.Net;
using Domain.Entities.Finances.Enums;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace Application.Services.Operations.Finances
{
    public class FinancialEssentialExpensesServices : IFinancialEssentialExpensesServices
    {
        private readonly IMapper _MAP;
        private readonly IUnitOfWork _GENERIC_REPO;
        public FinancialEssentialExpensesServices(
                         IUnitOfWork GENERIC_REPO,
                         IMapper MAP
                        )
        {
            _MAP = MAP;
            _GENERIC_REPO = GENERIC_REPO;
        }
        public async Task<HttpStatusCode> AddAsync(FinancialEssentialExpensesDto entityDto)
        {
            if (await CheckToAddAsync(entityDto))
            {

                if (entityDto == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);

                EssentialExpenses entityToDb = _MAP.Map<EssentialExpenses>(entityDto);

                entityToDb.EntryRegister = DateTime.Now;

                _GENERIC_REPO.EssentialExpenses.Add(entityToDb);

                if (await _GENERIC_REPO.save())
                    return HttpStatusCode.Created;
            }

            return HttpStatusCode.BadRequest;
        }
        public async Task<bool> CheckToAddAsync(FinancialEssentialExpensesDto entityDto)
        {

            var expensesBase = await _GENERIC_REPO.Expenses.GetById(
                predicate => predicate.Id == entityDto.ExpensesId,
                null,
                selector => selector
                );

            if (expensesBase == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);

            var essentialExpenses = await _GENERIC_REPO.EssentialExpenses.Get(
                predicate => predicate.ExpensesId == entityDto.ExpensesId,
                null,
                selector => selector
                ).ToListAsync();

            if (essentialExpenses == null)
                return true;

            var now = DateTime.Now;

            if (
                expensesBase.CyclePayment == CyclePaymentEnum.Daily
                && essentialExpenses.Where(x => x.WasPaid.Date == entityDto.WasPaid.Date).Count() > 0)
                throw new Exception("daily");

            if (
                expensesBase.CyclePayment == CyclePaymentEnum.Month
                && essentialExpenses.Where(x => x.WasPaid.Month == entityDto.WasPaid.Month && x.WasPaid.Year == entityDto.WasPaid.Year).Count() > 0)
                throw new Exception("month");
            //Conta de ciclo mensal que consta já esta paga.
            if (
                expensesBase.CyclePayment == CyclePaymentEnum.Year
                && essentialExpenses.Where(x => x.WasPaid.Year == entityDto.WasPaid.Year).Count() > 0)
                throw new Exception("year");


            // if (expensesBase.CyclePayment == CyclePaymentEnum.Month)
            // {
            //     if (expensesBase.CyclePayment == CyclePaymentEnum.Month && essentialExpenses.Where(x => x.WasPaid.Month == entityDto.WasPaid.Month && x.WasPaid.Year == entityDto.WasPaid.Year).Count() > 0)
            //           throw new Exception("Conta de ciclo mensal que consta já esta paga.");
            // }
            // if (expensesBase.CyclePayment == CyclePaymentEnum.Daily)
            // {
            //     //     essentialExpenses.ForEach(x =>
            //     //    {
            //     //        if ()
            //     //            
            //     //    });
            //     // var daily = ;
            //     if (expensesBase.CyclePayment == CyclePaymentEnum.Daily &&essentialExpenses.Where(x => x.WasPaid.Date == entityDto.WasPaid.Date).Count() > 0)
            //         throw new Exception("Conta de ciclo diário que consta já esta paga.");
            // }


            // if (expensesBase.CyclePayment == CyclePaymentEnum.Year)
            // {
            //     //     essentialExpenses.ForEach(x =>
            //     //    {
            //     //        if ()
            //     //            throw new Exception("Teste YEAR");
            //     //    });
            //     // var year = essentialExpenses.Where(x => x.WasPaid.Year == entityDto.WasPaid.Year);
            //     if (expensesBase.CyclePayment == CyclePaymentEnum.Year && essentialExpenses.Where(x => x.WasPaid.Year == entityDto.WasPaid.Year).Count() > 0)
            //         throw new Exception("Conta de ciclo anual que consta já esta paga.");
            // }

            return true;

        }







    }

}