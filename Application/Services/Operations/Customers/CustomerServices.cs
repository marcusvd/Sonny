using System;
using System.Threading.Tasks;
using AutoMapper;
using Application.Services.Contracts;
using Application.Dto;
using Domain.Entities;
using UnitOfWork.Persistence.Contracts;
using System.Collections.Generic;
using Application.Services.Contracts.Customers;
using Services.Dto;
using Pagination.Models;

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

            if (dtoEntity == null) throw new Exception("Objeto era nulo");

            Customer domEntity = _MAP.Map<Customer>(dtoEntity);

            domEntity.Registered = DateTime.Now;

            _GENERIC_REPO.Customers.AddAsync(domEntity);

            if (await _GENERIC_REPO.save())
            {
                Customer recordDb = await _GENERIC_REPO.Customers.GetByIdAsync(_id => _id.Id == dtoEntity.Id);
                return _MAP.Map<CustomerDto>(domEntity);
            }

            throw new Exception("Erro desconhecido...");
        }

        public async Task<List<CustomerDto>> GetAllAsync()
        {
            List<Customer> entityFromDb = await _GENERIC_REPO.Customers.GetAllAsync();

            if (entityFromDb == null) throw new Exception("Objeto era nulo");

            List<CustomerDto> entityDto = _MAP.Map<List<CustomerDto>>(entityFromDb);

            return entityDto;

        }

        public async Task<PagedListDto<CustomerDto>> GetAllPagedAsync(Params parameters)
        {

            var fromDb = await _GENERIC_REPO.Customers.GetCustomersPagedAsync(parameters);

            if (fromDb == null) return null;

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



    }
}