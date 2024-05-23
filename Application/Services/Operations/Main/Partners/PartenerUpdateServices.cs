using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Application.Exceptions;
using Application.Services.Operations.Main.Partners.Dtos;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
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
                 toInclude => toInclude
                .Include(x => x.Address)
                .Include(x => x.Contact)
                .ThenInclude(x => x.SocialMedias)
                .Include(x => x.PaymentsData)
                .ThenInclude(x => x.Pixes)
                .Include(x => x.PaymentsData)
                .ThenInclude(x => x.BanksAccounts)
                .Include(x => x.PhysicallyMovingCosts),
                selector => selector
                );

            fromDb.Deleted = true;

            fromDb.Deleted = true;

            if (fromDb.Contact != null)
                fromDb.Contact.Deleted = true;

            if (fromDb.Contact.SocialMedias != null)
                fromDb.Contact.SocialMedias.ToList().ForEach(x => { x.Deleted = true; });

            if (fromDb.Address != null)
                fromDb.Address.Deleted = true;

            if (fromDb.PaymentsData != null)
                fromDb.PaymentsData.Deleted = true;

            if (fromDb.PaymentsData.Pixes != null)
                fromDb.PaymentsData.Pixes.ToList().ForEach(x => { x.Deleted = true; });

            if (fromDb.PaymentsData.BanksAccounts != null)
                fromDb.PaymentsData.BanksAccounts.ToList().ForEach(x => { x.Deleted = true; });

            if (fromDb.PhysicallyMovingCosts != null)
                fromDb.PhysicallyMovingCosts.Deleted = true;

            _GENERIC_REPO.Partners.Update(fromDb);

            var result = await _GENERIC_REPO.save();

            if (result)
                return HttpStatusCode.OK;

            return HttpStatusCode.BadRequest;
        }
    }
}