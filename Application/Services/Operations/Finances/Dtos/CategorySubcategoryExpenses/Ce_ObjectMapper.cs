using System.Threading.Tasks;
using AutoMapper;
using UnitOfWork.Persistence.Operations;
using System.Collections.Generic;
using System;
using Application.Exceptions;
using Microsoft.EntityFrameworkCore;
using Pagination.Models;
using System.Linq;
using Application.Services.Operations.Finances.FinancingsLoansExpenses;
using Application.Services.Operations.Finances.Dtos.FinancingsLoansExpenses;
using Domain.Entities.Finances.FinancingsLoansExpenses;
using System.Net;
using Application.Services.Operations.Finances.CommonForServices;
using Domain.Entities.Finances.CategorySubcategoryExpenses;


namespace Application.Services.Operations.Finances.Dtos.CategorySubcategoryExpenses
{
    public class Ce_ObjectMapper
    {
        private CategoryExpenseDto ObjectMapperCategoryExpenseDbToDto(CategoryExpense entityDto)
        {
            var obj = new CategoryExpenseDto()
            {
                Id = entityDto.Id,
                CompanyId = entityDto.CompanyId,
                Name = entityDto.Name
            };

            return obj;
        }
    }
}