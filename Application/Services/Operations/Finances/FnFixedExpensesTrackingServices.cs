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
    public class FnFixedExpensesTrackingServices : IFnFixedExpensesTrackingServices
    {
        private readonly IMapper _MAP;
        private readonly IUnitOfWork _GENERIC_REPO;
        public FnFixedExpensesTrackingServices(
                         IUnitOfWork GENERIC_REPO,
                         IMapper MAP
                        )
        {
            _MAP = MAP;
            _GENERIC_REPO = GENERIC_REPO;
        }
        public void AddEssentialExpensesTest(int companyId)
        {
            _GENERIC_REPO.FixedExpensesTrackings.FillFixedExpensesTracking(companyId);
        }
        public async Task<HttpStatusCode> AddAsync(FixedExpensesTrackingDto entityDto)
        {
            if (await CheckToAddAsync(entityDto))
            {

                if (entityDto == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);

                FixedExpensesTracking entityToDb = _MAP.Map<FixedExpensesTracking>(entityDto);

                _GENERIC_REPO.FixedExpensesTrackings.Add(entityToDb);

                if (await _GENERIC_REPO.save())
                    return HttpStatusCode.Created;
            }

            return HttpStatusCode.BadRequest;
        }
        public async Task<bool> CheckToAddAsync(FixedExpensesTrackingDto entityDto)
        {

            var expensesBase = await _GENERIC_REPO.FixedExpenses.GetById(
                predicate => predicate.Id == entityDto.FixedExpensesId,
                null,
                selector => selector
                );

            if (expensesBase == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);

            var FixedExpensesTracking = await _GENERIC_REPO.FixedExpensesTrackings.Get(
                predicate => predicate.FixedExpensesId == entityDto.FixedExpensesId,
                null,
                selector => selector
                ).ToListAsync();

            if (FixedExpensesTracking == null)
                return true;

            var now = DateTime.Now;

            if (
                expensesBase.CyclePayment == CyclePaymentEnum.Daily
                && FixedExpensesTracking.Where(x => x.WasPaid.Date == entityDto.WasPaid.Date).Count() > 0)
                throw new Exception("daily");

            if (
                expensesBase.CyclePayment == CyclePaymentEnum.Month
                && FixedExpensesTracking.Where(x => x.WasPaid.Month == entityDto.WasPaid.Month && x.WasPaid.Year == entityDto.WasPaid.Year).Count() > 0)
                throw new Exception("month");
            //Conta de ciclo mensal que consta já esta paga.
            if (
                expensesBase.CyclePayment == CyclePaymentEnum.Year
                && FixedExpensesTracking.Where(x => x.WasPaid.Year == entityDto.WasPaid.Year).Count() > 0)
                throw new Exception("year");


            // if (expensesBase.CyclePayment == CyclePaymentEnum.Month)
            // {
            //     if (expensesBase.CyclePayment == CyclePaymentEnum.Month && FixedExpensesTracking.Where(x => x.WasPaid.Month == entityDto.WasPaid.Month && x.WasPaid.Year == entityDto.WasPaid.Year).Count() > 0)
            //           throw new Exception("Conta de ciclo mensal que consta já esta paga.");
            // }
            // if (expensesBase.CyclePayment == CyclePaymentEnum.Daily)
            // {
            //     //     FixedExpensesTracking.ForEach(x =>
            //     //    {
            //     //        if ()
            //     //            
            //     //    });
            //     // var daily = ;
            //     if (expensesBase.CyclePayment == CyclePaymentEnum.Daily &&FixedExpensesTracking.Where(x => x.WasPaid.Date == entityDto.WasPaid.Date).Count() > 0)
            //         throw new Exception("Conta de ciclo diário que consta já esta paga.");
            // }


            // if (expensesBase.CyclePayment == CyclePaymentEnum.Year)
            // {
            //     //     FixedExpensesTracking.ForEach(x =>
            //     //    {
            //     //        if ()
            //     //            throw new Exception("Teste YEAR");
            //     //    });
            //     // var year = FixedExpensesTracking.Where(x => x.WasPaid.Year == entityDto.WasPaid.Year);
            //     if (expensesBase.CyclePayment == CyclePaymentEnum.Year && FixedExpensesTracking.Where(x => x.WasPaid.Year == entityDto.WasPaid.Year).Count() > 0)
            //         throw new Exception("Conta de ciclo anual que consta já esta paga.");
            // }

            return true;

        }







    }

}