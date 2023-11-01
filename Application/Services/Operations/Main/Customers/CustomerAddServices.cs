using System;
using System.Threading.Tasks;
using AutoMapper;
using UnitOfWork.Persistence.Operations;
using Application.Exceptions;
using Application.Services.Helpers;
using Domain.Entities.Main.Customers;
using Application.Services.Operations.Main.Customers.Dtos;

namespace Application.Services.Operations.Main.Customers
{
    public class CustomerAddServices : ICustomerAddServices
    {
        private readonly IMapper _MAP;
        private readonly IUnitOfWork _GENERIC_REPO;
        public CustomerAddServices(
                         IUnitOfWork GENERIC_REPO,
                         IMapper MAP
                        )
        {
            _MAP = MAP;
            _GENERIC_REPO = GENERIC_REPO;
        }

        public async Task<CustomerDto> AddAsync(CustomerDto dtoEntity)
        {

            if (dtoEntity == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            Customer domEntity = _MAP.Map<Customer>(dtoEntity);

            domEntity.Registered = DateTime.Now;
            domEntity.NormalizedName = domEntity.Name.RemoveAccentsAndNormalize();


            _GENERIC_REPO.Customers.Add(domEntity);

            if (await _GENERIC_REPO.save())
            {
                Customer recordDb = await _GENERIC_REPO.Customers.GetById(
                    _id => _id.Id == dtoEntity.Id,
                    null,
                    selector => selector
                    );
                return _MAP.Map<CustomerDto>(domEntity);
            }

            throw new GlobalServicesException(GlobalErrorsMessagesException.UnknownError);
        }

    }
}