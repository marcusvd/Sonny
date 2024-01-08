using System;
using AutoMapper;
using System.Threading.Tasks;
using System.Collections.Generic;
using UnitOfWork.Persistence.Operations;
using Application.Exceptions;
using Pagination.Models;
using Application.Services.Helpers;
using Domain.Entities.Main;
using Application.Services.Operations.Main.Partners.Dtos;
using Domain.Entities.Main.Enums;

namespace Application.Services.Operations.Main.Partners
{
    public class PartnerAddServices : IPartnerAddServices
    {
        private readonly IMapper _MAP;
        private readonly IUnitOfWork _GENERIC_REPO;
        public PartnerAddServices(
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
          

            switch (entityToDb.BusinessLine)
            {
                case "FORNECEDOR HARDWARE":
                    entityToDb.PartnerBusiness = PartnerBusinessEnum.HardwareSupplier;
                    break;
                case "MOTOBOY / TRANSPORTADOR":
                    entityToDb.PartnerBusiness = PartnerBusinessEnum.Transporter;
                    break;
                case "REPARO NOTEBOOKS":
                    entityToDb.PartnerBusiness = PartnerBusinessEnum.ElectronicRepair;
                    break;
                case "REPARO ELETÔNICA GERAL":
                    entityToDb.PartnerBusiness = PartnerBusinessEnum.ElectronicRepair;
                    break;
                default:
                    entityToDb.PartnerBusiness = PartnerBusinessEnum.none;
                    break;
            }


            _GENERIC_REPO.Partners.Add(entityToDb);

            if (await _GENERIC_REPO.save())
            {
                Partner entityFromoDb = await _GENERIC_REPO.Partners.GetById(
                    _id => _id.Id == entityToDb.Id,
                    null,
                    selector => selector
                    );
                return _MAP.Map<PartnerDto>(entityFromoDb);
            }

            return entityDto;
        }
    }

}