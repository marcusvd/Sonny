using System;
using System.Threading.Tasks;
using AutoMapper;
using UnitOfWork.Persistence.Operations;
using Application.Exceptions;
using Domain.Entities.Main.Customers;
using Application.Services.Operations.Main.Customers.Dtos;
using Domain.Entities.Main.Enums;
using System.Collections.Generic;
using Domain.Entities.Shared;
using Application.Services.Operations.Main.Customers.Enums;
using Application.Services.Shared.Dtos.Contact;
using System.Net;

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

        public async Task<HttpStatusCode> AddAsync(CustomerDto dtoView)
        {
            if (dtoView == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

             Customer entityToDb = _MAP.Map<Customer>(dtoView);

            entityToDb.Registered = DateTime.Now;

            _GENERIC_REPO.Customers.Add(entityToDb);

            if (await _GENERIC_REPO.save())
                return HttpStatusCode.Created;

            throw new GlobalServicesException(GlobalErrorsMessagesException.UnknownError);
        }

    }
}