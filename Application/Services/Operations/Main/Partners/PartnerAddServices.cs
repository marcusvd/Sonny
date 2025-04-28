using System;
using System.Threading.Tasks;
using UnitOfWork.Persistence.Operations;
using Application.Exceptions;
using Domain.Entities.Main;
using Application.Services.Operations.Main.Partners.Dtos;
using Application.Services.Operations.Main.Partners.Dtos.Mappers;

namespace Application.Services.Operations.Main.Partners
{
    public class PartnerAddServices : IPartnerAddServices
    {
        private readonly IPartnerObjectMapperServices _mapper;
        private readonly IUnitOfWork _GENERIC_REPO;
        public PartnerAddServices(
                         IUnitOfWork GENERIC_REPO,
                         IPartnerObjectMapperServices mapper                        )
        {
            _mapper = mapper;
            _GENERIC_REPO = GENERIC_REPO;
        }

        public async Task<PartnerDto> AddAsync(PartnerDto entityDto)
        {

            if (entityDto == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            Partner entityToDb = _mapper.PartnerMapper(entityDto);

            entityToDb.Registered = DateTime.Now;
          

            // switch (entityToDb.BusinessLine)
            // {
            //     case "FORNECEDOR HARDWARE":
            //         entityToDb.PartnerBusiness = PartnerBusinessEnum.HardwareSupplier;
            //         break;
            //     case "MOTOBOY / TRANSPORTADOR":
            //         entityToDb.PartnerBusiness = PartnerBusinessEnum.Transporter;
            //         break;
            //     case "REPARO NOTEBOOKS":
            //         entityToDb.PartnerBusiness = PartnerBusinessEnum.ElectronicRepair;
            //         break;
            //     case "REPARO ELETÔNICA GERAL":
            //         entityToDb.PartnerBusiness = PartnerBusinessEnum.ElectronicRepair;
            //         break;
            //     default:
            //         entityToDb.PartnerBusiness = PartnerBusinessEnum.Others;
            //         break;
            // }


            _GENERIC_REPO.Partners.Add(entityToDb);

            if (await _GENERIC_REPO.save())
            {
                Partner entityFromoDb = await _GENERIC_REPO.Partners.GetById(
                    _id => _id.Id == entityToDb.Id,
                    null,
                    selector => selector
                    );
                return _mapper.PartnerMapper(entityFromoDb);
            }

            return entityDto;
        }
    }

}