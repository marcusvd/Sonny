using System;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Services.Services.Contracts;
using Services.Dto;
using Microsoft.AspNetCore.Http;
using Domain.Entities;
using Repository.Data.Operations;
using Repository.Data.Contracts;
using UnitOfWork.Persistence.Contracts;
using System.Collections.Generic;
using Pagination;

namespace Services.Services.Operations
{
    public class EquipamentServices : IEquipamentServices
    {
        //  private readonly IItemRepository _ITEM_REPO;
        private readonly IMapper _MAP;
        private readonly IUnitOfWork _GENERIC_REPO;
        public EquipamentServices(
                         //   IItemRepository ITEM_REPO,
                         IUnitOfWork GENERIC_REPO,
                         IMapper MAP
                        )
        {
            // _ITEM_REPO = ITEM_REPO;
            _MAP = MAP;
            _GENERIC_REPO = GENERIC_REPO;
        }
        public async Task<EquipamentDto> AddAsync(EquipamentDto record)
        {
            try
            {

                Equipament equipament = _MAP.Map<Equipament>(record);

                _GENERIC_REPO.Equipaments.AddAsync(equipament);

                await _GENERIC_REPO.save();

                return _MAP.Map<EquipamentDto>(equipament);
            }

            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

        }

        public async Task<EquipamentDto> EditAsync(int id, EquipamentDto model)
        {
            try
            {
                if (id != model.Id)
                {
                    throw new Exception("Id para atualização não confere.");
                }

                var recordFromDb = await _GENERIC_REPO.Equipaments.GetByIdAsync(_id => _id.Id == id);


                _MAP.Map(model, recordFromDb);

                _GENERIC_REPO.Equipaments.UpdateAsync(recordFromDb);

                if (await _GENERIC_REPO.save())
                {
                    Equipament TypeReturn = await _GENERIC_REPO.Equipaments.GetByIdAsync(_id => _id.Id == recordFromDb.Id);
                    return _MAP.Map<EquipamentDto>(TypeReturn);
                }

                return model;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<bool> DeleteAsync(int id)
        {
            try
            {
                Equipament record = await _GENERIC_REPO.Equipaments.GetByIdAsync(_id => _id.Id == id);

                if (record == null) throw new Exception("Fornecedor não encontrado para exclusão.");

                _GENERIC_REPO.Equipaments.Delete(record);

                return await _GENERIC_REPO.save();

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

        }

        public async Task<EquipamentDto[]> GetAllAsync()
        {
            try
            {
                List<Equipament> record = await _GENERIC_REPO.Equipaments.GetAllAsync();

                if (record == null) return null;

                EquipamentDto[] _EquipamentDto = _MAP.Map<EquipamentDto[]>(record);

                return _EquipamentDto;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

        }
        public async Task<PagedListDto<EquipamentDto>> GetAllPagedListAsync(PgParams parameters)
        {
            try
            {
                var recordFromDb = await _GENERIC_REPO.Equipaments.Pagination(parameters);
                if (recordFromDb == null) return null;

                List<EquipamentDto> listToView = _MAP.Map<List<EquipamentDto>>(recordFromDb);

                var pgListToService = new PagedListDto<EquipamentDto>();

                pgListToService.pageIndex = recordFromDb.pageIndex;
                pgListToService.pageSize = recordFromDb.pageSize;
                pgListToService.length = recordFromDb.length;
                pgListToService.TotalPg = recordFromDb.TotalPg;
                pgListToService.hasNextPage = recordFromDb.hasNextPage;
                pgListToService.hasPreviousPage = recordFromDb.hasPreviousPage;

                return pgListToService;

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public PaginationHeader AddPagination(int TotalItems, int pgSize, int CurrentPg, int TotalPg, bool HasNext, bool HasPrevious)
        {
            PaginationHeader pgh = new PaginationHeader(TotalItems,
                                                        pgSize,
                                                        CurrentPg,
                                                        TotalPg,
                                                        HasNext,
                                                        HasPrevious
                                                        );

            return pgh;
        }

        public async Task<EquipamentDto> GetByIdAsync(int id)
        {
            try
            {
                Equipament record = await _GENERIC_REPO.Equipaments.GetByIdAsync(_id => _id.Id == id);
                if (record == null) return null;

                EquipamentDto EquipamentDto = _MAP.Map<EquipamentDto>(record);
                return EquipamentDto;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }



    }

}