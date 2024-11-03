using System.Threading.Tasks;
using UnitOfWork.Persistence.Operations;
using System.Collections.Generic;
using System;
using Application.Exceptions;
using Microsoft.EntityFrameworkCore;
using Pagination.Models;
using System.Linq;
using System.Net;


using Domain.Entities.Finances.MonthlyExpenses;
using Application.Services.Operations.Finances.Dtos.MonthlyExpenses;
using Application.Services.Operations.Finances.CommonForServices;
using Application.Services.Operations.Finances.Dtos;
using Application.Services.Operations.Finances.CreditCardExpenses;
using Application.Services.Operations.Finances.Dtos.CreditCardExpenses;

namespace Application.Services.Operations.Finances.MonthlyExpenses
{
    public class MonthlyFixedExpensesServices : InheritanceForFinancialServices, IMonthlyFixedExpensesServices
    {
        private readonly IFinancialObjectMapperServices _IObjectMapperServices;
        private readonly IUnitOfWork _GENERIC_REPO;
        private readonly ICommonForFinancialServices _ICOMMONFORFINANCIALSERVICES;
        private readonly ICreditCardExpensesServices _ICreditCardExpensesServices;
        public MonthlyFixedExpensesServices(
            IUnitOfWork GENERIC_REPO,
           IFinancialObjectMapperServices IObjectMapperServices,
            ICommonForFinancialServices ICOMMONFORFINANCIALSERVICES,
            ICreditCardExpensesServices ICreditCardExpensesServices
            )
        {
            _GENERIC_REPO = GENERIC_REPO;
            _IObjectMapperServices = IObjectMapperServices;
            _ICOMMONFORFINANCIALSERVICES = ICOMMONFORFINANCIALSERVICES;
            _ICreditCardExpensesServices = ICreditCardExpensesServices;
        }
        public async Task<HttpStatusCode> AddRangeAsync(MonthlyFixedExpenseDto entityDto)
        {

            if (entityDto == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);

            entityDto.Registered = DateTime.Now;
            entityDto.Deleted = DateTime.MinValue;

            var expensesList = MonthlyFixedExpensesListMake(entityDto);

            var listToDb = _IObjectMapperServices.MonthlyFixedExpensesListMake(expensesList);

            _GENERIC_REPO.MonthlyFixedExpenses.AddRangeAsync(listToDb);

            if (await _GENERIC_REPO.save())
                return HttpStatusCode.Created;

            return HttpStatusCode.BadRequest;
        }
        public async Task<bool> CreateMonthlyFixedExpensesTrackingForNewYear(int companyId)
        {

            var fromDb = await _GENERIC_REPO.MonthlyFixedExpenses.Get(
                x => x.CompanyId == companyId,
                null
                ).AsNoTracking().ToListAsync();

            fromDb.ForEach(x =>
            {
                if (x.Expires.Year < CurrentDate.Year)
                {
                    var domainToDto = _IObjectMapperServices.MonthlyFixedExpenseMapper(x);
                }

            });

            _GENERIC_REPO.MonthlyFixedExpenses.UpdateRange(fromDb);

            if (await _GENERIC_REPO.save())
            {
                return true;
            }

            return false;
        }
        public async Task<List<MonthlyFixedExpenseDto>> GetAllAsync(int companyId)
        {
            var fromDb = await _GENERIC_REPO.MonthlyFixedExpenses.Get(
                predicate => predicate.CompanyId == companyId && predicate.Deleted == DateTime.MinValue,
                 toInclude => toInclude.AsNoTracking().Include(x => x.CategoryExpense)
                 .Include(x => x.SubcategoryExpense),
                selector => selector
                ).AsNoTracking().ToListAsync();

            if (fromDb == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);

            var toViewDto = _IObjectMapperServices.MonthlyFixedExpensesListMake(fromDb);

            return toViewDto;

        }
        public async Task<PagedList<MonthlyFixedExpenseDto>> GetAllPagedAsync(Params parameters)
        {
            Func<IQueryable<MonthlyFixedExpense>, IOrderedQueryable<MonthlyFixedExpense>> orderBy = null;

            var fromDb = await _GENERIC_REPO.MonthlyFixedExpenses.GetPaged(
              parameters,
                                         predicate => predicate.Id == parameters.predicate && predicate.Deleted == DateTime.MinValue,
                                         toInclude => toInclude.Include(x => x.CategoryExpense),
                                         selector => selector,
                                         orderBy,
                                         null
                );

            if (fromDb == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            var ViewDto = _IObjectMapperServices.MonthlyFixedExpensesListMake(fromDb);

            var PgDto = new PagedList<MonthlyFixedExpenseDto>()
            {
                CurrentPg = fromDb.CurrentPg,
                TotalPgs = fromDb.TotalPgs,
                PgSize = fromDb.PgSize,
                TotalCount = fromDb.TotalCount,
                HasPrevious = fromDb.HasPrevious,
                HasNext = fromDb.HasNext,
                EntitiesToShow = ViewDto
            };
            return PgDto;

        }
        public async Task<MonthlyFixedExpenseDto> GetByIdAllIncluded(int monthlyFixedExpensesI)
        {
            var entityFromDb = await _GENERIC_REPO.MonthlyFixedExpenses.GetById(
                 predicate => predicate.Id == monthlyFixedExpensesI && predicate.Deleted == DateTime.MinValue,
                toInclude =>
                toInclude
                .Include(x => x.CategoryExpense)
                .Include(x => x.SubcategoryExpense)
                .Include(x => x.User)
                .Include(x => x.BankAccount)
                .Include(x => x.Card)
                .Include(x => x.Pix),
                selector => selector);

            if (entityFromDb == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            var toReturnViewDto = _IObjectMapperServices.MonthlyFixedExpenseMapper(entityFromDb);

            return toReturnViewDto;
        }
        public async Task<HttpStatusCode> PaymentAsync(int monthlyFixedExpenseId, MonthlyFixedExpensePaymentDto entity)
        {
            if (entity == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);
            if (monthlyFixedExpenseId != entity.Id) throw new GlobalServicesException(GlobalErrorsMessagesException.IdIsDifferentFromEntityUpdate);

            var fromDb = await _GENERIC_REPO.MonthlyFixedExpenses.GetById(
                x => x.Id == monthlyFixedExpenseId,
                null,
                selector => selector
                );

            if (fromDb == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            var updated = _IObjectMapperServices.MonthlyFixedExpenseMapper(entity);

            updated.Name = fromDb.Name;
            updated.CategoryExpenseId = fromDb.CategoryExpenseId;
            updated.SubcategoryExpenseId = fromDb.SubcategoryExpenseId;
            updated.Expires = fromDb.Expires;
            updated.Registered = fromDb.Registered;
            updated.Description = fromDb.Description;
            updated.LinkCopyBill = fromDb.LinkCopyBill;
            updated.USERLinkCopyBill = fromDb.USERLinkCopyBill;
            updated.PASSLinkCopyBill = fromDb.PASSLinkCopyBill;

            updated.WasPaid = DateTime.Now;
            updated.Price += updated.Interest;

            if (entity.CardId != null)
            {
                var card = await _ICOMMONFORFINANCIALSERVICES.CheckDebitOrCredit(entity.CardId ?? 0);
                if (card != null)
                {
                    var CreditCardExpense = new CreditCardExpenseDto()
                    {
                        UserId = entity.UserId,
                        CompanyId = entity.CompanyId,
                        MonthlyFixedExpenseId = fromDb.Id,
                        Name = updated.Name,
                        CurrentInstallment = "1/1",
                        CategoryExpenseId = fromDb.CategoryExpenseId,
                        SubcategoryExpenseId = fromDb.SubcategoryExpenseId,
                        PaidFromBankAccountId = entity.BankAccountId,
                        Card = _IObjectMapperServices.CardMapper(card),
                        CardId = entity.CardId ?? 0,
                        Price = entity.Price,
                        Expires = new DateTime(fromDb.Expires.Year, fromDb.Expires.Month, card.ExpiresDate.Day),
                        WasPaid = entity.WasPaid,
                        OthersPaymentMethods = entity.OthersPaymentMethods,
                        Document = entity.Document,
                        Description = fromDb.Description,
                        InstallmentsQuantity = 1,
                        InstallmentPrice = updated.Price,
                        TotalPriceInterest = updated.Interest,
                        TotalPercentageInterest = updated.Interest / updated.Price * 100,
                        PaymentAtSight = fromDb.Price,
                        Deleted = DateTime.MinValue,
                        Registered = DateTime.MinValue,
                        ExpenseDay = fromDb.Expires,

                    };

                    await _ICreditCardExpensesServices.AddCreditCardExpenseFromOtherSourcesAsync(CreditCardExpense);
                }

            }

            if (entity.PixId != null)
                _GENERIC_REPO.PixesExpenses.Add(CheckSourcePix(updated, entity.Id, "monthly", entity.PixExpense));

            if (entity.CardId == null)
            {
                var bankBalanceUpdate = await _ICOMMONFORFINANCIALSERVICES.GetBankAccountByIdUpdateBalance(updated.BankAccountId ?? 0, updated.Price);

                if (bankBalanceUpdate != null)
                    _GENERIC_REPO.BankAccounts.Update(bankBalanceUpdate);
            }

            _GENERIC_REPO.MonthlyFixedExpenses.Update(updated);

            if (await _GENERIC_REPO.save())
                return HttpStatusCode.OK;

            return HttpStatusCode.BadRequest;
        }

    }
}