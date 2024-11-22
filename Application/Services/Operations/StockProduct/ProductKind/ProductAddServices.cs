// using System;
// using System.Net;
// using System.Threading.Tasks;
// using System.Collections.Generic;
// using Microsoft.EntityFrameworkCore;


// using Application.Exceptions;
// using Application.Services.Operations.StockProduct.Dtos.Mappers;
// using Domain.Entities.StockProduct.ProductKind;
// using UnitOfWork.Persistence.Operations;

// namespace Application.Services.Operations.StockProduct.ProductKind
// {
//     public class ProductAddServices : IProductAddServices
//     {
//         // private readonly IProductObjectMapperServices _IProductObjectMapperServices;
//         private readonly IStockProductObjectMapperServices _IStockProductObjectMapperServices;
//         // private readonly IMapper _Mapper;
//         private readonly IUnitOfWork _GENERIC_REPO;

//         public ProductAddServices(
//             IUnitOfWork GENERIC_REPO,
//             IStockProductObjectMapperServices IStockProductObjectMapperServices
//         // IMapper Mapper
//         //  IProductObjectMapperServices IProductObjectMapperServices
//         )
//         {
//             // _IProductObjectMapperServices = IProductObjectMapperServices;
//             _GENERIC_REPO = GENERIC_REPO;
//             _IStockProductObjectMapperServices = IStockProductObjectMapperServices;
//             // _Mapper = Mapper;
//         }

//         public async Task<HttpStatusCode> AddAsync(ProductDto dtoView)
//         {
//             if (dtoView == null)
//                 throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);
                
//             Product entityToDb = _IStockProductObjectMapperServices.ProductMapper(dtoView);

//             entityToDb.Registered = DateTime.Now;

//             _GENERIC_REPO.Products.Add(entityToDb);

//             if (await _GENERIC_REPO.save())
//                 return HttpStatusCode.Created;

//             throw new GlobalServicesException(GlobalErrorsMessagesException.UnknownError);
//         }

//         public async Task<List<ProductDto>> GetAllProcuctsByCompanyIdAsync(int companyId)
//         {
//             var fromDb = await _GENERIC_REPO
//                 .Products.Get(
//                     predicate => predicate.CompanyId == companyId,
//                     toInclude =>
//                         toInclude
//                             .Include(x => x.Segments)
//                             .ThenInclude(x => x.Manufacturers)
//                             .ThenInclude(x => x.Models),
//                     selector => selector
//                 )
//                 .ToListAsync();

//             if (fromDb == null)
//                 throw new Exception(GlobalErrorsMessagesException.ObjIsNull);

//             return _IStockProductObjectMapperServices.ProductListMake(fromDb);
//         }
//     }
// }
