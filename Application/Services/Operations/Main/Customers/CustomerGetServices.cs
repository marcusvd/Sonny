using System.Threading.Tasks;
using AutoMapper;
using UnitOfWork.Persistence.Operations;
using System.Collections.Generic;
using Pagination.Models;
using Application.Exceptions;
using Domain.Entities.Main.Customers;
using Application.Services.Operations.Main.Customers.Dtos;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Text.Json;
using Application.Services.Operations.Main.Customers.Enums;
using Domain.Entities.Main.Enums;



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
            List<Customer> entityFromDb = await _GENERIC_REPO.Customers.Get(x => x.Disabled != true, null, x => x, Order => Order.OrderBy(x => x.Id)).ToListAsync();

            if (entityFromDb == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            List<CustomerDto> entityDto = _MAP.Map<List<CustomerDto>>(entityFromDb);

            return entityDto;
        }

        public async Task<List<CustomerDto>> GetAllByCompanyIdAsync(int id)
        {

            var fromDb = await _GENERIC_REPO.Customers.Get(x => x.CompanyId == id && x.Disabled != true).ToListAsync();

            var toReturn = _MAP.Map<List<CustomerDto>>(fromDb);

            if (fromDb == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            return toReturn;
        }
        public async Task<PagedList<CustomerDto>> GetAllPagedAsync(Params parameters)
        {
            var fromDb = await _GENERIC_REPO.Customers.GetPaged(
                              parameters,
                              predicate => predicate.CompanyId == parameters.predicate && predicate.Disabled != true,
                              toInclude => toInclude.Include(x => x.Contact)
                              .Include(x => x.Address),
                              selector => selector,
                              orderBy => orderBy.OrderBy(x => x.Id),
                              null
                            );

            if (!string.IsNullOrEmpty(parameters.Term))
            {


                fromDb = fromDb = await _GENERIC_REPO.Customers.GetPaged(
                                parameters,
                                predicate => predicate.CompanyId == parameters.predicate && predicate.Disabled != true,
                                toInclude => toInclude.Include(x => x.Contact),
                                selector => selector,
                                null,
                               term => term.Name.ToLower().Contains(parameters.Term.ToLower())
                               ||
                               term.CNPJ.ToLower().Contains(parameters.Term.ToLower())
                               ||
                               term.Responsible.ToLower().Contains(parameters.Term.ToLower())
                               ||
                               term.Contact.Email.ToLower().Contains(parameters.Term.ToLower())

                  //    .Replace("\\D", "")
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


        public async Task<PagedList<CustomerDto>> GetAllCustomersByTermSearchPagedAsync(Params parameters)
        {

            var searchTerms = JsonSerializer.Deserialize<SearchTerms>(parameters.SearchTerms);


            var fromDb = await _GENERIC_REPO.Customers.GetPaged(
                                                           parameters,
                                                           predicate => predicate.CompanyId == parameters.predicate && predicate.Disabled != true,
                                                           toInclude => toInclude.Include(x => x.Contact),
                                                           selector => selector,
                                                           null);

            if (searchTerms.assured != "Ambos" && searchTerms.entity == "Ambos")
            {
                var assured = bool.Parse(searchTerms.assured);
                fromDb = await _GENERIC_REPO.Customers.GetPaged(
                                                                           parameters,
                                                                           predicate => predicate.CompanyId == parameters.predicate && predicate.Disabled != true,
                                                                           toInclude => toInclude.Include(x => x.Contact),
                                                                           selector => selector,
                                                                           null,
                                                                           term => term.Assured == assured
                                                                           );
            }
            if (searchTerms.assured == "Ambos" && searchTerms.entity != "Ambos")
            {
                var entityTypeEnum = (EntityTypeEnum)int.Parse(searchTerms.entity);
                fromDb = await _GENERIC_REPO.Customers.GetPaged(
                                                                           parameters,
                                                                           predicate => predicate.CompanyId == parameters.predicate && predicate.Disabled != true,
                                                                           toInclude => toInclude.Include(x => x.Contact),
                                                                           selector => selector,
                                                                           null,
                                                                           term => term.EntityType == entityTypeEnum
                                                                           );
            }
            if (searchTerms.assured != "Ambos" && searchTerms.entity != "Ambos")
            {
                var assured = bool.Parse(searchTerms.assured);
                var entityTypeEnum = (EntityTypeEnum)int.Parse(searchTerms.entity);
                fromDb = await _GENERIC_REPO.Customers.GetPaged(
                                                                           parameters,
                                                                           predicate => predicate.CompanyId == parameters.predicate && predicate.Disabled != true,
                                                                           toInclude => toInclude.Include(x => x.Contact),
                                                                           selector => selector,
                                                                           null,
                                                                            term => term.Assured == assured && term.EntityType == entityTypeEnum
                                                                           );
            }

            //   var result = new List<CustomerDto>();

            // if (searchTerms.assured != null && searchTerms.entity == null)
            //  result = _MAP.Map<List<CustomerDto>>(fromDb.Where(x => x.Assured == bool.Parse(searchTerms.assured)));

            // if (searchTerms.assured == null && searchTerms.entity != null)
            //     result = _MAP.Map<List<CustomerDto>>(fromDb.Where(x => x.EntityType == entityTypeEnum));

            // if (searchTerms.assured != null && searchTerms.entity != null)
            //     result = _MAP.Map<List<CustomerDto>>(fromDb.Where(x => x.Assured == bool.Parse(searchTerms.assured) && x.EntityType == entityTypeEnum));

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



        public async Task<int> GetLengthAsync(int companyId)
        {

            var fromDb = await _GENERIC_REPO.Customers.Get(
                               predicate => predicate.CompanyId == companyId && predicate.Disabled != true,
                               null,
                               selector => selector
                             ).ToListAsync();

            // var totalCustomers = _GENERIC_REPO.Customers.GetCount(x => x.CompanyId == companyId);

            if (fromDb == null) throw new
                                    GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            return fromDb.Count();

        }

        public async Task<CustomerDto> GetByIdIncludedPhysicallyMovingCosts(int customerId)
        {

            var entityFromDb = await _GENERIC_REPO.Customers.GetById(
                predicate => predicate.Id == customerId && predicate.Disabled != true,
                toInclude =>
                toInclude
                .Include(x => x.PhysicallyMovingCosts),
                selector => selector);

            if (entityFromDb == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            var toReturnViewDto = _MAP.Map<CustomerDto>(entityFromDb);

            return toReturnViewDto;
        }

        public async Task<CustomerDto> GetByIdAllIncluded(int customerId)
        {

            var entityFromDb = await _GENERIC_REPO.Customers.GetById(
                 predicate => predicate.Id == customerId && predicate.Disabled != true,
                toInclude =>
                toInclude
                .Include(x => x.PhysicallyMovingCosts)
                .Include(x => x.AdditionalCosts)
                .Include(x => x.Address)
                .Include(x => x.Company)
                .Include(x => x.PhysicallyMovingCosts)
                .Include(x => x.Contact)
                .ThenInclude(x => x.SocialMedias),
                selector => selector);

            if (entityFromDb == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            var toReturnViewDto = _MAP.Map<CustomerDto>(entityFromDb);

            return toReturnViewDto;



        }

    }
}