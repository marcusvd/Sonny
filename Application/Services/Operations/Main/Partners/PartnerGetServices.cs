using System;
using AutoMapper;
using System.Threading.Tasks;
using System.Collections.Generic;
using UnitOfWork.Persistence.Operations;
using Application.Exceptions;
using Pagination.Models;
using Domain.Entities.Main;
using Application.Services.Operations.Main.Partners.Dtos;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using Domain.Entities.Main.Enums;

namespace Application.Services.Operations.Main.Partners
{
    public class PartnerGetServices : IPartnerGetServices
    {
        private readonly IMapper _MAP;
        private readonly IUnitOfWork _GENERIC_REPO;
        public PartnerGetServices(
                         IUnitOfWork GENERIC_REPO,
                         IMapper MAP

                        )
        {
            _MAP = MAP;
            _GENERIC_REPO = GENERIC_REPO;
        }
        public async Task<List<PartnerDto>> GetAllByCompanyIdAsync(int id)
        {

            var fromDb = await _GENERIC_REPO.Partners.Get(x => x.CompanyId == id).ToListAsync();

            var toReturn = _MAP.Map<List<PartnerDto>>(fromDb);

            if (fromDb == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            return toReturn;
        }
        public async Task<List<PartnerDto>> GetAllHardwareVendorByCompanyIdAsync(int companyId)
        {
            var fromDb = await _GENERIC_REPO.Partners.Get(
                predicate => predicate.CompanyId == companyId).ToListAsync();

            fromDb = fromDb.Where(x => x.PartnerBusiness == PartnerBusinessEnum.HardwareSupplier).ToList();

            var toReturn = _MAP.Map<List<PartnerDto>>(fromDb);
            if (fromDb == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            return toReturn;
        }
        public async Task<List<PartnerDto>> GetAllEletronicRepairAsync(int companyId)
        {
            var fromDb = await _GENERIC_REPO.Partners.Get(predicate => predicate.CompanyId == companyId).Where(x => x.PartnerBusiness == PartnerBusinessEnum.ElectronicRepair).ToListAsync();

            var toReturn = _MAP.Map<List<PartnerDto>>(fromDb);

            if (fromDb == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            return toReturn;
        }
        public async Task<PagedList<PartnerDto>> GetAllPagedAsync(Params parameters)
        {
            var fromDb = await _GENERIC_REPO.Partners.GetPaged(
                parameters, predicate => predicate.CompanyId == parameters.predicate,
                null,
                selector => selector,
                orderBy => orderBy.OrderBy(x => x.Id)
                );

            if (fromDb == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            List<PartnerDto> ViewDto = _MAP.Map<List<PartnerDto>>(fromDb);

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
        public async Task<int> GetCountByCompanyIdAsync(int id)
        {
            var partnersList = _GENERIC_REPO.Partners.Get(x => x.CompanyId == id);

            if (partnersList == null) throw new
                                    GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            return await partnersList.CountAsync();
        }
        public async Task<int> GetTotalHardwareVendorByCompanyIdAsync(int id)
        {
            // var Count = _GENERIC_REPO.Partners.GetTotalHardwareVendorByCompanyIdAsync(id);
            var count = _GENERIC_REPO.Partners.Get(predicate => predicate.CompanyId == id);
            var hardwareSupplier = count.Where(x => x.PartnerBusiness == PartnerBusinessEnum.HardwareSupplier).CountAsync();

            if (count == null) throw new
                                    GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            return await hardwareSupplier;
        }

    }

}