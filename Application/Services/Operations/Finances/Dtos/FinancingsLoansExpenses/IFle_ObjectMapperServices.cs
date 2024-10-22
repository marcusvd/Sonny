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
using Application.Services.Operations.Finances.Dtos.CategorySubcategoryExpenses;


namespace Application.Services.Operations.Finances.Dtos.FinancingsLoansExpenses
{
    public interface IFle_ObjectMapperServices
    {
        List<FinancingAndLoanExpenseInstallmentDto> InstallmentsDbToDtoListMake(List<FinancingAndLoanExpenseInstallment> installments);
        FinancingAndLoanExpenseInstallmentDto InstallmentDbToDto(FinancingAndLoanExpenseInstallment entityDto);
        FinancingAndLoanExpenseInstallment InstallmentDtoToDb(FinancingAndLoanExpenseInstallmentDto entityDto);
        FinancingAndLoanExpenseInstallment InstallmentPayment(FinancingAndLoanExpenseInstallmentPaymentDto dto,FinancingAndLoanExpenseInstallment db);

        List<FinancingAndLoanExpenseDto> ExpensesDbToDtoListMake(List<FinancingAndLoanExpense> financingAndLoanExpense);
        FinancingAndLoanExpenseDto ExpenseDbToDto(FinancingAndLoanExpense entityDto);
        FinancingAndLoanExpense ExpenseDtoToDb(FinancingAndLoanExpenseDto entityDto);

    }
}