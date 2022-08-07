using System;
using System.Threading.Tasks;
using AutoMapper;
using Services.Services.Contracts;
using Services.Dto;
using Domain.Entities;
using Repository.Data.Contracts;
using Repository.Data.Operations;
using UnitOfWork.Persistence.Contracts;
using System.Collections.Generic;
using Pagination;

namespace Services.Services.Operations
{
    public class InventoryServices : IInventoryServices
    {
        // private readonly IInventoryRepository _INVENTORY_REPO;
        private readonly IMapper _MAP;
        private readonly IUnitOfWork _GENERIC_REPO;
        public InventoryServices(
                         //  IInventoryRepository INVENTORY_REPO,
                         IUnitOfWork GENERIC_REPO,
                         IMapper MAP
                        )
        {
            // _INVENTORY_REPO = INVENTORY_REPO;
            _MAP = MAP;
            _GENERIC_REPO = GENERIC_REPO;
        }


        public async Task<InventoryDto[]> GetAllAsync()
        {
            List<Inventory> record = await _GENERIC_REPO.Inventories.GetAllAsync();
            if (record == null) return null;

            InventoryDto[] InventoryDto = _MAP.Map<InventoryDto[]>(record);

            return InventoryDto;

        }
        public async Task<InventoryDto[]> GetAllEquipamentIncludedAsync()
        {
            List<Inventory> record = await _GENERIC_REPO.Inventories.GetAllIncludedEquipamentAsync();
            if (record == null) return null;

            InventoryDto[] InventoryDto = _MAP.Map<InventoryDto[]>(record);

            return InventoryDto;

        }
        public async Task<InventoryDto> GetByIdAsync(int id)
        {
            Inventory record = await _GENERIC_REPO.Inventories.GetByIdAsync(_id => _id.Id == id);
            if (record == null) return null;

            InventoryDto InventoryDto = _MAP.Map<InventoryDto>(record);

            return InventoryDto;

        }
        public async Task<InventoryDto> AddAsync(InventoryDto record)
        {
            try
            {
                Inventory inventory = _MAP.Map<Inventory>(record);
                // Inventory.InventorysTypesPayments = Inventory.InventorysTypesPayments = _lstp;
                _GENERIC_REPO.Inventories.AddAsync(inventory);
                if (await _GENERIC_REPO.save())
                {
                    Inventory recordDto = await _GENERIC_REPO.Inventories.GetByIdAsync(_id => _id.Id == inventory.Id);
                    return _MAP.Map<InventoryDto>(recordDto);
                }
                return null;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

        }
        public async Task<InventoryDto> EditAsync(int id, InventoryDto model)
        {
            Inventory inventory = await _GENERIC_REPO.Inventories.GetByIdAsync(_id => _id.Id == id);

            if (inventory == null) return null;

            _MAP.Map(model, inventory);

            _GENERIC_REPO.Inventories.UpdateAsync(inventory);

            if (await _GENERIC_REPO.save())
            {
                Inventory inventoryReturn = await _GENERIC_REPO.Inventories.GetByIdAsync(_id => _id.Id == id);
                return _MAP.Map<InventoryDto>(inventoryReturn);
            }

            return model;
        }
        public async Task<bool> DeleteAsync(int id)
        {
            try
            {
                Inventory record = await _GENERIC_REPO.Inventories.GetByIdAsync(_id => _id.Id == id);

                if (record == null) throw new Exception("Fornecedor não encontrado para exclusão.");

                _GENERIC_REPO.Inventories.Delete(record);

                return await _GENERIC_REPO.save();

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

        }
        public async Task<PagedListDto<InventoryDto>> PagedListGetAllIncludedAsync(PgParams parameters)
        {
            var fromPagedDb = await _GENERIC_REPO.Inventories.GetPagedAllIncluded(parameters); //.Pagination(parameters);
            if (fromPagedDb == null) return null;
        
            // var toServices = _MAP.Map<List<InventoryDto>>(fromPagedDb);

            PagedListDto<InventoryDto> pgListToService = new PagedListDto<InventoryDto>();
            pgListToService.pageIndex = fromPagedDb.pageIndex;
            pgListToService.pageSize = fromPagedDb.pageSize;
            pgListToService.length = fromPagedDb.length;
            pgListToService.TotalPg = fromPagedDb.TotalPg;
            pgListToService.hasNextPage = fromPagedDb.hasNextPage;
            pgListToService.hasPreviousPage = fromPagedDb.hasPreviousPage;
            pgListToService.EntitiesToShow = _MAP.Map<List<InventoryDto>>(fromPagedDb);


            return pgListToService;
        }

       
    }

}