using System;
using System.Threading.Tasks;
using AutoMapper;
using Application.Services.Contracts;
using Application.Dto;
using Domain.Entities;
using UnitOfWork.Persistence.Contracts;
using System.Collections.Generic;
using Services.Dto;
using Pagination.Models;
using Application.Exceptions;
using Application.Services.Helpers;

namespace Application.Services.Operations.Customers
{
    public class CustomerServices : ICustomerServices
    {
        private readonly IMapper _MAP;
        private readonly IUnitOfWork _GENERIC_REPO;
        public CustomerServices(
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


            _GENERIC_REPO.Customers.AddAsync(domEntity);

            if (await _GENERIC_REPO.save())
            {
                Customer recordDb = await _GENERIC_REPO.Customers.GetByIdAsync(_id => _id.Id == dtoEntity.Id);
                return _MAP.Map<CustomerDto>(domEntity);
            }

            throw new GlobalServicesException(GlobalErrorsMessagesException.UnknownError);
        }

        public async Task<List<CustomerDto>> GetAllAsync()
        {
            List<Customer> entityFromDb = await _GENERIC_REPO.Customers.GetAllAsync();

            if (entityFromDb == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            List<CustomerDto> entityDto = _MAP.Map<List<CustomerDto>>(entityFromDb);

            return entityDto;
        }

        public async Task<List<CustomerDto>> GetAllByCompanyIdAsync(int id)
        {

            var fromDb = await _GENERIC_REPO.Customers.GetAllByCompanyIdAsync(x => x.CompanyId == id);

            var toReturn = _MAP.Map<List<CustomerDto>>(fromDb);

            if (fromDb == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            return toReturn;
        }
        public async Task<PagedListDto<CustomerDto>> GetAllPagedAsync(Params parameters)
        {
            var fromDb = await _GENERIC_REPO.Customers.GetCustomersPagedAsync(parameters);

            if (fromDb == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            List<CustomerDto> ViewDto = _MAP.Map<List<CustomerDto>>(fromDb);

            var PgDto = new PagedListDto<CustomerDto>()
            {
                CurrentPg = fromDb.CurrentPg,
                TotalPgs = fromDb.TotalPgs,
                PgSize = fromDb.PgSize,
                TotalCount = fromDb.TotalCount,
                HasPrevious = fromDb.HasPrevious,
                HasNext = fromDb.HasNext,
                EntitiesToShow = ViewDto
            };
            return PgDto;

        }
        public async Task<int> GetCountByCompanyIdAsync(int id)
        {
            var totalCustomers = _GENERIC_REPO.Customers.GetCountByCompanyIdAsync(x => x.CompanyId == id);

            if (totalCustomers == null) throw new
                                    GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            return await totalCustomers;
        }

        // public static Params StringHandle(Params parameters)
        // {
        //     if (!string.IsNullOrEmpty(parameters.Term))
        //     {
        //         var stringHandler = parameters.Term.RemoveAccentsAndNormalize();
        //         var paramHandled = new Params();
        //         paramHandled.CompanyId = parameters.CompanyId;
        //         paramHandled.PgNumber = parameters.PgNumber;
        //         paramHandled.PgSize = parameters.PgSize;
        //         paramHandled.Term = stringHandler;
        //         return paramHandled;
        //     }

        //     return parameters;
        // }


    }
}