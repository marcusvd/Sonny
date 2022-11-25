using System;
using System.Threading.Tasks;
using AutoMapper;
using Services.Services.Contracts;
using Services.Dto;
using Domain.Entities;
using Repository.Data;
using Repository.Data.Operations;
using Repository.Data.Contracts;
using UnitOfWork.Persistence.Contracts;
using System.Collections.Generic;
using Pagination;

namespace Services.Services.Operations
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
            if (dtoEntity == null) throw new Exception("Erro, Objeto era nulo.");

            Customer domEntity = _MAP.Map<Customer>(dtoEntity);

            _GENERIC_REPO.Customers.AddAsync(domEntity);

            if (await _GENERIC_REPO.save())
            {
                Customer recordDb = await _GENERIC_REPO.Customers.GetByIdAsync(_id => _id.Id == dtoEntity.Id);
                return _MAP.Map<CustomerDto>(domEntity);
            }
            
            throw new Exception("Erro desconhecido...");
        }

    }
}