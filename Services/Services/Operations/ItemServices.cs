using System;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Services.Services.Contracts;
using Services.Dto;

using Domain.Entities;
using Repository.Data.Operations;
using Repository.Data.Contracts;
using UnitOfWork.Persistence.Contracts;
using System.Collections.Generic;

namespace Services.Services.Operations
{
    public class ItemServices : IItemServices
    {
        //  private readonly IItemRepository _ITEM_REPO;
        private readonly IMapper _MAP;
        private readonly IUnitOfWork _GENERIC_REPO;
        public ItemServices(
                        //   IItemRepository ITEM_REPO,
                         IUnitOfWork GENERIC_REPO,
                         IMapper MAP
                        )
        {
            // _ITEM_REPO = ITEM_REPO;
            _MAP = MAP;
            _GENERIC_REPO = GENERIC_REPO;
        }
        public async Task<ItemDto> AddAsync(ItemDto record)
        {
            try
            {

                Item Item = _MAP.Map<Item>(record);

                _GENERIC_REPO.Items.AddAsync(Item);

                await _GENERIC_REPO.save();

                return _MAP.Map<ItemDto>(Item);
            }

            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

        }

        public async Task<ItemDto> EditAsync(int id, ItemDto model)
        {
            if (id != model.Id)
            {
                throw new Exception("Id para atualização não confere.");
            }

            var recordFromDb = await _GENERIC_REPO.Items.GetByIdAsync(_id => _id.Id == id);


             _MAP.Map(model, recordFromDb);

            _GENERIC_REPO.Items.UpdateAsync(recordFromDb);

            if (await _GENERIC_REPO.save())
            {
                Item TypeReturn = await _GENERIC_REPO.Items.GetByIdAsync(_id => _id.Id == recordFromDb.Id);
                return _MAP.Map<ItemDto>(TypeReturn);
            }

            return model;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            try
            {
                Item record = await _GENERIC_REPO.Items.GetByIdAsync(_id => _id.Id == id);

                if (record == null) throw new Exception("Fornecedor não encontrado para exclusão.");

                _GENERIC_REPO.Items.Delete (record);

                return await _GENERIC_REPO.save();

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

        }

        public async Task<ItemDto[]> GetAllAsync()
        {
            List<Item> record = await _GENERIC_REPO.Items.GetAllAsync();
            if (record == null) return null;

            ItemDto[] _ItemDto = _MAP.Map<ItemDto[]>(record);
            return _ItemDto;

        }

        public async Task<ItemDto> GetByIdAsync(int id)
        {
           Item record = await _GENERIC_REPO.Items.GetByIdAsync(_id => _id.Id == id);
            if (record == null) return null;

            ItemDto ItemDto = _MAP.Map<ItemDto>(record);
            return ItemDto;
        }



    }

}