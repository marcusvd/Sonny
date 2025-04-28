// using System.Threading.Tasks;
// using Application.Services.Operations.BenchBudgetService.Dtos;
// using AutoMapper;
// using UnitOfWork.Persistence.Operations;
// using System.Linq;
// using Domain.Entities.ServicesBench.Enums;
// using System;
// using Application.Exceptions;
// using System.Collections.Generic;
// using Pagination.Models;
// using Application.Services.Operations.BenchBudgetService.Dtos.Enums;
// using Microsoft.EntityFrameworkCore;

// namespace Application.Services.Operations.BenchBudgetService
// {
//     public class BudgetServiceGetServices : IBudgetServiceGetServices
//     {
//         private readonly IMapper _MAP;
//         private readonly IUnitOfWork _GENERIC_REPO;
//         public BudgetServiceGetServices(IMapper MAP, IUnitOfWork GENERIC_REPO)
//         {
//             _MAP = MAP;
//             _GENERIC_REPO = GENERIC_REPO;

//         }
//         public async Task<Page<BudgetServiceDto>> GetBudgetCustomerIncludeAsync(Params parameters)
//         {
//             var fromDb = await _GENERIC_REPO.BudgetsServices.GetBudgetCustomerIncludeAsync(parameters, selector => selector, orderBy => orderBy.OrderBy(x => x.Id));

//             if (fromDb == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);

//             var viewDto = _MAP.Map<List<BudgetServiceDto>>(fromDb);

//             // viewDto = viewDto.Where(x => x.Service == null).ToList();

//             var pagedToReturn = new Page<BudgetServiceDto>()
//             {
//                 CurrentPg = fromDb.CurrentPg,
//                 TotalPgs = fromDb.TotalPgs,
//                 PgSize = fromDb.PgSize,
//                 TotalCount = fromDb.TotalCount,
//                 HasPrevious = fromDb.HasPrevious,
//                 HasNext = fromDb.HasNext,
//                 EntitiesToShow = viewDto
//             };

//             return pagedToReturn;
//         }
//         public async Task<int> GetBudgetCountByCompanyIdAsync(int companyId)
//         {
//             var fromDb = await _GENERIC_REPO.BudgetsServices.Get(
//                 x => x.CompanyId == companyId,
//                 toInclude => toInclude.Include(x => x.Service)
//             ).ToListAsync();

//             if (fromDb == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);

//             var toFilter = _MAP.Map<List<BudgetServiceDto>>(fromDb);

//             var filtered = toFilter.Where(x => x.Service == null).Count();

//             return filtered;
//         }
//         public async Task<int> GetServiceCountByCompanyIdAsync(int companyId)
//         {

//             var fromDb = await _GENERIC_REPO.BudgetsServices.Get(
//                 x => x.CompanyId == companyId,
//                 include => include.Include(x => x.Service)
//             ).ToListAsync();

//             if (fromDb == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);

//             var toFilter = _MAP.Map<List<BudgetServiceDto>>(fromDb);

//             var filtered = toFilter.Where(x => x.Service != null).Count();

//             return filtered;

//         }
//         public async Task<int> GetServicesCountByCustomerIdAsync(int customerId)
//         {

//             var fromDb = await _GENERIC_REPO.BudgetsServices.Get(
//                 x => x.CustomerId == customerId,
//                 toInclude => toInclude.Include(x => x.Service)
//             ).ToListAsync();

//             if (fromDb == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);

//             var toFilter = _MAP.Map<List<BudgetServiceDto>>(fromDb);

//             var filtered = toFilter.Where(x => x.Service != null).Count();

//             return filtered;

//         }
//         public async Task<Page<BudgetServiceDto>> GetServiceCustomerIncludeAsync(Params parameters)
//         {
//             var fromDb = await _GENERIC_REPO.BudgetsServices.GetServiceCustomerIncludeAsync(parameters,
//             selector => selector,
//             orderBy => orderBy.OrderBy(x => x.Id)
//             );

