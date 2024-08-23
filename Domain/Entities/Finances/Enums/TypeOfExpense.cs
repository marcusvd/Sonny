using System;
using Domain.Entities.Authentication;
using Domain.Entities.Main;
using Domain.Entities.Main.Companies;

namespace Domain.Entities.Finances.Enums
{
    public enum TypeOfExpense
    {
        Monthly = 0,
        Yearly = 1,
        Variable = 2
    }
}