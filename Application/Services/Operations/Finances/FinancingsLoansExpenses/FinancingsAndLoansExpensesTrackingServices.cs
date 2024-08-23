using System.Threading.Tasks;
using AutoMapper;
using UnitOfWork.Persistence.Operations;
using System;

using Application.Exceptions;
using System.Collections.Generic;
using System.Net;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using Pagination.Models;
using Domain.Entities.Finances.FinancingsLoansExpenses;
using Application.Services.Operations.Finances.Dtos.FinancingsLoansExpenses;

// namespace Application.Services.Operations.Finances.FinancingsLoansExpenses
// {
//     public class FinancingAndLoanExpenseTrackingServices : IFinancingsAndLoansExpensesTrackingServices
//     {
//         private readonly IMapper _MAP;
//         private readonly IUnitOfWork _GENERIC_REPO;
//         public FinancingAndLoanExpenseTrackingServices(
//                          IUnitOfWork GENERIC_REPO,
//                          IMapper MAP
//                         )
//         {
//             _MAP = MAP;
//             _GENERIC_REPO = GENERIC_REPO;
//         }
//         // public void AddEssentialExpensesTest(int companyId)
//         // {
//         //     _GENERIC_REPO.MonthFixedExpensesTrackings.FillFixedExpensesTracking(companyId);
//         // }
//         public async Task<HttpStatusCode> AddAsync(FinancingAndLoanExpenseTrackingDto entityDto)
//         {
//             // if (await CheckToAddAsync(entityDto))
//             // {

//                 if (entityDto == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);

//                 FinancingAndLoanExpenseTracking entityToDb = _MAP.Map<FinancingAndLoanExpenseTracking>(entityDto);

//                 _GENERIC_REPO.FinancingsAndLoansExpensesTrackings.Add(entityToDb);

//                 if (await _GENERIC_REPO.save())
//                     return HttpStatusCode.Created;
//             // }

//             return HttpStatusCode.BadRequest;
//         }
//         // public async Task<bool> CheckToAddAsync(FinancingAndLoanExpenseTrackingDto entityDto)
//         // {

//         //     var expensesBase = await _GENERIC_REPO.MonthFixedExpenses.GetById(
//         //         predicate => predicate.Id == entityDto.MonthFixedExpensesId,
//         //         null,
//         //         selector => selector
//         //         );

//         //     if (expensesBase == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);

//         //     var FixedExpensesTracking = await _GENERIC_REPO.FinancingsAndLoansExpensesTrackings.Get(
//         //         predicate => predicate.MonthFixedExpensesId == entityDto.MonthFixedExpensesId,
//         //         null,
//         //         selector => selector
//         //         ).ToListAsync();

//         //     if (FixedExpensesTracking == null)
//         //         return true;
     
//         //     return true;

//         // }

//         public async Task<PagedList<FinancingAndLoanExpenseTrackingDto>> GetAllPagedAsync(Params parameters)
//         {
//             Func<IQueryable<FinancingAndLoanExpenseTracking>, IOrderedQueryable<FinancingAndLoanExpenseTracking>> orderBy = null;

//             var fromDb = await _GENERIC_REPO.FinancingsAndLoansExpensesTrackings.GetPaged(
//               parameters,
//                                          predicate => predicate.CompanyId == parameters.predicate && predicate.Deleted != true,
//                                          toInclude => toInclude.Include(x => x.FinancingAndLoanExpense),
//                                          selector => selector,
//                                          orderBy,
//                                          null
//                 );

//             if (fromDb == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

//             var ViewDto = _MAP.Map<List<FinancingAndLoanExpenseTrackingDto>>(fromDb);

//             var PgDto = new PagedList<FinancingAndLoanExpenseTrackingDto>()
//             {
//                 CurrentPg = fromDb.CurrentPg,
//                 TotalPgs = fromDb.TotalPgs,
//                 PgSize = fromDb.PgSize,
//                 TotalCount = fromDb.TotalCount,
//                 HasPrevious = fromDb.HasPrevious,
//                 HasNext = fromDb.HasNext,
//                 EntitiesToShow = ViewDto
//             };
//             return PgDto;

//         }
//         public async Task<List<FinancingAndLoanExpenseTrackingDto>> GetAllByCompanyIdAsync(int id)
//         {

//             var fromDb = await _GENERIC_REPO.FinancingsAndLoansExpensesTrackings.Get(
//                 x => x.CompanyId == id && x.Deleted != true,
//                 toInclude => toInclude.Include(x => x.FinancingAndLoanExpense)
//                .ThenInclude(x=> x.CategoryExpense)
//                .Include(x=> x.FinancingAndLoanExpense)
//                .ThenInclude(x=> x.SubcategoryExpense),
//                 selector => selector,
//                 orderBy => orderBy.OrderBy(x => x.FinancingAndLoanExpense.CategoryExpense)
//                 ).ToListAsync();

//             var toReturn = _MAP.Map<List<FinancingAndLoanExpenseTrackingDto>>(fromDb);

//             if (fromDb == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

//             return toReturn;
//         }

//         public async Task<FinancingAndLoanExpenseTrackingDto> GetByIdAllIncluded(int FixedExpensesTrackingId)
//         {

//             var entityFromDb = await _GENERIC_REPO.FinancingsAndLoansExpensesTrackings.GetById(
//                  predicate => predicate.Id == FixedExpensesTrackingId && predicate.Deleted != true,
//                 toInclude =>
//                 toInclude
//                 .Include(x => x.Company)
//                 .Include(x => x.User)
//                 .Include(x => x.FinancingAndLoanExpense)
//                 .ThenInclude(x=> x.CategoryExpense)
//                 .Include(x => x.FinancingAndLoanExpense)
//                 .ThenInclude(x=> x.SubcategoryExpense)
//                 .Include(x => x.BankAccount)
//                 .Include(x => x.Card)
//                 .Include(x => x.Pix),
//                 selector => selector);

//             if (entityFromDb == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

//             var toReturnViewDto = _MAP.Map<FinancingAndLoanExpenseTrackingDto>(entityFromDb);

//             return toReturnViewDto;



//         }

//         public async Task<HttpStatusCode> UpdateAsync(int fixedExpensesTrackingId, FinancingAndLoanExpenseTrackingDto entity)
//         {
//             if (entity == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);
//             if (fixedExpensesTrackingId != entity.Id) throw new GlobalServicesException(GlobalErrorsMessagesException.IdIsDifferentFromEntityUpdate);

//             var fromDb = await _GENERIC_REPO.FinancingsAndLoansExpensesTrackings.GetById(
//                 x => x.Id == fixedExpensesTrackingId,
//                 null,
//                 selector => selector
//                 );

//             var updated = _MAP.Map(entity, fromDb);
//             updated.WasPaid = DateTime.Now;

//             _GENERIC_REPO.FinancingsAndLoansExpensesTrackings.Update(updated);

//             var result = await _GENERIC_REPO.save();

//             if (result)
//                 return HttpStatusCode.OK;

//             return HttpStatusCode.BadRequest;
//         }

//     }

// }