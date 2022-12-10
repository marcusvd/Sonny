using System;
using System.Threading.Tasks;
using AutoMapper;
using Services.Services.Contracts;
using Services.Dto;
using Domain.Entities;
using UnitOfWork.Persistence.Contracts;
using System.Collections.Generic;

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

            if(dtoEntity == null)  throw new Exception("Objeto era nulo");

            Customer domEntity = _MAP.Map<Customer>(dtoEntity);

            DateTime Register = new DateTime();

            domEntity.Registered = Register;

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

    }
}