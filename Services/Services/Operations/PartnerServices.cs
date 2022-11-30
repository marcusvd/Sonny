using System;
using AutoMapper;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Services.Services.Contracts;
using Services.Dto;
using Repository.Data;
using Repository.Data.Contracts;
using Domain.Entities;
using System.Collections.Generic;
using System.Linq;
using UnitOfWork.Persistence.Contracts;

namespace Services.Services.Operations
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

                if (entityDto == null) return null;

                Partner entityToDb = _MAP.Map<Partner>(entityDto);
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

                return _MAP.Map<PartnerDto[]>(entityFromDb);
          
        }

        // public async Task<bool> DeleteAsync(int id)
        // {

        //         Partner Record = await _GENERIC_REPO.Partners.GetByIdAsync(_id => _id.Id == id);
        //         if (Record == null) throw new Exception("Parceiro não encontrado.");

        //         _GENERIC_REPO.Partners.Delete(Record);

        //         return await _GENERIC_REPO.save();
        //   

        // }

        // public async Task<PartnerDto> EditAsync(int id, PartnerDto partnerDto)
        // {
          
        //         Partner record = await _GENERIC_REPO.Partners.GetByIdAsync(_id => _id.Id == id);
        //         if (record == null) throw new Exception("Entidade era nulla.");

        //         //  List<int> _DtosIds = new List<int>();

        //         // partnerDto.Contact.socialnetworks.ForEach(_itemSnw => _DtosIds.Add(_itemSnw.Id));

        //         // SocialNetwork[] resultToDelete = record.Contact.socialnetworks.Where(
        //         //     _socialNetwork => !_DtosIds.Contains(_socialNetwork.Id)
        //         // ).ToArray();

        //         // partnerDto.Id = record.Id;

        //         _MAP.Map(partnerDto, record);

        //         // if (resultToDelete != null) _GENERIC_REPO.DeleteRange<SocialNetwork>(resultToDelete);

        //         _GENERIC_REPO.Partners.Update(record);

        //         if (await _GENERIC_REPO.save())
        //         {
        //             Partner records = await _GENERIC_REPO.Partners.GetByIdAsync(_id => _id.Id == id);

        //             return _MAP.Map<PartnerDto>(records);
        //         }
        //         return null;
        // }
        // public async Task<PartnerDto> GetByIdAsync(int id)
        // {
          
        //         Partner records = await _GENERIC_REPO.Partners.GetByIdAsync(_id => _id.Id == id);

        //         return _MAP.Map<PartnerDto>(records);
           
        // }


    }

}