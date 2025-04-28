using System.Threading.Tasks;
using UnitOfWork.Persistence.Operations;
using Application.Exceptions;
using System;
using System.Net;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

using Domain.Entities.Finances.VariablesDebitsExpenses;
using Application.Services.Operations.Finances.Dtos.VariableDebitExpenses;
using Application.Services.Operations.Finances.CommonForServices;
using Application.Services.Operations.Finances.Dtos;

namespace Application.Services.Operations.Finances.VariablesDebitsExpenses
{
    public class VariablesExpensesServices : InheritanceForFinancialServices, IVariablesExpensesServices
    {
       private readonly IFinancialObjectMapperServices _IObjectMapperServices;
        private readonly IUnitOfWork _GENERIC_REPO;
        private readonly ICommonForFinancialServices _ICOMMONFORFINANCIALSERVICES;
        public VariablesExpensesServices(
            IUnitOfWork GENERIC_REPO,
           IFinancialObjectMapperServices IObjectMapperServices,
            ICommonForFinancialServices ICOMMONFORFINANCIALSERVICES
            )
        {
            _GENERIC_REPO = GENERIC_REPO;
            _IObjectMapperServices = IObjectMapperServices;
            _ICOMMONFORFINANCIALSERVICES = ICOMMONFORFINANCIALSERVICES;
        }
        public async Task<HttpStatusCode> AddAsync(VariableExpenseDto entityDto)
        {
            if (entityDto == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);

            var updated = _IObjectMapperServices.VariableExpenseMapper(entityDto); // Mapping

            updated.Registered = DateTime.Now;
            updated.Expires = updated.WasPaid;
            updated.Deleted = DateTime.MinValue;

            _GENERIC_REPO.VariablesExpenses.Add(updated);
            var bankBalanceUpdate = await _ICOMMONFORFINANCIALSERVICES.GetBankAccountByIdUpdateBalance(updated.BankAccountId ?? 0, updated.Price);

            if (bankBalanceUpdate != null)
                _GENERIC_REPO.BankAccounts.Update(bankBalanceUpdate);

            if (await _GENERIC_REPO.save())
            {
                if (entityDto.PixId != null)
                {
                    var entity = GetByIdSimple(entityDto.Id);
                    _GENERIC_REPO.PixesExpenses.Add(CheckSourcePix(updated, entity.Id, "variable", entityDto.PixExpense));

                    if (await _GENERIC_REPO.save())
                        return HttpStatusCode.Created;
                }


            }

            return HttpStatusCode.BadRequest;

        }
        private async Task<VariableExpense> GetByIdSimple(int variableExpenseId)
        {
            var entityFromDb = await _GENERIC_REPO.VariablesExpenses.GetById(
                          predicate => predicate.Id == variableExpenseId && predicate.Deleted == DateTime.MinValue,
                            null,
                         selector => selector);

            return entityFromDb;
        }
        // private VariableExpense ObjectMapper(VariableExpenseDto dto)
        // {
        //     var objectMapped = new VariableExpense();

        //     objectMapped.Id = dto.Id;
        //     objectMapped.Name = dto.Name;
        //     objectMapped.UserId = dto.UserId;
        //     objectMapped.CompanyId = dto.CompanyId;
        //     objectMapped.CategoryExpenseId = dto.CategoryExpenseId;
        //     objectMapped.SubcategoryExpenseId = dto.SubcategoryExpenseId;
        //     objectMapped.BankAccountId = dto.BankAccountId;
        //     objectMapped.Deleted = dto.Deleted;
        //     objectMapped.CardId = dto.CardId;
        //     objectMapped.PixId = dto.PixId;
        //     objectMapped.Price = dto.Price;
        //     objectMapped.Interest = dto.Interest;
        //     objectMapped.Expires = dto.Expires;
        //     objectMapped.Registered = dto.Registered;
        //     objectMapped.WasPaid = dto.WasPaid;
        //     objectMapped.OthersPaymentMethods = dto.OthersPaymentMethods;
        //     objectMapped.Document = dto.Document;
        //     objectMapped.Place = dto.Place;
        //     objectMapped.Description = dto.Description;
        //     objectMapped.LinkCopyBill = dto.LinkCopyBill;
        //     objectMapped.USERLinkCopyBill = dto.USERLinkCopyBill;
        //     objectMapped.PASSLinkCopyBill = dto.PASSLinkCopyBill;
        //     return objectMapped;
        // }
        public async Task<List<VariableExpenseDto>> GetAllAsync(int companyId)
        {
            var fromDb = await _GENERIC_REPO.VariablesExpenses.Get(
                predicate => predicate.CompanyId == companyId && predicate.Deleted == DateTime.MinValue,
                 toInclude => toInclude.AsNoTracking()
                 .Include(x => x.CategoryExpense)
                 .Include(x => x.SubcategoryExpense),
                selector => selector
                ).AsNoTracking().ToListAsync();

            if (fromDb == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);

            var toViewDto = _IObjectMapperServices.VariableExpenseListMake(fromDb);

            return toViewDto;

        }

    }
}