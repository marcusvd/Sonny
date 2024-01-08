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

            // Customer domEntity = DtoToEntity(entity);
             Customer entityToDb = _MAP.Map<Customer>(dtoView);

            entityToDb.Registered = DateTime.Now;

            _GENERIC_REPO.Customers.Add(entityToDb);

            if (await _GENERIC_REPO.save())
                return HttpStatusCode.Created;

            throw new GlobalServicesException(GlobalErrorsMessagesException.UnknownError);
        }

        public Customer DtoToEntity(CustomerDto entity)
        {
            var sc = new List<SocialNetwork>();
            if (entity.Contact?.SocialMedias != null)
            {
                entity.Contact.SocialMedias.ForEach(x =>
                {
                    var singleSc = new SocialNetwork();
                    singleSc.Name = x.Name;
                    singleSc.Url = x.Url;

                    sc.Add(singleSc);
                });
            }

            if (entity.AdditionalCosts == null)
                entity.AdditionalCosts = new AdditionalCostsDto(0);
                
            var customerToSave = new Customer(entity.CompanyId,

                                 entity.Name,
                                 entity.Responsible,
                                 entity.CNPJ,
                                 entity.Registered = new DateTime(),
                                 entity.Description,
                                 entity.BusinessLine,
                                    new(
                                       entity.Address.ZipCode,
                                       entity.Address.Street,
                                       entity.Address.Number,
                                       entity.Address.District,
                                       entity.Address.City,
                                       entity.Address.State,
                                       entity.Address.Complement
                                        ),
                                    new(
                                        entity.Contact.Email,
                                        entity.Contact.Site,
                                        entity.Contact.Cel,
                                        entity.Contact.Zap,
                                        entity.Contact.Landline,
                                        sc
                                        ),
                                    entity.Assured,
                                    entity.Payment,
                                    entity.Expiration,
                                    entity.Disabled,
                                    entity.Discount,
                                    new(entity.AdditionalCosts.FixedPhysicallyMovingCosts),
                                    _MAP.Map<TypeCustomerEnum>(entity.CustomerType),
                                    new(entity.PhysicallyMovingCosts.Fuel, entity.PhysicallyMovingCosts.Apps, entity.PhysicallyMovingCosts.PublicTransport, entity.PhysicallyMovingCosts.MotoBoy)
            );
            return customerToSave;
        }

        public CustomerDto EntityToDto(Customer entity)
        {
            var sc = new List<SocialNetworkDto>();

            if (entity.Contact?.SocialMedias != null)
            {
                entity.Contact.SocialMedias.ForEach(x =>
                {
                    var singleSc = new SocialNetworkDto();
                    singleSc.Name = x.Name;
                    singleSc.Url = x.Url;

                    sc.Add(singleSc);
                });
            }
            var customerToSave = new CustomerDto(entity.CompanyId,

                   entity.Name,
                   entity.Responsible,
                   entity.CNPJ,
                   entity.Registered = new DateTime(),
                   entity.Description,
                   entity.BusinessLine,
                                    new(
                                       entity.Address.ZipCode,
                                       entity.Address.Street,
                                       entity.Address.Number,
                                       entity.Address.District,
                                       entity.Address.City,
                                       entity.Address.State,
                                       entity.Address.Complement
                                        ),
                                    new(
                                        entity.Contact.Email,
                                        entity.Contact.Site,
                                        entity.Contact.Cel,
                                        entity.Contact.Zap,
                                        entity.Contact.Landline,
                                        sc
                                        ),
                                 entity.Assured,
                                 entity.Payment,
                                 entity.Expiration,
                                 entity.Disabled,
                                 entity.Discount,
                                 new(entity.AdditionalCosts.FixedPhysicallyMovingCosts),
                                 _MAP.Map<TypeCustomerEnumDto>(entity.CustomerType),
                                 new(entity.PhysicallyMovingCosts.Fuel, entity.PhysicallyMovingCosts.Apps, entity.PhysicallyMovingCosts.PublicTransport, entity.PhysicallyMovingCosts.MotoBoy)
            );
            return customerToSave;
        }

    }
}