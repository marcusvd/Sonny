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
using MySqlConnector;
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
        public async Task<HttpStatusCode> UpdateAddItemFillAsync(int companyId, ItemDto entityDto)
        {

            if (entityDto == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            var ItemNameHandled = new ItemFillCrudHelperServices(_MAP).ItemNameNormalize(entityDto);

            var getFromDbByName = await _GENERIC_REPO.Items_Fillers.GetByName(companyId, entityDto.Name);

            if (getFromDbByName == null)
            {
                var ItemNewToDb = _MAP.Map<Item>(ItemNameHandled);
                _GENERIC_REPO.Items_Fillers.Add(ItemNewToDb);
            }
            else
            {
                var ItemToDb = new ItemFillCrudHelperServices(_MAP).HandleEntities(ItemNameHandled, getFromDbByName);
                _GENERIC_REPO.Items_Fillers.Update(ItemToDb);
            }

            if (await _GENERIC_REPO.save())
                return HttpStatusCode.Created;

            return HttpStatusCode.BadRequest;

        }

        public async Task<List<ItemDto>> GetAllItemFill(int companyId)
        {
            var fromDb = await _GENERIC_REPO.Items_Fillers.Get(
                predicate => predicate.CompanyId == companyId,
                topInclude => topInclude
                .Include(x => x.Manufacturers)
                .Include(x => x.Segments),
                selector => selector,
                  ordeBy => ordeBy.OrderBy(x => x.Id)
            ).ToListAsync();

            var toViewReturn = _MAP.Map<List<ItemDto>>(fromDb);

            return toViewReturn;
        }
    }



}