using System;
using Domain.Entities.Authentication;
using Domain.Entities.Main;
using Domain.Entities.Main.Companies;

namespace Domain.Entities.Finances.Enums
{
    public enum PayCycleEnum
    {
        Month = 1,
        Year = 2,
        Variable = 3,
        FinancingLoans = 4,
    }
}