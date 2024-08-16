using System.Threading.Tasks;
using AutoMapper;
using UnitOfWork.Persistence.Operations;
using Application.Services.Operations.Finances.Dtos;
using Application.Exceptions;
using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Domain.Entities.Finances.VariableDebitExpenses;

namespace Application.Services.Operations.Finances.VariableDebitExpenses
{
    public class VariableExpensesServices : IVariableExpensesServices
    {
        private readonly IMapper _MAP;
        private readonly IUnitOfWork _GENERIC_REPO;
        public VariableExpensesServices(
            IUnitOfWork GENERIC_REPO,
            IMapper MAP
            )
        {
            _GENERIC_REPO = GENERIC_REPO;
            _MAP = MAP;
        }
        public async Task<VariableExpensesDto> AddAsync(VariableExpensesDto entityDto)
        {
            if (entityDto == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);


            var EntityToDb = _MAP.Map<VariableExpenses>(entityDto);

            EntityToDb.Registerd = DateTime.Now;

            _GENERIC_REPO.VariableExpenses.Add(EntityToDb);

            if (await _GENERIC_REPO.save())
            {
                VariableExpenses EntityFromDb = await _GENERIC_REPO.VariableExpenses.GetById(
                    _id => _id.Id == EntityToDb.Id,
                    null,
                    selector => selector
                    );

                return _MAP.Map<VariableExpensesDto>(EntityFromDb);
            }

            return entityDto;
        }

        public async Task<List<VariableExpensesDto>> GetAllAsync(int companyId)
        {
            var fromDb = await _GENERIC_REPO.VariableExpenses.Get(
                predicate => predicate.CompanyId == companyId && predicate.Deleted != true,
                 toInclude => toInclude.AsNoTracking()
                 .Include(x => x.CategoryExpenses)
                 .Include(x => x.SubcategoryExpenses),
                selector => selector
                ).AsNoTracking().ToListAsync();

            if (fromDb == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);

            var toViewDto = _MAP.Map<List<VariableExpensesDto>>(fromDb);

            return toViewDto;

        }



    }
}