using System;
using System.Threading.Tasks;
using AutoMapper;
using Services.Services.Contracts;
using Services.Dto;
using Services.Dto.CollectsDelivers;
using Domain.Entities;
using Repository.Data;
using Repository.Data.Operations;
using Repository.Data.Contracts;
using UnitOfWork.Persistence.Contracts;
using System.Collections.Generic;
using Pagination;

namespace Services.Services.Operations
{
    public class CollectDeliverServices : ICollectDeliverServices
    {
        //private readonly IClientRepository _CLIENT_REPO;
        private readonly IMapper _MAP;
        private readonly IUnitOfWork _GENERIC_REPO;
        public CollectDeliverServices(
                         // IClientRepository CLIENT_REPO,
                         IUnitOfWork GENERIC_REPO,
                         IMapper MAP
                        )
        {
            _MAP = MAP;
            _GENERIC_REPO = GENERIC_REPO;
        }
        public async Task<CollectDeliverDto> AddAsync(CollectDeliverDto entityDto)
        {

            //      if (viewModel == null) throw new Exception("Erro, Objeto era nulo.");

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