using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Application.Exceptions;
using Application.Services.Helpers;
using Application.Services.Operations.ProductServices.Dtos.Fill;
using AutoMapper;
using Domain.Entities.Fill.StkProduct;
using Microsoft.EntityFrameworkCore;
using UnitOfWork.Persistence.Operations;

namespace Application.Services.Operations.ProductServices
{

    public class ItemFillCrudServices : IItemFillCrudServices
    {
        private readonly IMapper _MAP;
        private readonly IUnitOfWork _GENERIC_REPO;
        public ItemFillCrudServices(IUnitOfWork GENERIC_REPO,
                                           IMapper MAP)
        {
            _MAP = MAP;
            _GENERIC_REPO = GENERIC_REPO;
        }
        public async Task<HttpStatusCode> UpdateAddItemFillAsync(List<ItemDto> entitiesDto, int companyId)
        {

            if (entitiesDto == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            var ItemListNameHandled = new ItemFillCrudHelperServices(_MAP).ItemNameNormalize(entitiesDto);

            var getAllFromDb = await _GENERIC_REPO.Items_Fillers.Get(
                                          predicate => predicate.CompanyId == companyId,
                                          toInclude => toInclude
                                          .Include(x => x.Manufacturers)
                                          .Include(x => x.Segments),
                                        //   .Include(x => x.Models),
                                          selector => selector,
                                          null
                      ).ToListAsync();

            var ItemListNameHandledToDb = _MAP.Map<List<Item>>(ItemListNameHandled);

            _GENERIC_REPO.Items_Fillers.UpdateRange(new ItemFillCrudHelperServices(_MAP).HandleEntities(getAllFromDb, ItemListNameHandledToDb));
            _GENERIC_REPO.Items_Fillers.AddRangeAsync(new ItemFillCrudHelperServices(_MAP).ListToAdd(getAllFromDb, ItemListNameHandled));

            if (await _GENERIC_REPO.save())
                return HttpStatusCode.Created;

            return HttpStatusCode.BadRequest;

        }

        public async Task<List<ItemDto>> GetAllItemFill(int companyId)
        {
            var fromDb = await _GENERIC_REPO.Items_Fillers.Get(
                predicate => predicate.CompanyId == companyId,
                null,
                selector => selector
            ).ToListAsync();

            var toViewReturn = _MAP.Map<List<ItemDto>>(fromDb);

            return toViewReturn;
        }
    }



}