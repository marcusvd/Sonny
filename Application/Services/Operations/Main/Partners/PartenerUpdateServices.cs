using System.Net;
using System.Threading.Tasks;
using Application.Exceptions;
using Application.Services.Operations.Main.Partners.Dtos;
using AutoMapper;
using Repository.Data.Operations.Main.Partners;
using UnitOfWork.Persistence.Operations;

namespace Application.Services.Operations.Main.Partners
{
    public class PartnerUpdateServices : IPartnerUpdateServices
    {

        private readonly IPartnerRepository _iPartnerRepository;
        private readonly IMapper _MAP;
        private readonly IUnitOfWork _GENERIC_REPO;


        public PartnerUpdateServices(
            IPartnerRepository IPartnerRepository,
            IMapper MAP,
            IUnitOfWork GENERIC_REPO
            )
        {
            _iPartnerRepository = IPartnerRepository;
            _MAP = MAP;
            _GENERIC_REPO = GENERIC_REPO;
        }

        public async Task<HttpStatusCode> UpdateAsync(int PartnerId, PartnerDto entity)
        {
            if (entity == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);
            if (PartnerId != entity.Id) throw new GlobalServicesException(GlobalErrorsMessagesException.IdIsDifferentFromEntityUpdate);

            var fromDb = await _iPartnerRepository.GetById(
                x => x.Id == PartnerId,
                null,
                selector => selector
                );

            var updated = _MAP.Map(entity, fromDb);

            _GENERIC_REPO.Partners.Update(updated);

            var result = await _GENERIC_REPO.save();

            if (result)
                return HttpStatusCode.OK;

            return HttpStatusCode.BadRequest;
        }
        public async Task<HttpStatusCode> DeleteFakeAsync(int PartnerId)
        {

            var fromDb = await _iPartnerRepository.GetById(
                x => x.Id == PartnerId,
                null,
                selector => selector
                );

             fromDb.Deleted = true;

            _GENERIC_REPO.Partners.Update(fromDb);

            var result = await _GENERIC_REPO.save();

            if (result)
                return HttpStatusCode.OK;

            return HttpStatusCode.BadRequest;
        }
    }
}