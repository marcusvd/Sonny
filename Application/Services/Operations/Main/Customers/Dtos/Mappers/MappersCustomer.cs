using System.Collections.Generic;


using Application.Services.Operations.Main.Inheritances.Enums;
using Application.Services.Shared.Dtos.Mappers;
using Domain.Entities.Main.Inheritances.Enums;
using Domain.Entities.Main.Customers;

namespace Application.Services.Operations.Main.Customers.Dtos.Mappers
{
    public partial class CustomerObjectMapperServices : CommonObjectMapper, ICustomerObjectMapperServices
    {
        public List<CustomerDto> CustomerListMake(List<Customer> list)
        {
            if (list == null) return null;

            var toReturn = new List<CustomerDto>();

            list.ForEach(x =>
            {
                toReturn.Add(CustomerMapper(x));
            });

            return toReturn;
        }
        public List<Customer> CustomerListMake(List<CustomerDto> list)
        {
            if (list == null) return null;

            var toReturn = new List<Customer>();

            list.ForEach(x =>
            {
                toReturn.Add(CustomerMapper(x));
            });


            return toReturn;
        }
        public CustomerDto CustomerMapper(Customer entity)
        {
            if (entity == null) return null;

            var obj = new CustomerDto()
            {
                Id = entity.Id,
                UserId = entity.UserId,
                CompanyId = entity.CompanyId,
                Deleted = entity.Deleted,
                Registered = entity.Registered,

                Name = entity.Name,
                Responsible = entity.Responsible,
                CNPJ = entity.CNPJ,
                EntityType = (EntityTypeEnumDto)entity.EntityType,
                Description = entity.Description,
                BusinessLine = entity.BusinessLine,

                Assured = entity.Assured,
                Payment = entity.Payment,
                Expires = entity.Expires,
                Discount = entity.Discount,
                AdditionalCosts = AdditionalCostsMapper(entity.AdditionalCosts),
                Address = AddressMapper(entity.Address),
                Contact = ContactMapper(entity.Contact),
                PhysicallyMovingCosts = PhysicallyMovingCostsMapper(entity.PhysicallyMovingCosts)

            };

            return obj;
        }
        public Customer CustomerMapper(CustomerDto entity)
        {
            if (entity == null) return null;

            var obj = new Customer()
            {
                Id = entity.Id,
                UserId = entity.UserId,
                CompanyId = entity.CompanyId,
                Deleted = entity.Deleted,
                Registered = entity.Registered,

                Name = entity.Name,
                Responsible = entity.Responsible,
                CNPJ = entity.CNPJ,
                EntityType = (EntityTypeEnum)entity.EntityType,
                Description = entity.Description,
                BusinessLine = entity.BusinessLine,

                Assured = entity.Assured,
                Payment = entity.Payment,
                Expires = entity.Expires,
                Discount = entity.Discount,
                AdditionalCosts = AdditionalCostsMapper(entity.AdditionalCosts),
                Address = AddressMapper(entity.Address),
                Contact = ContactMapper(entity.Contact),
                PhysicallyMovingCosts = PhysicallyMovingCostsMapper(entity.PhysicallyMovingCosts)

            };

            return obj;
        }
        public Customer CustomerUpdateMapper(CustomerDto dto, Customer db)
        {
            if (dto == null) return null;
            if (db == null) return null;

            db.Id = dto.Id;
            db.UserId = dto.UserId;
            db.CompanyId = dto.CompanyId;


            db.Name = dto.Name;
            db.Responsible = dto.Responsible;
            db.CNPJ = dto.CNPJ;
            db.EntityType = (EntityTypeEnum)dto.EntityType;
            db.Description = dto.Description;
            db.BusinessLine = dto.BusinessLine;


            db.Assured = dto.Assured;
            db.Payment = dto.Payment;
            db.Expires = dto.Expires;
            db.Discount = dto.Discount;
            db.AdditionalCosts = AdditionalCostsMapper(dto.AdditionalCosts);
            db.Address = AddressMapper(dto.Address);
            db.Contact = ContactMapper(dto.Contact);
            db.PhysicallyMovingCosts = PhysicallyMovingCostsMapper(dto.PhysicallyMovingCosts);
            // db.Address = 
            // db.Contact = 
            // db.PhysicallyMovingCosts = 

            return db;
        }
    }
}