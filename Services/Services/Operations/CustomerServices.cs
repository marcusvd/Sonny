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
        public async Task<CustomerDto> AddAsync(CustomerDto customerDto)
        {
            try
            {
                if (customerDto == null) throw new Exception("Erro, Objeto era nulo.");

                Customer record = _MAP.Map<Customer>(customerDto);

                _GENERIC_REPO.Customers.AddAsync(record);

                if (await _GENERIC_REPO.save())
                {
                    Customer recordDb = await _GENERIC_REPO.Customers.GetByIdAsync(_id => _id.Id == customerDto.Id);
                    return _MAP.Map<CustomerDto>(record);
                }
                else
                {
                    throw new Exception("Erro desconhecido...");
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"{ex.Message}");
            }
        }
        public async Task<bool> DeleteAsync(int id)
        {
            try
            {
                Customer record = await _GENERIC_REPO.Customers.GetByIdAsync(_id => _id.Id == id);
                if (record == null) throw new Exception("O objeto é nulo.");

                _GENERIC_REPO.Customers.Delete(record);
                return await _GENERIC_REPO.save();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public async Task<CustomerDto> EditAsync(int id, CustomerDto customerDto)
        {
            try
            {
                Customer record = await _GENERIC_REPO.Customers.GetByIdAsync(_id => _id.Id == id);

                if (record == null) throw new Exception("O objeto é nulo.");

                customerDto.Id = record.Id;

                _MAP.Map(customerDto, record);

                _GENERIC_REPO.Customers.Update(record);

                if (await _GENERIC_REPO.save())
                {
                    Customer recordReturn = await _GENERIC_REPO.Customers.GetByIdAsync(_id => _id.Id == id);
                    return _MAP.Map<CustomerDto>(recordReturn);
                }

                throw new Exception("Erro, objeto não foi atualizado.");
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public async Task<List<CustomerDto>> GetAllAsync()
        {
            try
            {
                List<Customer> records = await _GENERIC_REPO.Customers.GetAllAsync();

                if (records == null) throw new Exception("O Objeto era nulo.");

                return _MAP.Map<List<CustomerDto>>(records);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public async Task<CustomerDto> GetByIdAsync(int id)
        {
            try
            {
                Customer record = await _GENERIC_REPO.Customers.GetByIdAsync(_id => _id.Id == id);

                if (record == null) throw new Exception("O objeto era nulo");

                return _MAP.Map<CustomerDto>(record);

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }


        }
        public async Task<CustomerDto> GetByIdAllIncludedAsync(int id)
        {
            try
            {
                Customer record = await _GENERIC_REPO.Customers.GetByIdAllIncludedAsync(id);

                if (record == null) throw new Exception("O objeto era nulo");

                return _MAP.Map<CustomerDto>(record);

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }


        }
        public async Task<List<CustomerDto>> GetAllIncludedAsync()
        {
            try
            {
                List<Customer> records = await _GENERIC_REPO.Customers.GetAllIncludedAsync();

                if (records == null) throw new Exception("O Objeto era nulo.");

                return _MAP.Map<List<CustomerDto>>(records);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        //last Version
        public async Task<PagedListDto<CustomerDto>> GetAllPagedAsync(PgParams parameters)
        {
            try
            {

                var fromDb = await _GENERIC_REPO.Customers.GetClientPagedAsync(parameters);
                if (fromDb == null) return null;

                var toDto = _MAP.Map<List<CustomerDto>>(fromDb);

                var toReturn = new PagedListDto<CustomerDto>();
               
                toReturn.pageIndex = fromDb.pageIndex;
                toReturn.length = fromDb.length;
                toReturn.TotalPg = fromDb.TotalPg;
                toReturn.pageSize = fromDb.pageSize;
                toReturn.hasNextPage = fromDb.hasNextPage;
                toReturn.hasPreviousPage = fromDb.hasPreviousPage;
                toReturn.EntitiesToShow = toDto;



                return toReturn;

            }
            catch (Exception ex)
            {
            throw new Exception($"camada de serviço: {ex.Message}");
            }




        }

    }
}