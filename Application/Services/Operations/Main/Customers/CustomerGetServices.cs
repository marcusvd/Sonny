using System;
using System.Threading.Tasks;
using AutoMapper;
using UnitOfWork.Persistence.Operations;
using System.Collections.Generic;
using Pagination.Models;
using Application.Exceptions;
using Application.Services.Helpers;
using Domain.Entities.Main.Customers;
using Application.Services.Operations.Main.Customers.Dtos;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace Application.Services.Operations.Main.Customers
{
    public class CustomerGetServices : ICustomerGetServices
    {
        private readonly IMapper _MAP;
        private readonly IUnitOfWork _GENERIC_REPO;
        public CustomerGetServices(
                         IUnitOfWork GENERIC_REPO,
                         IMapper MAP
                        )
        {
            _MAP = MAP;
            _GENERIC_REPO = GENERIC_REPO;
        }

        public async Task<List<CustomerDto>> GetAllAsync()
        {
            List<Customer> entityFromDb = await _GENERIC_REPO.Customers.Get(null, null, x => x, Order => Order.OrderBy(x => x.Id)).ToListAsync();

            if (entityFromDb == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            List<CustomerDto> entityDto = _MAP.Map<List<CustomerDto>>(entityFromDb);

            return entityDto;
        }

        public async Task<List<CustomerDto>> GetAllByCompanyIdAsync(int id)
        {

            var fromDb = await _GENERIC_REPO.Customers.Get(x => x.CompanyId == id).ToListAsync();

            var toReturn = _MAP.Map<List<CustomerDto>>(fromDb);

            if (fromDb == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            return toReturn;
        }
        public async Task<PagedList<CustomerDto>> GetAllPagedAsync(Params parameters)
        {
            var fromDb = await _GENERIC_REPO.Customers.GetPaged(
                              parameters,
                              predicate => predicate.CompanyId == parameters.predicate,
                              null,
                              null,
                              null
                            );

            if (!string.IsNullOrEmpty(parameters.Term))
            {
                fromDb = fromDb = await _GENERIC_REPO.Customers.GetPaged(
                                parameters,
                                predicate => predicate.CompanyId == parameters.predicate,
                                null,
                                null,
                                null,
                                term => term.NormalizedName.Contains(parameters.Term)
                              );
            }

            if (fromDb == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            List<CustomerDto> ViewDto = _MAP.Map<List<CustomerDto>>(fromDb);

            var PgDto = new PagedList<CustomerDto>()
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
        public async Task<int> GetCountByCompanyIdAsync(int companyId)
        {

            var totalCustomers = _GENERIC_REPO.Customers.Get(x => x.CompanyId == companyId);

            if (totalCustomers == null) throw new
                                    GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            return await totalCustomers.CountAsync();

        }

        public async Task<CustomerDto> GetByIdIcludedPhysicallyMovingCosts(int customerId)
        {

            var entityFromDb = await _GENERIC_REPO.Customers.GetById(
                predicate => predicate.Id == customerId,
                toInclude =>
                toInclude
                .Include(x => x.PhysicallyMovingCosts),
                selector => selector);

            if (entityFromDb == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            var toReturnViewDto = _MAP.Map<CustomerDto>(entityFromDb);

            return toReturnViewDto;
        }

    }
}