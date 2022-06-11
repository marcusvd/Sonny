using System;
using System.Threading.Tasks;
using AutoMapper;
using Services.Dto;
using Services.Services.Contracts;
using Domain.Entities;
using Repository.Data;
using UnitOfWork.Persistence.Contracts;
using System.Collections.Generic;

namespace Services.Services.Operations
{
    public class CategoryServices : ICategoryServices
    {

        private readonly IMapper _MAP;

        private readonly IUnitOfWork _GENERIC_REPO;
        public CategoryServices(
                        IMapper MAP,
                        IUnitOfWork GENERIC_REPO
 )
        {
            _MAP = MAP;
            _GENERIC_REPO = GENERIC_REPO;
        }


        public async Task<CategoryDto> AddAsync(CategoryDto record)
        {
            try
            {
                if (record == null) return null;

                Category recordToDb = _MAP.Map<Category>(record);

                _GENERIC_REPO.Categories.AddAsync(recordToDb);

                if (await _GENERIC_REPO.save())
                {
                    return _MAP.Map<CategoryDto>(recordToDb);
                }
                return record;
                // _CARD_REPO.GetByIdAsync(, false)
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

        }

        public Task<bool> DeleteAsync(int id)
        {
            throw new System.NotImplementedException();
        }

        public Task<CategoryDto> EditAsync(int id, CategoryDto record)
        {
            throw new System.NotImplementedException();
        }

        public async Task<CategoryDto[]> GetAllAsync(bool include = false)
        {
            List<Category> RecordsFromDb = new List<Category>();
            try
            {
                if (include)
                {
                    RecordsFromDb = await _GENERIC_REPO.Categories.GetAllIncludedAsync();
                }
                else
                {
                    RecordsFromDb = await _GENERIC_REPO.Categories.GetAllAsync();
                }
                if (RecordsFromDb == null) return null;
                return _MAP.Map<CategoryDto[]>(RecordsFromDb);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public Task<CategoryDto> GetByIdAsync(int id, bool include = false)
        {
            throw new System.NotImplementedException();
        }
    }
}