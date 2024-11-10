using System;
using System.Threading.Tasks;


using UnitOfWork.Persistence.Operations;
using Application.Exceptions;
using Domain.Entities.Main.Customers;
using Application.Services.Operations.Main.Customers.Dtos;

using System.Net;
using Application.Services.Operations.Main.Customers.Dtos.Mappers;

namespace Application.Services.Operations.Main.Customers
{
    public class CustomerAddServices : ICustomerAddServices
    {
        private readonly ICustomerObjectMapperServices _ICustomerObjectMapperServices;
        private readonly IUnitOfWork _GENERIC_REPO;
        public CustomerAddServices(
                         IUnitOfWork GENERIC_REPO,
                         ICustomerObjectMapperServices ICustomerObjectMapperServices
                        )
        {
            _ICustomerObjectMapperServices = ICustomerObjectMapperServices;
            _GENERIC_REPO = GENERIC_REPO;
        }

        public async Task<HttpStatusCode> AddAsync(CustomerDto dtoView)
        {
            if (dtoView == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            Customer entityToDb = _ICustomerObjectMapperServices.CustomerMapper(dtoView);

            entityToDb.Registered = DateTime.Now;

            _GENERIC_REPO.Customers.Add(entityToDb);

            if (await _GENERIC_REPO.save())
                return HttpStatusCode.Created;

            throw new GlobalServicesException(GlobalErrorsMessagesException.UnknownError);
        }

    }
}