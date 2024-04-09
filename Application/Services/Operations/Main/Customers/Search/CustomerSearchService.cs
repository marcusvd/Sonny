using System.Linq;
using System.Threading.Tasks;
using Domain.Entities.Main.Customers;
using Microsoft.EntityFrameworkCore;
using Pagination.Models;
using UnitOfWork.Persistence.Operations;

namespace Application.Services.Operations.Main.Customers.Search
{
    public class CustomerSearchService
    {
        private readonly IUnitOfWork _GENERIC_REPO;
        public CustomerSearchService(IUnitOfWork GENERIC_REPO)
        {
            _GENERIC_REPO = GENERIC_REPO;
        }

        public async Task<Page<Customer>> SearchByCustomerName(Params parameters)
        {
            var fromDb = await _GENERIC_REPO.Customers.GetPaged(
                                             parameters,
                                             predicate => predicate.CompanyId == parameters.predicate && predicate.Disabled != true,
                                             toInclude => toInclude.Include(x => x.Contact),
                                             selector => selector,
                                             null,
                                             term => term.Name.Contains(parameters.Term));
                                             return fromDb;
        }
        public async Task<Page<Customer>> SearchByCustomerCnpj(Params parameters)
        {

            
            var fromDb = await _GENERIC_REPO.Customers.GetPaged(
                                             parameters,
                                             predicate => predicate.CompanyId == parameters.predicate && predicate.Disabled != true,
                                             toInclude => toInclude.Include(x => x.Contact),
                                             selector => selector,
                                             null,
                                             term => term.Name.Contains(parameters.Term));
                                             return fromDb;
        }









    }
}