// using System.Threading.Tasks;
// using AutoMapper;
// using UnitOfWork.Persistence.Operations;
// using System.Collections.Generic;
// using System;
// using Application.Exceptions;
// using System.Net;
// using Application.Services.Operations.Finances.InheritanceServices;
// using Microsoft.EntityFrameworkCore;
// using System.Linq;
// using Application.Services.Operations.Finances.Dtos.Bank;

// namespace Application.Services.Operations.Finances.CreditCardExpenses
// {
//     public class CreditCardsServices : CommonFinancialForServices, ICreditCardsServices
//     {
//         private readonly IMapper _MAP;
//         private readonly IUnitOfWork _GENERIC_REPO;
//         public CreditCardsServices(
//             IUnitOfWork GENERIC_REPO,
//             IMapper MAP
//             )
//         {
//             _GENERIC_REPO = GENERIC_REPO;
//             _MAP = MAP;
//         }
//         public async Task<HttpStatusCode> AddCreditCardExpenseAsync(CardDto entityDto)
//         {

//             if (entityDto == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);

//             entityDto.Registered = DateTime.Now;

//             if (await _GENERIC_REPO.save())
//             {
//                 return HttpStatusCode.Created;
//             }

//             return HttpStatusCode.BadRequest;
//         }

//         public async Task<List<CardDto>> GetAllAsync(int companyId)
//         {
//             var fromDb = await _GENERIC_REPO.CreditCardExpenses.Get(
//                 predicate => predicate.CompanyId == companyId && predicate.Deleted != true,
//                 toInclude => toInclude.Include(x => x.CategoryExpense)
//                 .Include(x => x.SubcategoryExpense),
//                 selector => selector
//                 ).AsNoTracking().ToListAsync();

//             if (fromDb == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);

//             var toViewDto = _MAP.Map<List<CardDto>>(fromDb);

//             return toViewDto;

//         }

        
//     }
// }