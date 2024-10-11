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

namespace Application.Services.Operations.Finances.VariablesDebitsExpenses
{
    public class VariablesExpensesServices : InheritanceForFinancialServices, IVariablesExpensesServices
    {
        private readonly IMapper _MAP;
        private readonly IUnitOfWork _GENERIC_REPO;
        private readonly ICommonForFinancialServices _ICOMMONFORFINANCIALSERVICES;
        public VariablesExpensesServices(
            IUnitOfWork GENERIC_REPO,
            IMapper MAP,
            ICommonForFinancialServices ICOMMONFORFINANCIALSERVICES
            )
        {
            _GENERIC_REPO = GENERIC_REPO;
            _MAP = MAP;
            _ICOMMONFORFINANCIALSERVICES = ICOMMONFORFINANCIALSERVICES;
        }
        public async Task<HttpStatusCode> AddAsync(VariableExpenseDto entityDto)
        {
            if (entityDto == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);


            var updated = _MAP.Map<VariableExpense>(entityDto);

            updated.Registered = DateTime.Now;
            updated.Expires = updated.WasPaid;



            _GENERIC_REPO.VariablesExpenses.Add(updated);
            var bankBalanceUpdate = await _ICOMMONFORFINANCIALSERVICES.GetBankAccountByIdUpdateBalance(updated.BankAccountId ?? 0, updated.Price);

            if (bankBalanceUpdate != null)
                _GENERIC_REPO.BankAccounts.Update(bankBalanceUpdate);

            if (await _GENERIC_REPO.save())
            {
                if (entityDto.PixId != null)
                {
                    var entity = GetByIdSimple(entityDto.Id);
                    _GENERIC_REPO.PixesExpenses.Add(CheckSourcePix(entityDto, entity.Id, "variable"));

                    if (await _GENERIC_REPO.save())
                        return HttpStatusCode.Created;
                }


            }

            return HttpStatusCode.BadRequest;

        }


        private async Task<VariableExpense> GetByIdSimple(int variableExpenseId)
        {
            var entityFromDb = await _GENERIC_REPO.VariablesExpenses.GetById(
                          predicate => predicate.Id == variableExpenseId && predicate.Deleted != true,
                            null,
                         selector => selector);

            return entityFromDb;
        }

        public async Task<List<VariableExpenseDto>> GetAllAsync(int companyId)
        {
            var fromDb = await _GENERIC_REPO.VariablesExpenses.Get(
                predicate => predicate.CompanyId == companyId && predicate.Deleted != true,
                 toInclude => toInclude.AsNoTracking()
                 .Include(x => x.CategoryExpense)
                 .Include(x => x.SubcategoryExpense),
                selector => selector
                ).AsNoTracking().ToListAsync();

            if (fromDb == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);

            var toViewDto = _MAP.Map<List<VariableExpenseDto>>(fromDb);

            return toViewDto;

        }



    }
}