using System.Net;
using System.Threading.Tasks;
using Application.Exceptions;
using Application.Services.Operations.Main.Customers.Dtos;
using AutoMapper;
using Repository.Data.Operations.Main.Customers;
using UnitOfWork.Persistence.Operations;

namespace Application.Services.Operations.Main.Customers
{
    public class CustomerUpdateServices : ICustomerUpdateServices
    {

        private readonly ICustomerRepository _iCustomerRepository;
        private readonly IMapper _MAP;
        private readonly IUnitOfWork _GENERIC_REPO;


        public CustomerUpdateServices(
            ICustomerRepository ICustomerRepository,
            IMapper MAP,
            IUnitOfWork GENERIC_REPO
            )
        {
            _iCustomerRepository = ICustomerRepository;
            _MAP = MAP;
            _GENERIC_REPO = GENERIC_REPO;
        }

        public async Task<HttpStatusCode> UpdateAsync(int customerId, CustomerDto entity)
        {
            if (entity == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);
            if (customerId != entity.Id) throw new GlobalServicesException(GlobalErrorsMessagesException.IdIsDifferentFromEntityUpdate);

            var fromDb = await _iCustomerRepository.GetById(
                x => x.Id == customerId,
                null,
                selector => selector
                );

            var updated = _MAP.Map(entity, fromDb);

            _GENERIC_REPO.Customers.Update(updated);

            var result = await _GENERIC_REPO.save();

            if (result)
                return HttpStatusCode.OK;

            return HttpStatusCode.BadRequest;
        }
        public async Task<HttpStatusCode> DeleteFakeAsync(int customerId)
        {

            var fromDb = await _iCustomerRepository.GetById(
                x => x.Id == customerId,
                null,
                selector => selector
                );

             fromDb.Deleted = true;

            _GENERIC_REPO.Customers.Update(fromDb);

            var result = await _GENERIC_REPO.save();

            if (result)
                return HttpStatusCode.OK;

            return HttpStatusCode.BadRequest;
        }
    }
}