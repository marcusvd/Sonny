using System.Threading.Tasks;
using UnitOfWork.Persistence.Operations;
using Application.Exceptions;
using System;
using System.Net;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

using Domain.Entities.Finances.VariablesDebitsExpenses;
using Application.Services.Operations.Finances.CommonForServices;
using Application.Services.Operations.Finances.Dtos;
using Domain.Entities.Finances.Bank;
using Application.Services.Operations.Finances.Dtos.CashWithdrawnExpenses;

namespace Application.Services.Operations.Finances.VariablesDebitsExpenses
{
    public class CashWithdrawnExpensesServices : InheritanceForFinancialServices, ICashWithdrawnExpensesServices
    {
        private readonly IFinancialObjectMapperServices _IObjectMapperServices;
        private readonly IUnitOfWork _GENERIC_REPO;
        private readonly ICommonForFinancialServices _ICOMMONFORFINANCIALSERVICES;
        public CashWithdrawnExpensesServices(
            IUnitOfWork GENERIC_REPO,
           IFinancialObjectMapperServices IObjectMapperServices,
            ICommonForFinancialServices ICOMMONFORFINANCIALSERVICES
            )
        {
            _GENERIC_REPO = GENERIC_REPO;
            _IObjectMapperServices = IObjectMapperServices;
            _ICOMMONFORFINANCIALSERVICES = ICOMMONFORFINANCIALSERVICES;
        }

        public async Task<HttpStatusCode> AddAsync(CashWithdrawnExpenseDto entityDto)
        {
            if (entityDto == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);

            var updated = _IObjectMapperServices.CashWithdrawnExpenseMapper(entityDto); // Mapping

            updated.Registered = DateTime.Now;
            updated.WithdrawnOn = updated.WithdrawnOn;
            updated.Deleted = DateTime.MinValue;

            _GENERIC_REPO.CashWithdrawnExpenses.Add(updated);

            var bankBalanceUpdate = await _ICOMMONFORFINANCIALSERVICES.DecreaseAccountBalance(updated.BankAccountId ?? 0, updated.Price);

            if (bankBalanceUpdate != null)
                _GENERIC_REPO.BankAccounts.Update(bankBalanceUpdate);

            await _GENERIC_REPO.save();

            return HttpStatusCode.BadRequest;
        }

        public async Task<HttpStatusCode> EditAsync(int id, CashWithdrawnExpenseDto entityDto)
        {
            if (entityDto == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);

            if (entityDto.Id != id) throw new Exception(GlobalErrorsMessagesException.IdIsDifferentFromEntityUpdate);

            var fromDb = await GetByIdSimple(entityDto.Id);

            if (entityDto.BankAccountId == fromDb.BankAccountId)
                await BankAccountBalanceUpdate(entityDto, fromDb);
            else
                await BankAccountBalanceUpdateChangeBank(entityDto, fromDb);

            var updated = _IObjectMapperServices.VariableUpdateMapper(entityDto, fromDb);
            updated.Registered = DateTime.Now;

            _GENERIC_REPO.CashWithdrawnExpenses.Update(updated);

            if (await _GENERIC_REPO.save())
                return HttpStatusCode.Created;

            return HttpStatusCode.BadRequest;
        }

        private async Task BankAccountBalanceUpdateChangeBank(CashWithdrawnExpenseDto entityDto, CashWithdrawnExpense fromDb)
        {

            var oldBankAccountBalanceUpdate = await _ICOMMONFORFINANCIALSERVICES.IncreaseAccountBalance(fromDb.BankAccountId ?? 0, fromDb.Price);

            var BankAccountBalanceUpdate = await _ICOMMONFORFINANCIALSERVICES.DecreaseAccountBalance(entityDto.BankAccountId ?? 0, entityDto.Price);


            var bankAccountsUpdate = new List<BankAccount>
                {
                    oldBankAccountBalanceUpdate,
                    BankAccountBalanceUpdate
                };

            if (oldBankAccountBalanceUpdate != null && BankAccountBalanceUpdate != null)
                _GENERIC_REPO.BankAccounts.UpdateRange(bankAccountsUpdate);

        }

        private async Task BankAccountBalanceUpdate(CashWithdrawnExpenseDto entityDto, CashWithdrawnExpense fromDb)
        {
            decimal difference;

            if (entityDto.Price != fromDb.Price)
            {
                BankAccount balanceUpdate;

                if (entityDto.Price < fromDb.Price)
                {
                    difference = fromDb.Price - entityDto.Price;
                    balanceUpdate = await _ICOMMONFORFINANCIALSERVICES.IncreaseAccountBalance(entityDto.BankAccountId ?? 0, difference);
                    if (balanceUpdate != null)
                        _GENERIC_REPO.BankAccounts.Update(balanceUpdate);
                }
                else
                {
                    difference = entityDto.Price - fromDb.Price;
                    balanceUpdate = await _ICOMMONFORFINANCIALSERVICES.DecreaseAccountBalance(entityDto.BankAccountId ?? 0, difference);
                    if (balanceUpdate != null)
                        _GENERIC_REPO.BankAccounts.Update(balanceUpdate);
                }
            }

        }

        private async Task<CashWithdrawnExpense> GetByIdSimple(int id)
        {
            var entityFromDb = await _GENERIC_REPO.CashWithdrawnExpenses.GetById(
                          predicate => predicate.Id == id && predicate.Deleted == DateTime.MinValue,
                            null,
                         selector => selector);

            return entityFromDb;
        }

        public async Task<List<CashWithdrawnExpenseDto>> GetAllAsync(int companyId)
        {
            var fromDb = await _GENERIC_REPO.CashWithdrawnExpenses.Get(
                predicate => predicate.CompanyId == companyId && predicate.Deleted == DateTime.MinValue,
                 toInclude => toInclude.AsNoTracking()
                 .Include(x => x.CategoryExpense)
                 .Include(x => x.SubcategoryExpense)
                 .Include(x => x.BankAccount),
                selector => selector
                ).AsNoTracking().ToListAsync();

            if (fromDb == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);

            var toViewDto = _IObjectMapperServices.CashWithdrawnExpenseListMake(fromDb);

            return toViewDto;
        }

        public async Task<CashWithdrawnExpenseDto> GetByIdFull(int id)
        {
            var fromDb = await _GENERIC_REPO.CashWithdrawnExpenses.GetById(
                x => x.Id == id && x.Deleted == DateTime.MinValue,
                include => include
                .Include(y => y.CategoryExpense)
                .Include(y => y.SubcategoryExpense)
                .Include(y => y.BankAccount)
                .Include(y => y.PaymentsByCreditCards)
                .Include(y => y.PaymentsByPixExpenses),
                selector => selector
                );

            var toViewDto = _IObjectMapperServices.CashWithdrawnExpenseMapper(fromDb);

            return toViewDto;
        }


    }
}