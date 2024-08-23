using System.Threading.Tasks;
using AutoMapper;
using UnitOfWork.Persistence.Operations;
using Application.Services.Operations.Finances.Dtos;
using Application.Exceptions;
using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Domain.Entities.Finances.VariablesDebitsExpenses;

namespace Application.Services.Operations.Finances.VariablesDebitsExpenses
{
    public class VariablesExpensesServices : IVariablesExpensesServices
    {
        private readonly IMapper _MAP;
        private readonly IUnitOfWork _GENERIC_REPO;
        public VariablesExpensesServices(
            IUnitOfWork GENERIC_REPO,
            IMapper MAP
            )
        {
            _GENERIC_REPO = GENERIC_REPO;
            _MAP = MAP;
        }
        public async Task<VariableExpenseDto> AddAsync(VariableExpenseDto entityDto)
        {
            if (entityDto == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);


            var EntityToDb = _MAP.Map<VariableExpense>(entityDto);

            EntityToDb.Registered = DateTime.Now;

            _GENERIC_REPO.VariablesExpenses.Add(EntityToDb);

            if (await _GENERIC_REPO.save())
            {
                VariableExpense EntityFromDb = await _GENERIC_REPO.VariablesExpenses.GetById(
                    _id => _id.Id == EntityToDb.Id,
                    null,
                    selector => selector
                    );

                return _MAP.Map<VariableExpenseDto>(EntityFromDb);
            }

            return entityDto;
        }

        public async Task<List<VariableExpenseDto>> GetAllAsync(int companyId)
        {
            var fromDb = await _GENERIC_REPO.VariablesExpenses.Get(
                predicate => predicate.CompanyId == companyId && predicate.Deleted != true,
                 toInclude => toInclude.AsNoTracking()
                 .Include(x => x.CategoryExpense)
                 .Include(x => x.SubcategoryExpense),
                selector => selector
                ).AsNoTracking().ToListAsync();

            if (fromDb == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);

            var toViewDto = _MAP.Map<List<VariableExpenseDto>>(fromDb);

            return toViewDto;

        }



    }
}