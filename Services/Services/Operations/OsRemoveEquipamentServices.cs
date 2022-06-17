using System;
using System.Threading.Tasks;
using AutoMapper;
using Domain.Entities;
using Services.Dto;
using Services.Services.Contracts;
using UnitOfWork.Persistence.Contracts;

namespace Services.Services.Operations
{

    public class OsRemoveEquipamentServices : IOsRemoveEquipamentServices
    {
        private readonly IUnitOfWork _GENERIC_REPO;
        private readonly IMapper _MAP;
        public OsRemoveEquipamentServices(
            IUnitOfWork GENERIC_REPO,
            IMapper MAP
            )
        {
            _GENERIC_REPO = GENERIC_REPO;
            _MAP = MAP;
        }

        public async Task<OsRemoveEquipamentDto> AddAsync(OsRemoveEquipamentDto model)
        {

            try
            {
                if (model == null) return null;



                var dtoToDomain = _MAP.Map<OsRemoveEquipament>(model);

                _GENERIC_REPO.OsRemoveEquipaments.AddAsync(dtoToDomain);


                if (await _GENERIC_REPO.save())
                {
                    var getDbResult = await _GENERIC_REPO.OsRemoveEquipaments.GetByIdAsync(x => x.Id == dtoToDomain.Id);
                    var returnResutl = _MAP.Map<OsRemoveEquipamentDto>(getDbResult);
                    return returnResutl;
                }
                else
                {
                    throw new Exception("Erro desconhecido...");
                    
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }


        }






    }

}