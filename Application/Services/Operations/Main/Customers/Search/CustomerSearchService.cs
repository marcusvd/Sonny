using System.Linq;
using System.Threading.Tasks;
using Domain.Entities.Main.Customers;
using Domain.Entities.Main.Enums;
using Microsoft.EntityFrameworkCore;
using Pagination.Models;
using UnitOfWork.Persistence.Operations;

namespace Application.Services.Operations.Main.Customers.Search
{
    public class CustomerSearchService : ICustomerSearchService
    {
        private readonly IUnitOfWork _GENERIC_REPO;
        public CustomerSearchService(IUnitOfWork GENERIC_REPO)
        {
            _GENERIC_REPO = GENERIC_REPO;
        }

        public async Task<Page<Customer>> FilterList(Params parameters, SearchTerms searchTerms)
        {

            if (searchTerms.assured != "Selecione" && searchTerms.entity == "Selecione")
            {
                var assured = bool.Parse(searchTerms.assured);
                var fromDb = await _GENERIC_REPO.Customers.GetPaged(
                                                                             parameters,
                                                                             predicate => predicate.CompanyId == parameters.predicate && predicate.Disabled != true,
                                                                             toInclude => toInclude.Include(x => x.Contact),
                                                                             selector => selector,
                                                                            orderBy => orderBy.OrderBy(x => x.Name),
                                                                             term => term.Assured == assured
                                                                             );

                return fromDb;
            }
            if (searchTerms.assured == "Selecione" && searchTerms.entity != "Selecione")
            {
                var entityTypeEnum = (EntityTypeEnum)int.Parse(searchTerms.entity);
                var fromDb = await _GENERIC_REPO.Customers.GetPaged(
                                                                  parameters,
                                                                  predicate => predicate.CompanyId == parameters.predicate && predicate.Disabled != true,
                                                                  toInclude => toInclude.Include(x => x.Contact),
                                                                  selector => selector,
                                                                 orderBy => orderBy.OrderBy(x => x.Name),
                                                                  term => term.EntityType == entityTypeEnum
                                                                             );
                return fromDb;
            }
            if (searchTerms.assured != "Selecione" && searchTerms.entity != "Selecione")
            {
                var assured = bool.Parse(searchTerms.assured);
                var entityTypeEnum = (EntityTypeEnum)int.Parse(searchTerms.entity);
                var fromDb = await _GENERIC_REPO.Customers.GetPaged(
                                                                              parameters,
                                                                              predicate => predicate.CompanyId == parameters.predicate && predicate.Disabled != true,
                                                                              toInclude => toInclude.Include(x => x.Contact),
                                                                              selector => selector,
                                                                             orderBy => orderBy.OrderBy(x => x.Name),
                                                                               term => term.Assured == assured && term.EntityType == entityTypeEnum
                                                                              );
                return fromDb;
            }

            return null;

        }










    }
}