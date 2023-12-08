using System;
using System.Collections.Generic;
using FluentValidation;

namespace Application.Services.Operations.Finances.Dtos
{
    public class EssentialExpensesDtoValidator : AbstractValidator<FinancialEssentialExpensesDto>
    {
        public EssentialExpensesDtoValidator()
        {
            RuleFor(x => x.UserId).NotNull().NotEmpty();
            RuleFor(x => x.ExpensesId).NotNull().NotEmpty();
            RuleFor(x => x.BankAccountId).NotNull().NotEmpty();
            RuleFor(x => x.WasPaid).NotNull().NotEmpty();
            RuleFor(x => x.Price).NotNull().NotEmpty().GreaterThanOrEqualTo(0);
            RuleFor(x => x.Interest).GreaterThanOrEqualTo(0);
            RuleFor(x => x.PaidBy).NotNull().NotEmpty();
            RuleFor(x => x.CardId);
            RuleFor(x => x.EntryRegister);
        }
    }
}