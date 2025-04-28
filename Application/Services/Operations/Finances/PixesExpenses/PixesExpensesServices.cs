using System.Threading.Tasks;
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
using Application.Services.Operations.Finances.Dtos;

namespace Application.Services.Operations.Finances.PixesExpenses
{
    public class PixesExpensesServices : IPixesExpensesServices
    {
        private readonly IFinancialObjectMapperServices _IObjectMapperServices;
        private readonly IUnitOfWork _GENERIC_REPO;
        private readonly ICommonForFinancialServices _ICOMMONFORFINANCIALSERVICES;
        public PixesExpensesServices(
            IUnitOfWork GENERIC_REPO,
            IFinancialObjectMapperServices IObjectMapperServices,
            ICommonForFinancialServices ICOMMONFORFINANCIALSERVICES
            )
        {
            _GENERIC_REPO = GENERIC_REPO;
            _IObjectMapperServices = IObjectMapperServices;
            _ICOMMONFORFINANCIALSERVICES = ICOMMONFORFINANCIALSERVICES;
        }
        public async Task<HttpStatusCode> AddAsync(PixExpenseDto entityDto)
        {
            if (entityDto == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);
            if (entityDto.BankAccountId == 0) throw new Exception(GlobalErrorsMessagesException.IdIsNull);


            var updated = _IObjectMapperServices.PixExpensesMapper(entityDto);

            updated.Registered = DateTime.Now;

            _GENERIC_REPO.PixesExpenses.Add(updated);
            var bankBalanceUpdate = await _ICOMMONFORFINANCIALSERVICES.GetBankAccountByIdUpdateBalance(entityDto.BankAccountId, updated.Price);

            if (bankBalanceUpdate != null)
                _GENERIC_REPO.BankAccounts.Update(bankBalanceUpdate);

            if (await _GENERIC_REPO.save())
                return HttpStatusCode.Created;

            return HttpStatusCode.BadRequest;

        }

        public async Task<List<PixExpenseDto>> GetAllAsync(int companyId)
        {
            var fromDb = await _GENERIC_REPO.PixesExpenses.Get(
                predicate => predicate.CompanyId == companyId && predicate.Deleted ==DateTime.MinValue,
                 toInclude => toInclude
                 .Include(x => x.PixOut),
                selector => selector
                ).AsNoTracking().ToListAsync();

            if (fromDb == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);

            var toViewDto = _IObjectMapperServices.PixExpensesListMake(fromDb);

            return toViewDto;

        }



    }
}