using System;
namespace Application.Services.Operations.Finances.Exceptions
{
    public class FinancesApplicationException : ApplicationException
    {
        public FinancesApplicationException(string message) : base(message) { }
    }

}