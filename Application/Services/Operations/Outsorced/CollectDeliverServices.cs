using System;
using System.Threading.Tasks;
using AutoMapper;
using UnitOfWork.Persistence.Operations;
using Domain.Entities.Outsourced;
using Application.Services.Operations.Outsourced.Dtos;
using Application.Exceptions;
using System.Linq;
using System.Net;

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
        public async Task<HttpStatusCode> AddAsync(CollectDeliverDto entityDto)
        {

            if (entityDto == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);

            CollectDeliver entityToDb = _MAP.Map<CollectDeliver>(entityDto);


            entityToDb.Start = DateTime.Now;


            _GENERIC_REPO.CollectDeliver.Add(entityToDb);
            if (await _GENERIC_REPO.save())
                return HttpStatusCode.Created;

            throw new GlobalServicesException(GlobalErrorsMessagesException.UnknownError);
        }

    }

}