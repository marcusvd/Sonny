using System;
namespace Application.Services.Operations.BenchBudgetService.Exceptions
{
    public class BudgetServiceApplicationException : ApplicationException
    {
        public BudgetServiceApplicationException(string message) : base(message) { }
    }

}