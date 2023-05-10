using System;
using System.Threading.Tasks;
using AutoMapper;
using Application.Services.Contracts.Outsourced;
using Application.Dto.Outsourced;
using UnitOfWork.Persistence.Contracts;
using Domain.Entities.Outsourced;

namespace Application.Services.Operations.Outsourced
{
    public class CollectDeliverServices : ICollectDeliverServices
    {
        private readonly IMapper _MAP;
        private readonly IUnitOfWork _GENERIC_REPO;
        public CollectDeliverServices(
                         IUnitOfWork GENERIC_REPO,
                         IMapper MAP
                        )
        {
            _MAP = MAP;
            _GENERIC_REPO = GENERIC_REPO;
        }
        public async Task<CollectDeliverDto> AddAsync(CollectDeliverDto entityDto)
        {

            if (entityDto == null) throw new Exception("Objeto era nulo");

            CollectDeliver entityToDb = _MAP.Map<CollectDeliver>(entityDto);

            _GENERIC_REPO.CollectDeliver.AddAsync(entityToDb);

            if (await _GENERIC_REPO.save())
            {
                CollectDeliver entityFromDb = await _GENERIC_REPO.CollectDeliver.GetByIdAsync(_id => _id.Id == entityToDb.Id);
                if (entityFromDb == null) throw new Exception("Objeto era nullo");
                return _MAP.Map<CollectDeliverDto>(entityFromDb);
            }
            else
            {
                throw new Exception("Erro desconhecido...");
            }

        }

    }

}