//             if (fromDb == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);

//             List<BudgetServiceDto> ViewDto = _MAP.Map<List<BudgetServiceDto>>(fromDb);

//             var pagedToReturn = new Page<BudgetServiceDto>()
//             {
//                 CurrentPg = fromDb.CurrentPg,
//                 TotalPgs = fromDb.TotalPgs,
//                 PgSize = fromDb.PgSize,
//                 TotalCount = fromDb.TotalCount,
//                 HasPrevious = fromDb.HasPrevious,
//                 HasNext = fromDb.HasNext,
//                 EntitiesToShow = ViewDto
//             };

//             return pagedToReturn;
//         }
//         public async Task<Page<BudgetServiceDto>> GetServiceByIdCustomerAsync(Params parameters)
//         {
//             var fromDb = await _GENERIC_REPO.BudgetsServices.GetPaged(parameters,
//             predicate => predicate.CustomerId == parameters.predicate,
//             toInclude => toInclude.Include(x => x.Service),
//             selector => selector,
//             orderBy => orderBy.OrderBy(x => x.Id),
//             termPredicate => termPredicate.Service != null
//             );
//             // var fromDb = await _GENERIC_REPO.BudgetsServices.GetPaged(parameters,
//             // predicate => predicate.CustomerId == parameters.predicate,
//             // null,
//             // selector => selector,
//             // orderBy => orderBy.OrderBy(x=> x.Id)
//             // );

//             if (fromDb == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);

//             List<BudgetServiceDto> ViewDto = _MAP.Map<List<BudgetServiceDto>>(fromDb);

//             var pagedToReturn = new Page<BudgetServiceDto>()
//             {
//                 CurrentPg = fromDb.CurrentPg,
//                 TotalPgs = fromDb.TotalPgs,
//                 PgSize = fromDb.PgSize,
//                 TotalCount = fromDb.TotalCount,
//                 HasPrevious = fromDb.HasPrevious,
//                 HasNext = fromDb.HasNext,
//                 EntitiesToShow = ViewDto
//             };

//             return pagedToReturn;
//         }
//         public async Task<BudgetServiceDto> GetByIdIncludeAsync(int budgetServiceId)
//         {
//             var fromDb = await _GENERIC_REPO.BudgetsServices.GetById(
//                 predicate => predicate.Id == budgetServiceId,
//                 toInclude => toInclude
//                          .Include(x => x.Customer)
//                          .Include(x => x.CollectsDeliversCosts)
//                          .Include(x => x.Service)
//                          .ThenInclude(x => x.Repairs),
//                            selector => selector,
//                            orderBy => orderBy.OrderBy(x => x.Id)
//                          );
//             if (fromDb == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);
//             var toReturnView = _MAP.Map<BudgetServiceDto>(fromDb);
//             return toReturnView;
//         }
//         public async Task<BudgetServiceDto> GetByIdAsync(int budgetServiceId)
//         {
//             var fromDb = await _GENERIC_REPO.BudgetsServices.GetById(
//                 predicate => predicate.Id == budgetServiceId,
//                null,
//                            selector => selector,
//                            orderBy => orderBy.OrderBy(x => x.Id)
//                          );
//             if (fromDb == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);
//             var toReturnView = _MAP.Map<BudgetServiceDto>(fromDb);
//             return toReturnView;
//         }

//         public async Task<int> GetCountByCustomerIdAsync(int customerId)
//         {
//             var fromDb = await _GENERIC_REPO.BudgetsServices.Get(
//                 predicate => predicate.CustomerId == customerId,
//                 toInclude => toInclude.Include(x => x.Service),
//                 selector => selector,
//                 orderBy => orderBy.OrderBy(x => x.Id)).ToListAsync();

//                 fromDb = fromDb.Where(x => x.Service !=null).ToList();

//             if (fromDb == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);
            
//             var toReturnView = _MAP.Map<List<BudgetServiceDto>>(fromDb);
       
//             return toReturnView.Count();
//         }




//     }
// }
