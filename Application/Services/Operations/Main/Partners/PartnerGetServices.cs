using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using UnitOfWork.Persistence.Operations;
using Application.Exceptions;
using Pagination.Models;
using Domain.Entities.Main;
using Application.Services.Operations.Main.Partners.Dtos;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using Domain.Entities.Main.Partners.Enums;
using Application.Services.Operations.Main.Partners.Dtos.Mappers;


namespace Application.Services.Operations.Main.Partners
{
    public class PartnerGetServices : IPartnerGetServices
    {
        private readonly IPartnerObjectMapperServices _mapper;
        private readonly IUnitOfWork _GENERIC_REPO;
        public PartnerGetServices(
                         IUnitOfWork GENERIC_REPO,
                        IPartnerObjectMapperServices mapper

                        )
        {
            _mapper = mapper;
            _GENERIC_REPO = GENERIC_REPO;
        }
        public async Task<List<PartnerDto>> GetAllByCompanyIdAsync(int id)
        {

            var fromDb = await _GENERIC_REPO.Partners.Get(x => x.CompanyId == id && x.Deleted == DateTime.MinValue).ToListAsync();

            var toReturn = _mapper.PartnerListMake(fromDb);

            if (fromDb == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            return toReturn;
        }


        public async Task<List<PartnerDto>> GetByCompanyIdIncludedPhysicallyMovingCosts(int companyId)
        {
            var entityFromDb = await _GENERIC_REPO.Partners.Get(
                predicate => predicate.CompanyId == companyId && predicate.Deleted ==DateTime.MinValue,
                toInclude =>
                toInclude
                .Include(x => x.PhysicallyMovingCosts),
                selector => selector).ToListAsync();

            if (entityFromDb == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            var toReturnViewDto = _mapper.PartnerListMake(entityFromDb);

            return toReturnViewDto;
        }

        public async Task<List<PartnerDto>> GetAllHardwareSupplierByCompanyIdAsync(int companyId)
        {
            var fromDb = await _GENERIC_REPO.Partners.Get(
                predicate => predicate.CompanyId == companyId && predicate.Deleted ==DateTime.MinValue && predicate.PartnerBusiness == PartnerBusinessEnum.HardwareSupplier).ToListAsync();

            var toReturn = _mapper.PartnerListMake(fromDb);
            if (fromDb == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            return toReturn;
        }
        public async Task<List<PartnerDto>> GetAllTransportersByCompanyIdAsync(int companyId)
        {
            var fromDb = await _GENERIC_REPO.Partners.
            Get(
                predicate => predicate.CompanyId == companyId && predicate.PartnerBusiness == PartnerBusinessEnum.Transporter && predicate.Deleted == DateTime.MinValue,
                null,
                selector => selector,
                orderBy => orderBy.OrderBy(x => x.Name),
                null
            ).ToListAsync();

            var toReturn = _mapper.PartnerListMake(fromDb);
            if (fromDb == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            return toReturn;
        }

        public async Task<List<PartnerDto>> GetAllEletronicRepairAsync(int companyId)
        {
            var fromDb = await _GENERIC_REPO.Partners.Get(predicate => predicate.CompanyId == companyId && predicate.Deleted ==DateTime.MinValue).Where(x => x.PartnerBusiness == PartnerBusinessEnum.ElectronicRepair).ToListAsync();

            var toReturn = _mapper.PartnerListMake(fromDb);

            if (fromDb == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            return toReturn;
        }
        public async Task<PagedList<PartnerDto>> GetAllPagedAsync(Params parameters)
        {
            Func<IQueryable<Partner>, IOrderedQueryable<Partner>> orderBy = null;

            var fromDb = await _GENERIC_REPO.Partners.GetPaged(
              parameters,
                                         predicate => predicate.CompanyId == parameters.predicate && predicate.Deleted ==DateTime.MinValue,
                                         toInclude => toInclude.Include(x => x.Contact)
                                         .Include(x => x.Address),
                                         selector => selector,
                                         orderBy,
                                         null
                );

            if (fromDb == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            List<PartnerDto> ViewDto = _mapper.PartnerListMake(fromDb);

            var PgDto = new PagedList<PartnerDto>()
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

        public async Task<int> GetTotalByCompanyIdAsync(int id)
        {
            var fromDb = await _GENERIC_REPO.Partners.Get(x => x.CompanyId == id && x.Deleted == DateTime.MinValue).ToListAsync();

            var toReturn = _mapper.PartnerListMake(fromDb);

            if (fromDb == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            return toReturn.Count;
        }

        public async Task<PartnerDto> GetByIdAllIncluded(int partnerId)
        {

            var entityFromDb = await _GENERIC_REPO.Partners.GetById(
                 predicate => predicate.Id == partnerId && predicate.Deleted ==DateTime.MinValue,
                toInclude =>
                toInclude
                .Include(x => x.PhysicallyMovingCosts)
                .Include(x => x.Address)
                .Include(x => x.Company)
                .Include(x => x.PhysicallyMovingCosts)
                .Include(x => x.Contact)
                .ThenInclude(x => x.SocialMedias)
                .Include(x => x.PaymentsData)
                .ThenInclude(x => x.Pixes)
                .Include(x => x.PaymentsData)
                .ThenInclude(x => x.BanksAccounts),
                selector => selector);

            if (entityFromDb == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            var toReturnViewDto = _mapper.PartnerMapper(entityFromDb);

            return toReturnViewDto;



        }



    }

}