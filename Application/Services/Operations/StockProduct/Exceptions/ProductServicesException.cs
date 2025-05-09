using System;
namespace Application.Services.Operations.StockProduct.Exceptions
{
    public class ProductApplicationException : ApplicationException
    {
        public ProductApplicationException(string message) : base(message) { }
    }
    public class ProductServicesSystemException : SystemException
    {
        public ProductServicesSystemException(string message) : base(message) { }
    }
}