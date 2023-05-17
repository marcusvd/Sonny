using System;
using AutoMapper;
using System.Threading.Tasks;
using Application.Dto;
using Domain.Entities;
using System.Collections.Generic;
using UnitOfWork.Persistence.Contracts;
using Application.Exceptions;
using Services.Dto;
using Pagination.Models;
using Application.Services.Helpers;

namespace Application.Services.Operations.Partners
{
    public class PartnerServices : IPartnerServices
    {
        private readonly IMapper _MAP;
        private readonly IUnitOfWork _GENERIC_REPO;
        public PartnerServices(
                         IUnitOfWork GENERIC_REPO,
                         IMapper MAP

                        )
        {
            _MAP = MAP;
            _GENERIC_REPO = GENERIC_REPO;
        }

        public async Task<PartnerDto> AddAsync(PartnerDto entityDto)
        {

            if (entityDto == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            Partner entityToDb = _MAP.Map<Partner>(entityDto);

            entityToDb.Registered = DateTime.Now;
            entityToDb.NormalizedName = entityToDb.Name.RemoveAccentsAndNormalize();

            _GENERIC_REPO.Partners.AddAsync(entityToDb);

            if (await _GENERIC_REPO.save())
            {
                Partner entityFromoDb = await _GENERIC_REPO.Partners.GetByIdAsync(_id => _id.Id == entityToDb.Id);
                return _MAP.Map<PartnerDto>(entityFromoDb);
            }

            return entityDto;
        }

        public async Task<PartnerDto[]> GetAllAsync()
        {
            List<Partner> entityFromDb = await _GENERIC_REPO.Partners.GetAllAsync();

            if (entityFromDb == null) throw new Exception("Objeto era nulo.");

            return _MAP.Map<PartnerDto[]>(entityFromDb);
        }

        public async Task<List<PartnerDto>> GetAllByCompanyIdAsync(int id)
        {

            var fromDb = await _GENERIC_REPO.Partners.GetAllByCompanyIdAsync(x => x.CompanyId == id);

            var toReturn = _MAP.Map<List<PartnerDto>>(fromDb);

            if (fromDb == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            return toReturn;
        }

        public async Task<PagedListDto<PartnerDto>> GetAllPagedAsync(Params parameters)
        {
            var fromDb = await _GENERIC_REPO.Partners.GetPartnersPagedAsync(parameters);

            if (fromDb == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            List<PartnerDto> ViewDto = _MAP.Map<List<PartnerDto>>(fromDb);

            var PgDto = new PagedListDto<PartnerDto>()
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
            var totalCustomers = _GENERIC_REPO.Partners.GetCountByCompanyIdAsync(x => x.CompanyId == id);

            if (totalCustomers == null) throw new
                                    GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            return await totalCustomers;
        }



    }

}