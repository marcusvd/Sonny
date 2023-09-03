using System;
using System.Threading.Tasks;
using AutoMapper;
using UnitOfWork.Persistence.Contracts;
using Domain.Entities.Outsourced;
using Application.Services.Operations.Outsourced.Dtos;
using Application.Exceptions;
using System.Linq;

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

            if (entityDto == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);

            CollectDeliver entityToDb = _MAP.Map<CollectDeliver>(entityDto);


            entityToDb.Start = DateTime.Now;


            _GENERIC_REPO.CollectDeliver.AddAsync(entityToDb);

            if (await _GENERIC_REPO.save())
            {
                CollectDeliver entityFromDb = await _GENERIC_REPO.CollectDeliver.GetByIdAsync(_id => _id.Id == entityToDb.Id);

                if (entityDto == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);

                return _MAP.Map<CollectDeliverDto>(entityFromDb);
            }

            return entityDto;

        }

    }

}