using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Exceptions;
using AutoMapper;
using Domain.Entities.StkProduct;
using UnitOfWork.Persistence.Operations;

namespace Application.Services.Operations.ProductServices
{
    public class EquipamentAddServices //: IEquipamentAddServices
    {
        private readonly IMapper _MAP;
        private readonly IUnitOfWork _GENERIC_REPO;
        public EquipamentAddServices(IUnitOfWork GENERIC_REPO,
                         IMapper MAP)
        {
            _MAP = MAP;
            _GENERIC_REPO = GENERIC_REPO;
        }

        // public async Task<EquipamentDto> AddAsync(EquipamentDto entityDto)
        // {
        //     if (entityDto == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

        //     var toDb = _MAP.Map<Equipament>(entityDto);

        //     _GENERIC_REPO.Equipaments.Add(toDb);

        //     if (await _GENERIC_REPO.save())
        //     {
        //         var fromDb = await _GENERIC_REPO.Equipaments.GetById(x => x.Id == toDb.Id);
        //         return _MAP.Map<EquipamentDto>(fromDb);
        //     }

        //     return entityDto;

        // }
        // public async Task<KeyValuePair<string, int>> AddRangeAsync(List<EquipamentDto> ListEntitiesDtos)
        // {
        //     if (ListEntitiesDtos == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

        //     var toDb = _MAP.Map<List<Equipament>>(ListEntitiesDtos);

        //     _GENERIC_REPO.Equipaments.AddRangeAsync(toDb);

        //     if (await _GENERIC_REPO.save())
        //     {
        //         return new KeyValuePair<string, int>("Succeeded Added.", 200);
        //     }

        //     return new KeyValuePair<string, int>("Fail when adding.", 400);

        // }
    }
}